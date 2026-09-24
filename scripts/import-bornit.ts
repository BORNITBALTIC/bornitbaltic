/**
 * Bornit Baltic: vana WooCommerce sisu import Payloadi.
 *
 * Eeldab, et tools/bornit_scrape.py on joosnud ja .tmp/bornit/ sees on
 * products.json, categories.json ning media/ kaust failidega.
 *
 * Kasutus:  npm run import:bornit
 *
 * Skript on idempotentne: kordusjooks uuendab olemasolevat kirjet
 * wcId (tooted, kategooriad) ja legacyUrl (failid) alusel.
 */
import 'dotenv/config'

import fs from 'fs'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'
import { JSDOM } from 'jsdom'
import { getPayload } from 'payload'
import type { RequiredDataFromCollectionSlug } from 'payload'
import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'

import config from '../src/payload.config.js'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * JSON tuleb repost (data/bornit), et import tootaks ka serveris.
 * Kohalikus masinas eelistatakse varskelt kraabitud .tmp/bornit sisu.
 */
const REPO_DATA = path.resolve(dirname, '../data/bornit')
const SCRAPE_DATA = path.resolve(dirname, '../../.tmp/bornit')
const DATA_DIR =
  process.env.BORNIT_DATA_DIR ||
  (fs.existsSync(path.join(SCRAPE_DATA, 'products.json')) ? SCRAPE_DATA : REPO_DATA)
const MEDIA_DIR = process.env.BORNIT_MEDIA_DIR || path.join(SCRAPE_DATA, 'media')
const LIMIT = Number(process.env.BORNIT_LIMIT || 0)
const LOCALE = 'et'

type ScrapedDoc = { kind: string; label: string; url: string }
type ScrapedImage = { src: string; alt: string; name: string }

type ScrapedProduct = {
  wc_id: number
  slug: string
  title: string
  permalink: string
  category_path: string[]
  brands: string[]
  sku: string
  images: ScrapedImage[]
  inline_images: { src: string; alt: string }[]
  short_description_html: string
  description_html: string
  docs: ScrapedDoc[]
  measures: { nimi: string; vaartus: string }[]
}

type ScrapedCategory = {
  wc_id: number
  slug: string
  name: string
  path: string[]
  parent_slug: string | null
  count: number
  description: string
  image: string
}

const DOC_KINDS = new Set<string>([
  'tehniline_info',
  'ohutuskaart',
  'infoleht',
  'toimivusdeklaratsioon',
  'kasutusjuhend',
  'muu',
])

type CategoryData = RequiredDataFromCollectionSlug<'categories'>
type ProductData = RequiredDataFromCollectionSlug<'products'>
type DocEntry = NonNullable<ProductData['documents']>[number]
type DocKind = DocEntry['kind']

const ICON_BY_SLUG: Record<string, NonNullable<CategoryData['icon']>> = {
  'vundamendi-hudroisolatsioon': 'i-hydro',
  'teedeehituses-kasutatavad-tooted': 'i-road',
  vuugitihendustooted: 'i-joint',
  'katuse-saneerimistooted': 'i-roof',
  'silikal-tooted': 'i-silikal',
  eritooted: 'i-special',
  markeerimisvarvid: 'i-marking',
  teekattemargistus: 'i-marking',
  'bornit-tooriistad': 'i-tool',
  'grun-tooriistad': 'i-grun',
}

/** Peakategooriate jarjekord: suurim ja tahtsaim valik eespool. */
const ORDER_BY_SLUG: Record<string, number> = {
  'vundamendi-hudroisolatsioon': 10,
  'teedeehituses-kasutatavad-tooted': 20,
  vuugitihendustooted: 30,
  'katuse-saneerimistooted': 40,
  'silikal-tooted': 50,
  markeerimisvarvid: 60,
  teekattemargistus: 70,
  eritooted: 80,
  'bornit-tooriistad': 90,
  'grun-tooriistad': 100,
}

const readJson = <T,>(name: string): T =>
  JSON.parse(fs.readFileSync(path.join(DATA_DIR, name), 'utf-8')) as T

const localFileFor = (url: string): string | null => {
  const base = decodeURIComponent(new URL(url).pathname.split('/').pop() || '')
  if (!base) return null
  const candidate = path.join(MEDIA_DIR, base)
  return fs.existsSync(candidate) ? candidate : null
}

/**
 * Serveris ei ole .tmp kausta, seega tommatakse fail vanalt lehelt.
 * Tagastab ajutise faili tee voi null, kui allikas ei vasta.
 */
