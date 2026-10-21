import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { localizePath, SITE_LOCALES } from '@/lib/locale-path'
import { SITE_URL } from '@/lib/seo'

/**
 * Koik lehed neljas keeles, iga kirje juures teiste keelte vasted (hreflang).
 * Renderdatakse paringu ajal, sest andmebaas ei ole ehituse ajal kattesaadav.
 */
export const dynamic = 'force-dynamic'

const entry = (path: string, lastModified?: string | Date, priority = 0.6): MetadataRoute.Sitemap => {
  const languages: Record<string, string> = {}
  for (const l of SITE_LOCALES) languages[l] = SITE_URL + localizePath(path, l)
  return SITE_LOCALES.map((l) => ({
    url: SITE_URL + localizePath(path, l),
    lastModified: lastModified ? new Date(lastModified) : undefined,
    priority,
    alternates: { languages },
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: await config })
  const [cats, products, posts] = await Promise.all([
    payload.find({ collection: 'categories', limit: 500, pagination: false, depth: 1 }),
    payload.find({ collection: 'products', limit: 1000, pagination: false, depth: 2 }),
    payload.find({ collection: 'posts', limit: 200, pagination: false, depth: 0 }),
  ])

  const catPath = (c: any): string => {
    const parent = c.parent && typeof c.parent === 'object' ? c.parent : null
    return `/tootekategooria/${parent ? `${parent.slug}/` : ''}${c.slug}`
  }
  const prodPath = (p: any): string => {
    const cat = p.category && typeof p.category === 'object' ? p.category : null
    if (!cat) return `/tooted/${p.slug}`
    const parent = cat.parent && typeof cat.parent === 'object' ? cat.parent : null
    return `/tooted/${parent ? `${parent.slug}/` : ''}${cat.slug}/${p.slug}`
  }

  return [
    ...entry('/', undefined, 1),
    ...entry('/tooted', undefined, 0.9),
    ...entry('/tehtud-tood', undefined, 0.7),
    ...entry('/kasulikku', undefined, 0.5),
    ...cats.docs.flatMap((c) => entry(catPath(c), c.updatedAt, 0.8)),
    ...products.docs.flatMap((p) => entry(prodPath(p), p.updatedAt, 0.7)),
    ...posts.docs.flatMap((p) => entry(`/kasulikku/${p.slug}`, p.updatedAt, 0.5)),
  ]
}
