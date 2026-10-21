import type { Metadata } from 'next'

import { localizePath, OG_LOCALE, SITE_LOCALES, type SiteLocale } from './locale-path'

/**
 * Avalik aadress, mille vastu tehakse canonical, hreflang ja Open Graph.
 * Railway testdomeenil on X-Robots-Tag noindex (next.config), seega
 * testlehe vaartused ei satu Google'isse. Domeeni ulevviimisel pane
 * NEXT_PUBLIC_SERVER_URL=https://bornitbaltic.ee.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SERVER_URL || 'https://bornitbaltic.ee').replace(/\/+$/, '')

const asSite = (l: string): SiteLocale =>
  (SITE_LOCALES as readonly string[]).includes(l) ? (l as SiteLocale) : 'et'

/** canonical + hreflang koigile neljale keelele ja x-default. */
export const alternatesFor = (path: string, locale: string): Metadata['alternates'] => {
  const languages: Record<string, string> = {}
  for (const l of SITE_LOCALES) languages[l] = localizePath(path, l)
  languages['x-default'] = path
  return { canonical: localizePath(path, asSite(locale)), languages }
}

export const pageMetadata = ({
  path,
  locale,
  title,
  description,
  image,
  type = 'website',
}: {
  path: string
  locale: string
  title: string
  description?: string | null
  image?: string | null
  type?: 'website' | 'article'
}): Metadata => {
  const desc = description ? clip(description, 158) : undefined
  return {
    title,
    description: desc,
    alternates: alternatesFor(path, locale),
    openGraph: {
      type,
      siteName: 'Bornit Baltic',
      title,
      description: desc,
      url: localizePath(path, asSite(locale)),
      locale: OG_LOCALE[asSite(locale)],
      images: image ? [{ url: image }] : [{ url: '/img/hero.webp', width: 1672, height: 836 }],
    },
    twitter: { card: 'summary_large_image', title, description: desc },
  }
}

/** Lyhendab teksti sona piirilt. */
export const clip = (text: string, max: number): string => {
  const t = text.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  const cut = t.slice(0, max - 1)
  return cut.slice(0, cut.lastIndexOf(' ') > 60 ? cut.lastIndexOf(' ') : cut.length).trimEnd() + '…'
}

/** Lexical rikkteksti tavatekst. */
export const plainText = (value: unknown): string => {
  const walk = (node: any): string => {
    if (!node) return ''
    if (typeof node.text === 'string') return node.text
    if (Array.isArray(node.children)) return node.children.map(walk).join(' ')
    if (node.root) return walk(node.root)
    return ''
  }
  return walk(value).replace(/\s+/g, ' ').trim()
}

export const absolute = (path: string): string => (path.startsWith('http') ? path : SITE_URL + path)

export const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Bornit Baltic OÜ',
  url: SITE_URL,
  logo: `${SITE_URL}/logo-bornit.png`,
  email: 'info@bornitbaltic.ee',
  telephone: '+372 526 5087',
  areaServed: ['EE', 'LV', 'LT', 'FI'],
  sameAs: ['https://www.facebook.com/bornitbaltic/'],
}

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: absolute(it.path),
  })),
})
