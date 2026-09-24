import React from 'react'
import Link from 'next/link'

import { mainImage, productHref } from '@/lib/catalog'
import type { Product } from '@/payload-types'

const plain = (value: unknown, limit = 150): string => {
  const walk = (node: any): string => {
    if (!node) return ''
    if (typeof node.text === 'string') return node.text
    if (Array.isArray(node.children)) return node.children.map(walk).join(' ')
    if (node.root) return walk(node.root)
    return ''
  }
  const text = walk(value).replace(/\s+/g, ' ').trim()
  return text.length > limit ? text.slice(0, limit).trimEnd() + '…' : text
}

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return <p className="cat-empty">Selles kategoorias pole veel tooteid.</p>
  }

  return (
    <ul className="prod-grid">
      {products.map((product) => {
        const image = mainImage(product)
        const docs = Array.isArray(product.documents) ? product.documents : []
        const hasSheet = docs.some((d) => d.kind === 'ohutuskaart')
        const hasTech = docs.some((d) => d.kind === 'tehniline_info')

        return (
          <li key={product.id} className="prod-card">
            <Link href={productHref(product)} className="prod-card__link">
              <div className="prod-card__pic">
                {image?.url ? (
                  <img src={image.url} alt={image.alt || product.title} loading="lazy" />
                ) : (
                  <svg className="prod-card__ph" viewBox="0 0 32 32" aria-hidden="true">
                    <use href="#i-doc" />
                  </svg>
                )}
              </div>
              <div className="prod-card__body">
                <h3 className="prod-card__name">{product.title}</h3>
                <p className="prod-card__lede">{plain(product.lead) || plain(product.description)}</p>
                <span className="prod-card__tags">
                  {hasTech && <span className="tag">Tehniline info</span>}
                  {hasSheet && <span className="tag tag--warn">Ohutuskaart</span>}
                </span>
              </div>
              <span className="prod-card__go" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <use href="#i-arrow" />
                </svg>
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
