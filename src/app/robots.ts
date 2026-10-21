import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'

/**
 * Paris domeenil (bornitbaltic.ee) on leht indekseeritav ja viitab sitemapile.
 * Railway testdomeen ja muud aadressid on Google'i eest kinni, et ei tekiks
 * duplikaatsisu. Sama teeb X-Robots-Tag next.config'is.
 */
export const dynamic = 'force-dynamic'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const h = await headers()
  const host = (h.get('x-forwarded-host') || h.get('host') || '').toLowerCase().replace(/:\d+$/, '')
  const production = /^(www\.)?bornitbaltic\.ee$/.test(host)
  if (!production) return { rules: [{ userAgent: '*', disallow: '/' }] }
  return {
    rules: [{ userAgent: '*', allow: ['/', '/api/media/'], disallow: ['/admin', '/api/', '/paring/'] }],
    sitemap: 'https://bornitbaltic.ee/sitemap.xml',
    host: 'https://bornitbaltic.ee',
  }
}
