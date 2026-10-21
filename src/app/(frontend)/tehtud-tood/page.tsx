import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

import JsonLd from '@/components/JsonLd'
import { getSiteContent } from '@/lib/catalog'
import { dict, getLocale } from '@/lib/i18n'
import { extra } from '@/lib/i18n-extra'
import { localizePath } from '@/lib/locale-path'
import { breadcrumbLd, pageMetadata } from '@/lib/seo'
import type { Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

const mediaOf = (v: unknown): Media | null => (v && typeof v === 'object' ? (v as Media) : null)

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const x = extra(locale)
  const site = await getSiteContent(locale)
  const cover = mediaOf(site?.works?.[0]?.image)
  return pageMetadata({ path: '/tehtud-tood', locale, title: x.works, description: x.worksLede, image: cover?.url })
}

/** Koik tehtud tood koos galeriidega (vana lehe /tehtud-tood/ asemel). */
export default async function WorksPage() {
  const locale = await getLocale()
  const d = dict(locale)
  const x = extra(locale)
  const site = await getSiteContent(locale)
  const works = (site?.works || []).filter((w) => mediaOf(w.image)?.url)

  return (
    <main className="cat-page">
      <JsonLd
        data={breadcrumbLd([
          { name: d.home, path: localizePath('/', locale) },
          { name: x.works, path: localizePath('/tehtud-tood', locale) },
        ])}
      />
      <div className="cat-head">
        <div className="wrap">
          <nav className="crumbs" aria-label={d.breadcrumb}>
            <Link href={localizePath('/', locale)}>{d.home}</Link>
            <span aria-hidden="true">/</span>
            <span>{x.works}</span>
          </nav>
          <h1>{site?.worksTitle || x.works}</h1>
          <p className="lede">{x.worksLede}</p>
        </div>
      </div>
      <div className="wrap page-body">
        <ol className="works-list">
          {works.map((w, i) => {
            const cover = mediaOf(w.image) as Media
            const gallery = (Array.isArray(w.gallery) ? w.gallery : []).map(mediaOf).filter((m): m is Media => Boolean(m?.url))
            return (
              <li key={w.id || i} id={`too-${i + 1}`} className="works-item">
                <a className="works-item__cover" href={cover.url as string} target="_blank" rel="noopener">
                  <img src={cover.sizes?.wide?.url || cover.url || ''} alt={cover.alt || w.title} loading={i < 2 ? 'eager' : 'lazy'} />
                </a>
                <div className="works-item__txt">
                  <h2>{w.title}</h2>
                  {w.meta ? <p className="meta">{w.meta}</p> : null}
                  {gallery.length > 0 && (
                    <ul className="works-item__gallery">
                      {gallery.map((g) => (
                        <li key={g.id}>
                          <a href={g.url as string} target="_blank" rel="noopener">
                            <img src={g.sizes?.thumbnail?.url || g.url || ''} alt={g.alt || w.title} loading="lazy" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
        <p className="works-cta">
          <Link className="btn btn-primary" href={localizePath('/#kontakt', locale)}>
            {d.askPrice}
          </Link>
        </p>
      </div>
    </main>
  )
}
