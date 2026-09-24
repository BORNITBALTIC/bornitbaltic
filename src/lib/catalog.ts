import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Category, Product } from '@/payload-types'

export type CategoryNode = Category & { children: Category[] }

const client = async () => getPayload({ config: await config })

const idOf = (value: unknown): string | number | null => {
  if (value === null || value === undefined) return null
  if (typeof value === 'object') return (value as { id: string | number }).id
  return value as string | number
}

/** Kategooriapuu: peakategooriad koos alamkategooriatega, jarjekorras. */
export const getCategoryTree = async (): Promise<CategoryNode[]> => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'categories',
    limit: 200,
    pagination: false,
    sort: ['order', 'name'],
    depth: 0,
  })

  const tops = docs.filter((c) => !c.parent)
  const subs = docs.filter((c) => Boolean(c.parent))

  return tops.map((top) => ({
    ...top,
    children: subs.filter((s) => idOf(s.parent) === top.id),
  }))
}

export const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
    pagination: false,
    depth: 1,
  })
  return docs[0] ?? null
}

/** Kategooria ja koik selle alamkategooriad, et peakategooria lehel oleks kogu valik. */
export const getCategoryWithDescendants = async (category: Category): Promise<(string | number)[]> => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'categories',
    where: { parent: { equals: category.id } },
    limit: 200,
    pagination: false,
    depth: 0,
  })
  return [category.id, ...docs.map((d) => d.id)]
}

export const getProductsByCategories = async (
  categoryIds: (string | number)[],
): Promise<Product[]> => {
  if (!categoryIds.length) return []
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'products',
    where: { category: { in: categoryIds } },
    limit: 500,
    pagination: false,
    sort: 'title',
    // depth 2, et kategooria vanem oleks olemas ja URL tuleks taispikk
    depth: 2,
  })
  return docs
}

export const getAllProducts = async (): Promise<Product[]> => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'products',
    limit: 1000,
    pagination: false,
    sort: 'title',
    depth: 2,
  })
  return docs
}

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
    pagination: false,
    depth: 2,
  })
  return docs[0] ?? null
}

/**
 * Tootelehe URL peab jaama vana lehe kujul:
 *   /tooted/<peakategooria>/<alamkategooria>/<slug>
 * Kui kategooria on peakategooria, on tee kahesegmendiline.
 */
export const productHref = (product: Product): string => {
  const cat = typeof product.category === 'object' ? product.category : null
  if (!cat) return `/tooted/${product.slug}`
  const parent = cat.parent && typeof cat.parent === 'object' ? cat.parent : null
  const segments = parent ? [parent.slug, cat.slug] : [cat.slug]
  return `/tooted/${segments.join('/')}/${product.slug}`
}

/** Alamkategooria URL, kui vanema slug on juba teada (puu ei lae vanemat valja). */
export const subCategoryHref = (parentSlug: string, childSlug: string): string =>
  `/tootekategooria/${parentSlug}/${childSlug}`

/**
 * Kategooria URL. Eeldab, et `parent` on valja laetud (depth >= 1),
 * muidu jaab tee lyhikeseks ja erineb vana lehe indekseeritud URList.
 */
export const categoryHref = (category: Category): string => {
  const parent = category.parent && typeof category.parent === 'object' ? category.parent : null
  const segments = parent ? [parent.slug, category.slug] : [category.slug]
  return `/tootekategooria/${segments.join('/')}`
}

/** Toote pohipilt, kui see on olemas. */
export const mainImage = (product: Product) => {
  const images = Array.isArray(product.images) ? product.images : []
  const first = images[0]
  return first && typeof first === 'object' ? first : null
}

export const DOC_LABELS: Record<string, string> = {
  tehniline_info: 'Tehniline info',
  ohutuskaart: 'Ohutuskaart',
  infoleht: 'Infoleht',
  toimivusdeklaratsioon: 'Toimivusdeklaratsioon',
  kasutusjuhend: 'Kasutusjuhend',
  muu: 'Dokument',
}