const downloadToTemp = async (url: string): Promise<string | null> => {
  const base = decodeURIComponent(new URL(url).pathname.split('/').pop() || 'fail')
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'BornitMigration/1.0' } })
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    if (!buf.length) return null
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bornit-'))
    const target = path.join(dir, base)
    fs.writeFileSync(target, buf)
    return target
  } catch {
    return null
  }
}

const brandOf = (title: string, brands: string[]): 'bornit' | 'grun' | 'silikal' | 'muu' => {
  const hay = (title + ' ' + brands.join(' ')).toUpperCase()
  if (hay.includes('SILIKAL')) return 'silikal'
  if (hay.includes('GRUN') || hay.includes('GRÜN')) return 'grun'
  if (hay.includes('BORNIT')) return 'bornit'
  return 'muu'
}

/**
 * Vana lehe HTML sisaldab asju, mis uuel tootelehel elavad mujal:
 *   PDFi lingid (Tehniline info, Ohutuskaart) -> eraldi nupud
 *   moodude tabel -> eraldi tehniliste andmete tabel
 *   pildid -> toote pildigalerii (rikkatekstis vajaks iga pilt uploadi viidet)
 *   CE margise pilt ja korduv pealkiri -> ara
 */
const cleanHtml = (html: string, opts: { title?: string; dropTables?: boolean }): string => {
  if (!html || !html.trim()) return ''
  const dom = new JSDOM('<body>' + html + '</body>')
  const doc = dom.window.document

  doc.querySelectorAll('a[href*=".pdf"]').forEach((a) => a.remove())
  doc.querySelectorAll('img[src*="ce.png"], a[href*="ce.png"]').forEach((el) => el.remove())

  // pildid ja neid umbritsevad lingid ara: need lahevad galeriisse
  doc.querySelectorAll('img').forEach((img) => {
    const parent = img.parentElement
    img.remove()
    if (parent && parent.tagName === 'A' && !(parent.textContent || '').trim()) parent.remove()
  })

  if (opts.dropTables) doc.querySelectorAll('table').forEach((t) => t.remove())

  if (opts.title) {
    const norm = (s: string) =>
      s
        .replace(/\s+/g, ' ')
        .replace(/®/g, '')
        .trim()
        .toLowerCase()
    doc.querySelectorAll('h1, h2, h3').forEach((h) => {
      if (norm(h.textContent || '') === norm(opts.title as string)) h.remove()
    })
  }

  // jarelejaanud tyhjad elemendid ara
  doc.querySelectorAll('p, div, span, strong, h2, h3').forEach((el) => {
    const hasText = (el.textContent || '').trim().length > 0
    if (!hasText && !el.querySelector('img, table, br')) el.remove()
  })

  return doc.body.innerHTML.trim()
}

