import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Category, Product } from '@/payload-types'
import { DEFAULT_LOCALE, type Locale } from './i18n'

export type CategoryNode = Category & { children: Category[] }

const client = async () => getPayload({ config: await config })

const idOf = (value: unknown): string | number | null => {
  if (value === null || value === undefined) return null
  if (typeof value === 'object') return (value as { id: string | number }).id
  return value as string | number
}

/** Kategooriapuu: peakategooriad koos alamkategooriatega, jarjekorras. */
export const getCategoryTree = async (locale: Locale = DEFAULT_LOCALE): Promise<CategoryNode[]> => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'categories',
    limit: 200,
    pagination: false,
    sort: ['order', 'name'],
    depth: 0,
    locale,
  })

  const tops = docs.filter((c) => !c.parent)
  const subs = docs.filter((c) => Boolean(c.parent))

  return tops.map((top) => ({
    ...top,
    children: subs.filter((s) => idOf(s.parent) === top.id),
  }))
}

export const getCategoryBySlug = async (
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<Category | null> => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
    pagination: false,
    depth: 1,
    locale,
  })
  return docs[0] ?? null
}

/** Kategooria ja koik selle alamkategooriad, et peakategooria lehel oleks kogu valik. */
export const getCategoryWithDescendants = async (category: Category): Promise<(string | number)[]> => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'categories',
    where: { parent: { equals: category.id } },
    limit: 200,
    pagination: false,
    depth: 0,
  })
  return [category.id, ...docs.map((d) => d.id)]
}

export const getProductsByCategories = async (
  categoryIds: (string | number)[],
  locale: Locale = DEFAULT_LOCALE,
): Promise<Product[]> => {
  if (!categoryIds.length) return []
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'products',
    where: { category: { in: categoryIds } },
    limit: 500,
    pagination: false,
    sort: 'title',
    // depth 2, et kategooria vanem oleks olemas ja URL tuleks taispikk
    depth: 2,
    locale,
  })
  return docs
}

export const getAllProducts = async (): Promise<Product[]> => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'products',
    limit: 1000,
    pagination: false,
    sort: 'title',
    depth: 2,
  })
  return docs
}

export const getProductBySlug = async (
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<Product | null> => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
    pagination: false,
    depth: 2,
    locale,
  })
  return docs[0] ?? null
}

/**
 * Tootelehe URL peab jaama vana lehe kujul:
 *   /tooted/<peakategooria>/<alamkategooria>/<slug>
 * Kui kategooria on peakategooria, on tee kahesegmendiline.
 */
export const productHref = (product: Product): string => {
  const cat = typeof product.category === 'object' ? product.category : null
  if (!cat) return `/tooted/${product.slug}`
  const parent = cat.parent && typeof cat.parent === 'object' ? cat.parent : null
  const segments = parent ? [parent.slug, cat.slug] : [cat.slug]
  return `/tooted/${segments.join('/')}/${product.slug}`
}

/** Alamkategooria URL, kui vanema slug on juba teada (puu ei lae vanemat valja). */
export const subCategoryHref = (parentSlug: string, childSlug: string): string =>
  `/tootekategooria/${parentSlug}/${childSlug}`

/**
 * Kategooria URL. Eeldab, et `parent` on valja laetud (depth >= 1),
 * muidu jaab tee lyhikeseks ja erineb vana lehe indekseeritud URList.
 */
export const categoryHref = (category: Category): string => {
  const parent = category.parent && typeof category.parent === 'object' ? category.parent : null
  const segments = parent ? [parent.slug, category.slug] : [category.slug]
  return `/tootekategooria/${segments.join('/')}`
}

/** Toote pohipilt, kui see on olemas. */
export const mainImage = (product: Product) => {
  const images = Array.isArray(product.images) ? product.images : []
  const first = images[0]
  return first && typeof first === 'object' ? first : null
}

type ProductDoc = NonNullable<Product['documents']>[number]

/**
 * Valib iga dokumendi jaoks kasutaja keelele koige lahedasema faili.
 *
 * Sama dokument eri keeltes on eraldi read, mida seob tuup + nupu tekst.
 * Eelistus: tapne keel -> inglise -> eesti -> esimene olemasolev.
 * Nii naeb soome keele valinud kasutaja inglisekeelset ohutuskaarti,
 * kui soomekeelset ei ole.
 */
export const pickDocuments = (
  documents: ProductDoc[] | null | undefined,
  locale: Locale,
): ProductDoc[] => {
  const list = Array.isArray(documents) ? documents : []
  if (!list.length) return []

  const groups = new Map<string, ProductDoc[]>()
  for (const doc of list) {
    const key = `${doc.kind}::${(doc.label || '').trim().toLowerCase()}`
    const bucket = groups.get(key)
    if (bucket) bucket.push(doc)
    else groups.set(key, [doc])
  }

  const preference = [locale, 'en', 'et']
  const picked: ProductDoc[] = []
  for (const bucket of groups.values()) {
    let chosen: ProductDoc | undefined
    for (const want of preference) {
      chosen = bucket.find((d) => d.language === want)
      if (chosen) break
    }
    picked.push(chosen ?? bucket[0])
  }
  return picked
}
