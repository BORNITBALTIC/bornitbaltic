import React from 'react'

import { getSiteContent } from '@/lib/catalog'
import { getLocale } from '@/lib/i18n'
import { homeHtml } from '@/lib/template'
import type { Media, SiteContent } from '@/payload-types'

/**
 * Avaleht on kliendi kinnitatud kujundus. Teenuste ja tehtud toode plokid
 * tulevad administ (global "Avalehe sisu"); kui seal on tuhi, jaab template'i
 * algsisu. Ehituse ajal andmebaasi ei kysita (force-dynamic).
 */
export const dynamic = 'force-dynamic'

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

const worksHtml = (site: SiteContent): string | null => {
  const list = (Array.isArray(site.works) ? site.works : []).filter((w) => mediaOf(w.image)?.url)
  if (!list.length) return null
  return list
    .map((w) => {
      const img = mediaOf(w.image) as Media
      return (
        `<article class="work"><div class="pic"><img src="${esc(img.url)}" width="900" height="562" loading="lazy" decoding="async" alt="${esc(img.alt || w.title)}"></div>` +
        `<div class="txt"><h3>${esc(w.title)}</h3>${w.meta ? `<p class="meta">${esc(w.meta)}</p>` : ''}</div></article>`
      )
    })
    .join('')
}

/** Asendab template'i ploki sisu; data-i18n votab maha, et site.js seda enam ule ei kirjutaks. */
const replaceBlock = (html: string, className: string, inner: string): string =>
  html.replace(new RegExp(`(<div class="${className}">)[\\s\\S]*?(</div>\\s*</div>\\s*</section>)`), `$1${inner}$2`)

const replaceTitle = (html: string, key: string, title: string): string =>
  html.replace(new RegExp(`(<h2[^>]*?) data-i18n="${key}">[^<]*</h2>`), `$1>${esc(title)}</h2>`)

export default async function HomePage() {
  const locale = await getLocale()
  const site = await getSiteContent(locale)
  let html = homeHtml

  if (site) {
    const svc = servicesHtml(site)
    if (svc) {
      html = replaceBlock(html, 'svc rv', svc)
      if (site.servicesTitle) html = replaceTitle(html, 's-h2', site.servicesTitle)
    }
    const works = worksHtml(site)
    if (works) {
      html = replaceBlock(html, 'works rv', works)
      if (site.worksTitle) html = replaceTitle(html, 'w-h2', site.worksTitle)
    }
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