const run = async () => {
  const payload = await getPayload({ config })
  const editorConfig = await editorConfigFactory.default({ config: payload.config })

  const toLexical = (html: string) => {
    if (!html || !html.trim()) return null
    return convertHTMLToLexical({ editorConfig, html, JSDOM })
  }

  const categories = readJson<ScrapedCategory[]>('categories.json')
  const allProducts = readJson<ScrapedProduct[]>('products.json')
  const products = LIMIT > 0 ? allProducts.slice(0, LIMIT) : allProducts
  console.log('Andmed: ' + DATA_DIR)

  /* ---------- 1. failid ---------- */
  const mediaByUrl = new Map<string, number | string>()

  const uploadOnce = async (url: string, alt: string): Promise<number | string | null> => {
    const cached = mediaByUrl.get(url)
    if (cached !== undefined) return cached

    const existing = await payload.find({
      collection: 'media',
      where: { legacyUrl: { equals: url } },
      limit: 1,
      pagination: false,
    })
    if (existing.docs[0]) {
      mediaByUrl.set(url, existing.docs[0].id)
      return existing.docs[0].id
    }

    let filePath = localFileFor(url)
    let temporary = false
    if (!filePath) {
      filePath = await downloadToTemp(url)
      temporary = Boolean(filePath)
    }
    if (!filePath) {
      console.warn('  ! faili ei saanud katte: ' + url)
      return null
    }

    try {
      const createdDoc = await payload.create({
        collection: 'media',
        locale: LOCALE,
        data: { alt: alt || '', legacyUrl: url },
        filePath,
      })
      mediaByUrl.set(url, createdDoc.id)
      return createdDoc.id
    } finally {
      if (temporary) fs.rmSync(path.dirname(filePath), { recursive: true, force: true })
    }
  }

  /* ---------- 2. kategooriad ---------- */
  const catIdBySlug = new Map<string, number | string>()

  const upsertCategory = async (c: ScrapedCategory, parentId: number | string | null) => {
    const data: CategoryData = {
      name: c.name,
      slug: c.slug,
      description: c.description || '',
      order: ORDER_BY_SLUG[c.slug] ?? (c.path.length === 1 ? 500 : 1000),
      wcId: c.wc_id,
      parent: parentId as CategoryData['parent'],
    }
    if (ICON_BY_SLUG[c.slug]) data.icon = ICON_BY_SLUG[c.slug]
    if (c.image) {
      const img = await uploadOnce(c.image, c.name)
      if (img) data.image = img as CategoryData['image']
    }

    const found = await payload.find({
      collection: 'categories',
      where: { wcId: { equals: c.wc_id } },
      limit: 1,
      pagination: false,
    })

    const saved = found.docs[0]
      ? await payload.update({
          collection: 'categories',
          id: found.docs[0].id,
          locale: LOCALE,
          data,
        })
      : await payload.create({ collection: 'categories', locale: LOCALE, data })

    catIdBySlug.set(c.slug, saved.id)
    return saved
  }

  const tops = categories.filter((c) => c.path.length === 1)
  const subs = categories.filter((c) => c.path.length > 1)

  console.log('Kategooriad: ' + tops.length + ' peakategooriat, ' + subs.length + ' alamkategooriat')
  for (const c of tops) {
    await upsertCategory(c, null)
    console.log('  + ' + c.name)
  }
  for (const c of subs) {
    const parentId = c.parent_slug ? catIdBySlug.get(c.parent_slug) ?? null : null
    await upsertCategory(c, parentId)
    console.log('    + ' + c.name)
  }

  /* ---------- 3. tooted ---------- */
  console.log('\nTooted: ' + products.length)
  let created = 0
  let updated = 0
  const problems: string[] = []

  for (const [i, p] of products.entries()) {
    const catSlug = p.category_path[p.category_path.length - 1]
    const categoryId = catIdBySlug.get(catSlug)
    if (!categoryId) {
      problems.push(p.slug + ': kategooria puudu (' + catSlug + ')')
      continue
    }

    const imageIds: NonNullable<ProductData['images']> = []
    for (const img of [...p.images, ...(p.inline_images || [])]) {
      const id = await uploadOnce(img.src, img.alt || p.title)
      const ref = id as NonNullable<ProductData['images']>[number]
      if (id !== null && !imageIds.includes(ref)) imageIds.push(ref)
    }

    const documents: DocEntry[] = []
    for (const d of p.docs) {
      const id = await uploadOnce(d.url, p.title + ' ' + d.label)
      if (!id) continue
      documents.push({
        kind: (DOC_KINDS.has(d.kind) ? d.kind : 'muu') as DocKind,
        label: d.label || undefined,
        file: id as DocEntry['file'],
      })
    }

    const leadHtml = cleanHtml(p.short_description_html, { title: p.title, dropTables: true })
    const descHtml = cleanHtml(p.description_html, { title: p.title, dropTables: true })

    const data: ProductData = {
      title: p.title,
      slug: p.slug,
      category: categoryId as ProductData['category'],
      brand: brandOf(p.title, p.brands),
      images: imageIds,
      lead: toLexical(leadHtml),
      description: toLexical(descHtml),
      measures: p.measures.map((m) => ({ nimi: m.nimi, vaartus: m.vaartus })),
      documents,
      legacyUrl: p.permalink,
      wcId: p.wc_id,
      _status: 'published',
    }

    const found = await payload.find({
      collection: 'products',
      where: { wcId: { equals: p.wc_id } },
      limit: 1,
      pagination: false,
    })

    try {
      if (found.docs[0]) {
        await payload.update({ collection: 'products', id: found.docs[0].id, locale: LOCALE, data })
        updated += 1
      } else {
        await payload.create({ collection: 'products', locale: LOCALE, data })
        created += 1
      }
      console.log(
        '  ' +
          (i + 1) +
          '/' +
          products.length +
          ' ' +
          p.slug.slice(0, 46).padEnd(46) +
          ' pildid=' +
          imageIds.length +
          ' dok=' +
          documents.length +
          ' moodud=' +
          p.measures.length,
      )
    } catch (err) {
      problems.push(p.slug + ': ' + (err as Error).message)
      console.error('  VIGA ' + p.slug + ': ' + (err as Error).message)
    }
  }

  console.log(
    '\nValmis. Loodud ' +
      created +
      ', uuendatud ' +
      updated +
      ', failid ' +
      mediaByUrl.size +
      '.' +
      (problems.length ? '\nProbleemid (' + problems.length + '):\n  ' + problems.join('\n  ') : ''),
  )
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
