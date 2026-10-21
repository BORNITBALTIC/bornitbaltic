import React from 'react'
import Link from 'next/link'
import { notFound, permanentRedirect, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { RichText } from '@payloadcms/richtext-lexical/react'

import CategorySidebar from '@/components/CategorySidebar'
import InquiryForm from '@/components/InquiryForm'
import JsonLd from '@/components/JsonLd'
import ProductGrid from '@/components/ProductGrid'
import {
  categoryHref,
  getCategoryBySlug,
  getCategoryTree,
  getProductBySlug,
  getProductsByCategories,
  getRedirectTarget,
  pickDocuments,
  productHref,
} from '@/lib/catalog'
import { dict, formStrings, getLocale } from '@/lib/i18n'
import { localizePath } from '@/lib/locale-path'
import { absolute, breadcrumbLd, clip, pageMetadata, plainText } from '@/lib/seo'
import type { Media } from '@/payload-types'

type Params = { slug: string[] }

const leafSlug = (slug: string[]) => slug[slug.length - 1]

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const locale = await getLocale()
  const { slug } = await params
  const product = await getProductBySlug(leafSlug(slug), locale)
  if (!product) return { title: dict(locale).empty, robots: { index: false } }
  const images = Array.isArray(product.images) ? product.images : []
  const first = images[0] && typeof images[0] === 'object' ? (images[0] as Media) : null
  return pageMetadata({
    path: productHref(product),
    locale,
    title: product.meta?.title?.replace(/\s*\|\s*Bornit Baltic\s*$/, '') || product.title,
    description: product.meta?.description || plainText(product.lead) || plainText(product.description),
    image: first?.url || null,
  })
}

export const dynamic = 'force-dynamic'

const fileOf = (value: unknown): Media | null =>
  value && typeof value === 'object' ? (value as Media) : null

/** Lexical sisu tekstina, et vorrelda lyhikirjeldust ja kirjeldust (import tegi need tihti samaks). */
const plain = (value: unknown): string => {
  const walk = (node: any): string => {
    if (!node) return ''
    if (typeof node.text === 'string') return node.text
    if (Array.isArray(node.children)) return node.children.map(walk).join(' ')
    if (node.root) return walk(node.root)
    return ''
  }
  return walk(value).replace(/\s+/g, ' ').trim()
}

const LANG_NAMES: Record<string, string> = { et: 'ET', en: 'EN', fi: 'FI', lv: 'LV', lt: 'LT', de: 'DE' }
const langBadge = (code?: string | null) =>
  code && LANG_NAMES[code] ? <span className="lang-badge">{LANG_NAMES[code]}</span> : null

const DocIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7">
    <use href="#i-doc" />
  </svg>
)

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const locale = await getLocale()
  const d = dict(locale)

  const { slug } = await params
  const last = leafSlug(slug)
  const product = await getProductBySlug(last, locale)

  if (!product) {
    // 1) suunamine administ (kategooriate umberkorraldus), 2) /tooted/<kategooria>, 3) 404
    const target = await getRedirectTarget('/tooted/' + slug.join('/'))
    if (target) permanentRedirect(localizePath(target, locale))
    const asCategory = await getCategoryBySlug(last, locale)
    if (asCategory) redirect(categoryHref(asCategory, locale))
    notFound()
  }

  const category = typeof product.category === 'object' ? product.category : null
  const parent = category?.parent && typeof category.parent === 'object' ? category.parent : null

  const tree = await getCategoryTree(locale)
  const siblings = category
    ? (await getProductsByCategories([category.id], locale))
        .filter((p) => p.id !== product.id)
        .slice(0, 4)
    : []

  const images = (Array.isArray(product.images) ? product.images : [])
    .map(fileOf)
    .filter((m): m is Media => Boolean(m?.url))
  const hero = images[0]

  // igast dokumendist valitakse kasutaja keelele koige lahedasem fail
  const docs = pickDocuments(product.documents, locale).filter((doc) =>
    Boolean(fileOf(doc.file)?.url),
  )
  const primaryDocs = docs.filter(
    (doc) => doc.kind === 'tehniline_info' || doc.kind === 'ohutuskaart',
  )
  const measures = Array.isArray(product.measures) ? product.measures : []
  const drawings = (Array.isArray(product.drawings) ? product.drawings : []).filter((dr) =>
    Boolean(fileOf(dr.file)?.url),
  )

  const docLabel = (doc: (typeof docs)[number]) => doc.label || d.docKinds[doc.kind] || d.docKinds.muu
  const brandName: Record<string, string> = { bornit: 'BORNIT®', grun: 'GRÜN', silikal: 'SILIKAL', muu: '' }
  const showDescription = Boolean(product.description) && plain(product.description) !== plain(product.lead)

  return (
    <main className="prod-page">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: d.home, path: localizePath('/', locale) },
            { name: d.products, path: localizePath('/tooted', locale) },
            ...(parent ? [{ name: parent.name, path: categoryHref(parent, locale) }] : []),
            ...(category ? [{ name: category.name, path: categoryHref(category, locale) }] : []),
            { name: product.title, path: productHref(product, locale) },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.title,
            description: clip(plainText(product.lead) || plainText(product.description) || product.title, 500),
            url: absolute(productHref(product, locale)),
            image: images.map((m) => absolute(m.url as string)),
            category: category?.name,
            ...(product.brand && product.brand !== 'muu'
              ? { brand: { '@type': 'Brand', name: ({ bornit: 'BORNIT', grun: 'GRÜN', silikal: 'SILIKAL' } as Record<string, string>)[product.brand] } }
              : {}),
          },
        ]}
      />
      <div className="cat-head">
        <div className="wrap">
          <nav className="crumbs" aria-label={d.breadcrumb}>
            <Link href={localizePath('/', locale)}>{d.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href={localizePath('/tooted', locale)}>{d.products}</Link>
            {parent && (
              <>
                <span aria-hidden="true">/</span>
                <Link href={categoryHref(parent, locale)}>{parent.name}</Link>
              </>
            )}
            {category && (
              <>
                <span aria-hidden="true">/</span>
                <Link href={categoryHref(category, locale)}>{category.name}</Link>
              </>
            )}
          </nav>
          <h1>{product.title}</h1>
        </div>
      </div>

      <div className="wrap cat-layout">
        <CategorySidebar tree={tree} activeSlug={category?.slug} locale={locale} />

        <div className="cat-main prod-main">
          <div className="prod-top">
            <div className="prod-media">
              <div className="prod-hero">
                {hero?.url ? (
                  <img src={hero.url} alt={hero.alt || product.title} />
                ) : (
                  <div className="prod-hero__ph" aria-hidden="true">
                    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <use href="#i-doc" />
                    </svg>
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <ul className="prod-thumbs" aria-label={d.images}>
                  {images.map((img) => (
                    <li key={img.id}>
                      <a href={img.url as string} target="_blank" rel="noopener">
                        <img src={img.url as string} alt={img.alt || product.title} loading="lazy" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="prod-intro">
              {product.lead ? (
                <div className="prod-lede">
                  <RichText data={product.lead} />
                </div>
              ) : null}

              <ul className="prod-facts">
                {product.brand && brandName[product.brand] ? (
                  <li>
                    <strong>{brandName[product.brand]}</strong>
                  </li>
                ) : null}
                {category ? (
                  <li>
                    <Link href={categoryHref(category, locale)}>{category.name}</Link>
                  </li>
                ) : null}
                {measures[0] ? (
                  <li>
                    {measures[0].nimi}: <strong>{measures[0].vaartus}</strong>
                  </li>
                ) : null}
              </ul>

              {primaryDocs.length > 0 && (
                <div className="doc-row">
                  {primaryDocs.map((doc, i) => {
                    const file = fileOf(doc.file) as Media
                    const isSheet = doc.kind === 'ohutuskaart'
                    return (
                      <a
                        key={i}
                        className={isSheet ? 'doc-btn doc-btn--warn' : 'doc-btn'}
                        href={file.url as string}
                        target="_blank"
                        rel="noopener"
                        hrefLang={doc.language || undefined}
                      >
                        <DocIcon />
                        {docLabel(doc)}
                        {langBadge(doc.language)}
                        <span className="doc-btn__ext">{d.pdf}</span>
                      </a>
                    )
                  })}
                </div>
              )}

              <a className="btn btn-primary prod-cta" href="#paring">
                {d.askPrice}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <use href="#i-arrow" />
                </svg>
              </a>
            </div>
          </div>

          {showDescription ? (
            <section className="prod-block">
              <h2>{d.description}</h2>
              <div className="prose">
                <RichText data={product.description!} />
              </div>
            </section>
          ) : null}

          {measures.length > 0 && (
            <section className="prod-block">
              <h2>{d.specs}</h2>
              <table className="spec">
                <tbody>
                  {measures.map((row, i) => (
                    <tr key={i}>
                      <th scope="row">{row.nimi}</th>
                      <td>{row.vaartus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {drawings.length > 0 && (
            <section className="prod-block" id="joonised">
              <h2>{d.drawings}</h2>
              <ul className="drawings">
                {drawings.map((dr, i) => {
                  const file = fileOf(dr.file) as Media
                  const isImage = (file.mimeType || '').startsWith('image/')
                  return (
                    <li key={dr.id || i}>
                      <a href={file.url as string} target="_blank" rel="noopener">
                        {isImage ? (
                          <img src={file.url as string} alt={dr.caption || file.alt || product.title} loading="lazy" />
                        ) : (
                          <span className="drawings__pdf" aria-hidden="true">
                            <DocIcon size={44} />
                          </span>
                        )}
                        {dr.caption ? <figcaption>{dr.caption}</figcaption> : null}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}

          {docs.length > 0 && (
            <section className="prod-block">
              <h2>{d.documents}</h2>
              <ul className="doc-list">
                {docs.map((doc, i) => {
                  const file = fileOf(doc.file) as Media
                  return (
                    <li key={i}>
                      <a href={file.url as string} target="_blank" rel="noopener" hrefLang={doc.language || undefined}>
                        <DocIcon size={18} />
                        <span>{docLabel(doc)}</span>
                        <em>
                          {d.docKinds[doc.kind] || d.docKinds.muu}
                          {langBadge(doc.language)}
                        </em>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}

          <section className="prod-block">
            <InquiryForm
              productId={product.id}
              productTitle={product.title}
              sourceUrl={productHref(product)}
              locale={locale}
              strings={formStrings(locale)}
            />
          </section>

          {siblings.length > 0 && (
            <section className="prod-block prod-related">
              <h2>{d.related}</h2>
              <ProductGrid products={siblings} locale={locale} />
              {category ? (
                <Link className="prod-related__more" href={categoryHref(category, locale)}>
                  {category.name} →
                </Link>
              ) : null}
            </section>
          )}
        </div>
      </div>
    </main>
  )
}
