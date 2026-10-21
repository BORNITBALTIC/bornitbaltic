import React from 'react'
import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import type { Metadata } from 'next'

import CategorySidebar from '@/components/CategorySidebar'
import JsonLd from '@/components/JsonLd'
import ProductGrid from '@/components/ProductGrid'
import {
  categoryHref,
  getCategoryBySlug,
  getCategoryTree,
  getCategoryWithDescendants,
  getProductsByCategories,
  getRedirectTarget,
} from '@/lib/catalog'
import { dict, getLocale } from '@/lib/i18n'
import { localizePath } from '@/lib/locale-path'
import { breadcrumbLd, pageMetadata } from '@/lib/seo'

type Params = { slug: string[] }

/** URL on /tootekategooria/<kat>/<alamkat>; loeb ainult viimane segment. */
const leafSlug = (slug: string[]) => slug[slug.length - 1]

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const locale = await getLocale()
  const { slug } = await params
  const category = await getCategoryBySlug(leafSlug(slug), locale)
  if (!category) return { title: dict(locale).empty, robots: { index: false } }
  const d = dict(locale)
  return pageMetadata({
    path: categoryHref(category),
    locale,
    title: category.name,
    description: category.description || `${category.name}. ${d.productsLede}`,
  })
}

export const dynamic = 'force-dynamic'

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const locale = await getLocale()
  const d = dict(locale)

  const { slug } = await params
  const category = await getCategoryBySlug(leafSlug(slug), locale)
  if (!category) {
    // kategooria on umber nimetatud voi liidetud: suunamine administ, muidu 404
    const target = await getRedirectTarget('/tootekategooria/' + slug.join('/'))
    if (target) permanentRedirect(localizePath(target, locale))
    notFound()
  }

  const [tree, ids] = await Promise.all([
    getCategoryTree(locale),
    getCategoryWithDescendants(category),
  ])
  const products = await getProductsByCategories(ids, locale)

  const parent = category.parent && typeof category.parent === 'object' ? category.parent : null

  const crumbs = [
    { name: d.home, path: localizePath('/', locale) },
    { name: d.products, path: localizePath('/tooted', locale) },
    ...(parent ? [{ name: parent.name, path: categoryHref(parent, locale) }] : []),
    { name: category.name, path: categoryHref(category, locale) },
  ]

  return (
    <main className="cat-page">
      <JsonLd data={breadcrumbLd(crumbs)} />
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
            <span aria-hidden="true">/</span>
            <span>{category.name}</span>
          </nav>
          <h1>{category.name}</h1>
          {category.description ? <p className="lede">{category.description}</p> : null}
          <p className="cat-count">{d.productCount(products.length)}</p>
        </div>
      </div>

      <div className="wrap cat-layout">
        <CategorySidebar tree={tree} activeSlug={category.slug} locale={locale} />
        <div className="cat-main">
          <ProductGrid products={products} locale={locale} />
        </div>
      </div>
    </main>
  )
}
