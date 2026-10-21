import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

import CategorySidebar from '@/components/CategorySidebar'
import JsonLd from '@/components/JsonLd'
import { categoryHref, getCategoryTree } from '@/lib/catalog'
import { dict, getLocale } from '@/lib/i18n'
import { extra } from '@/lib/i18n-extra'
import { localizePath } from '@/lib/locale-path'
import { breadcrumbLd, pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const x = extra(locale)
  return pageMetadata({ path: '/tooted', locale, title: x.productsTitle, description: x.productsDescription })
}

/**
 * Renderdatakse paringu ajal: Railway privaatvork (Postgres) ei ole
 * ehituse ajal kattesaadav.
 */
export const dynamic = 'force-dynamic'

export default async function ProductsIndexPage() {
  const locale = await getLocale()
  const d = dict(locale)
  const tree = await getCategoryTree(locale)

  return (
    <main className="cat-page">
      <JsonLd
        data={breadcrumbLd([
          { name: d.home, path: localizePath('/', locale) },
          { name: d.products, path: localizePath('/tooted', locale) },
        ])}
      />
      <div className="cat-head">
        <div className="wrap">
          <nav className="crumbs" aria-label={d.breadcrumb}>
            <Link href={localizePath('/', locale)}>{d.home}</Link>
            <span aria-hidden="true">/</span>
            <span>{d.products}</span>
          </nav>
          <h1>{d.products}</h1>
          <p className="lede">{d.productsLede}</p>
        </div>
      </div>

      <div className="wrap cat-layout">
        <CategorySidebar tree={tree} locale={locale} />

        <div className="cat-main">
          <ul className="cat-cards">
            {tree.map((node) => (
              <li key={node.id} className="cat-card">
                <Link href={categoryHref(node, locale)}>
                  <span className="cat-card__icon" aria-hidden="true">
                    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <use href={`#${node.icon || 'i-doc'}`} />
                    </svg>
                  </span>
                  <span className="cat-card__body">
                    <strong>{node.name}</strong>
                    {node.description ? <span>{node.description}</span> : null}
                    {node.children.length > 0 && (
                      <span className="cat-card__subs">
                        {node.children.map((c) => c.name).join(' · ')}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
