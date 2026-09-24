import React from 'react'
import Link from 'next/link'

import { categoryHref, subCategoryHref, type CategoryNode } from '@/lib/catalog'

/**
 * Vasakpoolne TOOTEKATEGOORIAD riba, nagu vanal lehel.
 * Aktiivne kategooria (voi selle vanem) on avatud ja esile tostetud.
 */
export default function CategorySidebar({
  tree,
  activeSlug,
}: {
  tree: CategoryNode[]
  activeSlug?: string
}) {
  const isActiveBranch = (node: CategoryNode) =>
    node.slug === activeSlug || node.children.some((c) => c.slug === activeSlug)

  return (
    <aside className="cat-rail" aria-label="Tootekategooriad">
      <h2 className="cat-rail__title">Tootekategooriad</h2>
      <nav>
        <ul className="cat-rail__list">
          {tree.map((node) => {
            const open = isActiveBranch(node)
            return (
              <li key={node.id} className={open ? 'is-open' : undefined}>
                <Link
                  href={categoryHref(node)}
                  className={node.slug === activeSlug ? 'is-current' : undefined}
                >
                  {node.name}
                </Link>
                {node.children.length > 0 && (
                  <ul className="cat-rail__sub">
                    {node.children.map((child) => (
                      <li key={child.id}>
                        <Link
                          href={subCategoryHref(node.slug, child.slug)}
                          className={child.slug === activeSlug ? 'is-current' : undefined}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
