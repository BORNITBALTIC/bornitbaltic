import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import CategorySidebar from '@/components/CategorySidebar'
import ProductGrid from '@/components/ProductGrid'
import {
  categoryHref,
  getCategoryBySlug,
  getCategoryTree,
  getCategoryWithDescendants,
  getProductsByCategories,
} from '@/lib/catalog'

type Params = { slug: string[] }

/** URL on /tootekategooria/<kat>/<alamkat>; loeb ainult viimane segment. */
const leafSlug = (slug: string[]) => slug[slug.length - 1]

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(leafSlug(slug))
  if (!category) return { title: 'Kategooriat ei leitud | Bornit Baltic' }
  return {
    title: `${category.name} | Bornit Baltic`,
    description: category.description || undefined,
  }
}

export const revalidate = 300

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(leafSlug(slug))
  if (!category) notFound()

  const [tree, ids] = await Promise.all([
    getCategoryTree(),
    getCategoryWithDescendants(category),
  ])
  const products = await getProductsByCategories(ids)

  const parent = category.parent && typeof category.parent === 'object' ? category.parent : null

  return (
    <main className="cat-page">
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
            <span aria-hidden="true">/</span>
            <span>{category.name}</span>
          </nav>
          <h1>{category.name}</h1>
          {category.description ? <p className="lede">{category.description}</p> : null}
          <p className="cat-count">
            {products.length} {products.length === 1 ? 'toode' : 'toodet'}
          </p>
        </div>
      </div>

      <div className="wrap cat-layout">
        <CategorySidebar tree={tree} activeSlug={category.slug} />
        <div className="cat-main">
          <ProductGrid products={products} />
        </div>
      </div>
    </main>
  )
}
