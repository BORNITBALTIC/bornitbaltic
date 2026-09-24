import React from 'react'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { RichText } from '@payloadcms/richtext-lexical/react'

import CategorySidebar from '@/components/CategorySidebar'
import InquiryForm from '@/components/InquiryForm'
import {
  categoryHref,
  DOC_LABELS,
  getCategoryBySlug,
  getCategoryTree,
  getProductBySlug,
  getProductsByCategories,
  productHref,
} from '@/lib/catalog'
import type { Media, Product } from '@/payload-types'

type Params = { slug: string[] }

const leafSlug = (slug: string[]) => slug[slug.length - 1]

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(leafSlug(slug))
  if (!product) return { title: 'Toodet ei leitud | Bornit Baltic' }
  return {
    title: `${product.title} | Bornit Baltic`,
    description: product.meta?.description || undefined,
  }
}

export const revalidate = 300

const fileOf = (value: unknown): Media | null =>
  value && typeof value === 'object' ? (value as Media) : null

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const last = leafSlug(slug)
  const product = await getProductBySlug(last)

  if (!product) {
    // /tooted/<kategooria> laheb kategooria lehele, muidu 404
    const asCategory = await getCategoryBySlug(last)
    if (asCategory) redirect(categoryHref(asCategory))
    notFound()
  }

  const category = typeof product.category === 'object' ? product.category : null
  const parent = category?.parent && typeof category.parent === 'object' ? category.parent : null

  const tree = await getCategoryTree()
  const siblings = category
    ? (await getProductsByCategories([category.id])).filter((p) => p.id !== product.id).slice(0, 4)
    : []

  const images = (Array.isArray(product.images) ? product.images : [])
    .map(fileOf)
    .filter((m): m is Media => Boolean(m?.url))
  const hero = images[0]
  const gallery = images.slice(1)

  const docs = (Array.isArray(product.documents) ? product.documents : []).filter((d) =>
    Boolean(fileOf(d.file)?.url),
  )
  const primaryDocs = docs.filter((d) => d.kind === 'tehniline_info' || d.kind === 'ohutuskaart')
  const otherDocs = docs.filter((d) => d.kind !== 'tehniline_info' && d.kind !== 'ohutuskaart')
  const measures = Array.isArray(product.measures) ? product.measures : []

  return (
    <main className="prod-page">
      <div className="cat-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Asukoht">
            <Link href="/">Avaleht</Link>
            <span aria-hidden="true">/</span>
            <Link href="/tooted">Tooted</Link>
            {parent && (
              <>
                <span aria-hidden="true">/</span>
                <Link href={categoryHref(parent)}>{parent.name}</Link>
              </>
            )}
            {category && (
              <>
                <span aria-hidden="true">/</span>
                <Link href={categoryHref(category)}>{category.name}</Link>
              </>
            )}
          </nav>
          <h1>{product.title}</h1>
        </div>
      </div>

      <div className="wrap cat-layout">
        <CategorySidebar tree={tree} activeSlug={category?.slug} />

        <div className="cat-main prod-main">
          <div className="prod-top">
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

            <div className="prod-intro">
              {product.lead ? (
                <div className="prod-lede">
                  <RichText data={product.lead} />
                </div>
              ) : null}

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
                      >
                        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7">
                          <use href="#i-doc" />
                        </svg>
                        {doc.label || DOC_LABELS[doc.kind] || 'Dokument'}
                        <span className="doc-btn__ext">PDF</span>
                      </a>
                    )
                  })}
                </div>
              )}

              <a className="btn btn-primary prod-cta" href="#paring">
                K&uuml;si hinnap&auml;ring
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <use href="#i-arrow" />
                </svg>
              </a>
            </div>
          </div>

          {product.description ? (
            <section className="prod-block">
              <h2>Kirjeldus</h2>
              <div className="prose">
                <RichText data={product.description} />
              </div>
            </section>
          ) : null}

          {measures.length > 0 && (
            <section className="prod-block">
              <h2>Tehnilised andmed</h2>
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

          {(docs.length > 0 || otherDocs.length > 0) && (
            <section className="prod-block">
              <h2>Dokumendid</h2>
              <ul className="doc-list">
                {docs.map((doc, i) => {
                  const file = fileOf(doc.file) as Media
                  return (
                    <li key={i}>
                      <a href={file.url as string} target="_blank" rel="noopener">
                        <svg width="18" height="18" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7">
                          <use href="#i-doc" />
                        </svg>
                        <span>{doc.label || DOC_LABELS[doc.kind] || 'Dokument'}</span>
                        <em>{DOC_LABELS[doc.kind] || 'Dokument'}</em>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}

          {gallery.length > 0 && (
            <section className="prod-block">
              <h2>Pildid</h2>
              <ul className="prod-gallery">
                {gallery.map((img) => (
                  <li key={img.id}>
                    <a href={img.url as string} target="_blank" rel="noopener">
                      <img src={img.url as string} alt={img.alt || product.title} loading="lazy" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="prod-block">
            <InquiryForm
              productId={product.id}
              productTitle={product.title}
              sourceUrl={productHref(product)}
            />
          </section>

          {siblings.length > 0 && (
            <section className="prod-block">
              <h2>Samast kategooriast</h2>
              <ul className="rel-list">
                {siblings.map((s: Product) => (
                  <li key={s.id}>
                    <Link href={productHref(s)}>{s.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}
