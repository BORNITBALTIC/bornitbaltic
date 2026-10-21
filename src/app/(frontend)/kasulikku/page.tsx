import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

import JsonLd from '@/components/JsonLd'
import { getPosts } from '@/lib/catalog'
import { dict, getLocale } from '@/lib/i18n'
import { extra } from '@/lib/i18n-extra'
import { localizePath } from '@/lib/locale-path'
import { breadcrumbLd, pageMetadata } from '@/lib/seo'
import type { Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const x = extra(locale)
  return pageMetadata({ path: '/kasulikku', locale, title: x.posts, description: x.postsLede })
}

export default async function PostsPage() {
  const locale = await getLocale()
  const d = dict(locale)
  const x = extra(locale)
  const posts = await getPosts(locale)

  return (
    <main className="cat-page">
      <JsonLd
        data={breadcrumbLd([
          { name: d.home, path: localizePath('/', locale) },
          { name: x.posts, path: localizePath('/kasulikku', locale) },
        ])}
      />
      <div className="cat-head">
        <div className="wrap">
          <nav className="crumbs" aria-label={d.breadcrumb}>
            <Link href={localizePath('/', locale)}>{d.home}</Link>
            <span aria-hidden="true">/</span>
            <span>{x.posts}</span>
          </nav>
          <h1>{x.posts}</h1>
          <p className="lede">{x.postsLede}</p>
        </div>
      </div>
      <div className="wrap page-body">
        <ul className="post-list">
          {posts.map((post) => {
            const cover = post.cover && typeof post.cover === 'object' ? (post.cover as Media) : null
            const href = localizePath(`/kasulikku/${post.slug}`, locale)
            return (
              <li key={post.id} className="post-card">
                <Link href={href}>
                  {cover?.url ? (
                    <span className="post-card__pic">
                      <img src={cover.sizes?.card?.url || cover.url} alt={cover.alt || post.title} loading="lazy" />
                    </span>
                  ) : null}
                  <span className="post-card__body">
                    <strong>{post.title}</strong>
                    {post.excerpt ? <span>{post.excerpt}</span> : null}
                    <em>{x.readMore} →</em>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
