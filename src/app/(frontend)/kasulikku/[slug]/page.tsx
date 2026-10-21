import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { RichText } from '@payloadcms/richtext-lexical/react'

import JsonLd from '@/components/JsonLd'
import { getPostBySlug } from '@/lib/catalog'
import { dict, getLocale } from '@/lib/i18n'
import { extra } from '@/lib/i18n-extra'
import { localizePath } from '@/lib/locale-path'
import { absolute, breadcrumbLd, pageMetadata, plainText } from '@/lib/seo'
import type { Media } from '@/payload-types'

type Params = { slug: string }

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const locale = await getLocale()
  const { slug } = await params
  const post = await getPostBySlug(slug, locale)
  if (!post) return { title: dict(locale).empty, robots: { index: false } }
  const cover = post.cover && typeof post.cover === 'object' ? (post.cover as Media) : null
  return pageMetadata({
    path: `/kasulikku/${post.slug}`,
    locale,
    title: post.title,
    description: post.excerpt || plainText(post.content),
    image: cover?.url || null,
    type: 'article',
  })
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const locale = await getLocale()
  const d = dict(locale)
  const x = extra(locale)
  const { slug } = await params
  const post = await getPostBySlug(slug, locale)
  if (!post) notFound()

  const cover = post.cover && typeof post.cover === 'object' ? (post.cover as Media) : null
  const href = localizePath(`/kasulikku/${post.slug}`, locale)

  return (
    <main className="cat-page">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: d.home, path: localizePath('/', locale) },
            { name: x.posts, path: localizePath('/kasulikku', locale) },
            { name: post.title, path: href },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            datePublished: post.publishedAt || post.createdAt,
            dateModified: post.updatedAt,
            image: cover?.url ? [absolute(cover.url)] : undefined,
            author: { '@type': 'Organization', name: 'Bornit Baltic OÜ' },
            publisher: { '@type': 'Organization', name: 'Bornit Baltic OÜ' },
            mainEntityOfPage: absolute(href),
          },
        ]}
      />
      <div className="cat-head">
        <div className="wrap">
          <nav className="crumbs" aria-label={d.breadcrumb}>
            <Link href={localizePath('/', locale)}>{d.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href={localizePath('/kasulikku', locale)}>{x.posts}</Link>
          </nav>
          <h1>{post.title}</h1>
        </div>
      </div>
      <div className="wrap page-body">
        <article className="post">
          {cover?.url ? (
            <img className="post__cover" src={cover.sizes?.wide?.url || cover.url} alt={cover.alt || post.title} />
          ) : null}
          {post.content ? (
            <div className="prose">
              <RichText data={post.content} />
            </div>
          ) : null}
          <p className="post__back">
            <Link href={localizePath('/kasulikku', locale)}>← {x.backToPosts}</Link>
          </p>
        </article>
      </div>
    </main>
  )
}
