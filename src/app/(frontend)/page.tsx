import React from 'react'
import type { Metadata } from 'next'

import JsonLd from '@/components/JsonLd'
import { getSiteContent } from '@/lib/catalog'
import { getLocale } from '@/lib/i18n'
import { extra } from '@/lib/i18n-extra'
import { localizePath } from '@/lib/locale-path'
import { ORGANIZATION, pageMetadata } from '@/lib/seo'
import { homeHtml, localizeHtml } from '@/lib/template'
import type { Media, SiteContent } from '@/payload-types'

/**
 * Avaleht on kliendi kinnitatud kujundus. Tekstid tolgitakse serveris
 * (localizeHtml), teenuste ja tehtud toode plokid tulevad administ
 * (global "Avalehe sisu"); kui seal on tuhi, jaab template'i sisu.
 */
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const x = extra(locale)
  const meta = pageMetadata({ path: '/', locale, title: x.siteTitle, description: x.siteDescription })
  return { ...meta, title: { absolute: x.siteTitle } }
}

const HOME_WORKS = 6

const esc = (s: unknown): string =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const mediaOf = (v: unknown): Media | null => (v && typeof v === 'object' ? (v as Media) : null)

const servicesHtml = (site: SiteContent): string | null => {
  const list = Array.isArray(site.services) ? site.services : []
  if (!list.length) return null
  return list
    .map(
      (s) =>
        `<article><svg><use href="#${esc(s.icon || 'i-doc')}"/></svg><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></article>`,
    )
    .join('')
}

const worksHtml = (site: SiteContent, locale: string): string | null => {
  const list = (Array.isArray(site.works) ? site.works : []).filter((w) => mediaOf(w.image)?.url)
  if (!list.length) return null
  const page = localizePath('/tehtud-tood', locale)
  return list
    .slice(0, HOME_WORKS)
    .map((w, i) => {
      const img = mediaOf(w.image) as Media
      const src = img.sizes?.card?.url || img.url
      return (
        `<article class="work"><a class="work__link" href="${page}#too-${i + 1}">` +
        `<div class="pic"><img src="${esc(src)}" width="900" height="562" loading="lazy" decoding="async" alt="${esc(img.alt || w.title)}"></div>` +
        `<div class="txt"><h3>${esc(w.title)}</h3>${w.meta ? `<p class="meta">${esc(w.meta)}</p>` : ''}</div></a></article>`
      )
    })
    .join('')
}

/** Asendab template'i ploki sisu. */
const replaceBlock = (html: string, className: string, inner: string): string =>
  html.replace(new RegExp(`(<div class="${className}">)[\\s\\S]*?(</div>\\s*</div>\\s*</section>)`), `$1${inner}$2`)

const replaceTitle = (html: string, key: string, title: string): string =>
  html.replace(new RegExp(`(<h2[^>]*?) data-i18n="${key}">[^<]*</h2>`), `$1>${esc(title)}</h2>`)

export default async function HomePage() {
  const locale = await getLocale()
  const x = extra(locale)
  const site = await getSiteContent(locale)
  let html = localizeHtml(homeHtml, locale)

  if (site) {
    const svc = servicesHtml(site)
    if (svc) {
      html = replaceBlock(html, 'svc rv', svc)
      if (site.servicesTitle) html = replaceTitle(html, 's-h2', site.servicesTitle)
    }
    const works = worksHtml(site, locale)
    if (works) {
      const more = `<p class="works-more"><a class="btn btn-ghost-dark" href="${localizePath('/tehtud-tood', locale)}">${esc(x.allWorks)} →</a></p>`
      html = html.replace(
        /(<div class="works rv">)[\s\S]*?(<\/div>)(\s*<\/div>\s*<\/section>)/,
        `$1${works}$2${more}$3`,
      )
      if (site.worksTitle) html = replaceTitle(html, 'w-h2', site.worksTitle)
    }
  }

  return (
    <>
      <JsonLd data={ORGANIZATION} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  )
}
