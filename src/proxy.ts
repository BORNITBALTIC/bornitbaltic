import { NextResponse, type NextRequest } from 'next/server'

import legacy from './lib/legacy-redirects.json'
import { splitLocale } from './lib/locale-path'

/**
 * Iga paringu esimene peatus (Next 16 proxy, varem middleware).
 *
 * 1. Vana WordPressi lehe aadressid (soome, vene, vanad lehed) suunatakse 301-ga
 *    uutele, et Google'i nahtavus ja vanad lingid ei kaoks.
 * 2. Keele eesliide /en, /fi, /lv eemaldatakse ja keel antakse lehele paisena
 *    `x-bornit-locale`. Eesti keel on ilma eesliiteta.
 * 3. Avalehele tulijal, kes on varem valinud muu keele, viiakse tema keelde.
 */
const LEGACY = legacy as Record<string, string>

const normalise = (p: string): string => {
  let x = p
  try {
    x = decodeURIComponent(p)
  } catch {
    /* jaab nagu on */
  }
  x = x.toLowerCase()
  if (x.length > 1) x = x.replace(/\/+$/, '')
  return x
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // vanad WordPressi failid (PDF-id, pildid): sama failinimi on Payloadi meedias
  if (pathname.startsWith('/wp-content/uploads/')) {
    const name = pathname.split('/').pop() || ''
    return NextResponse.redirect(new URL(`/api/media/file/${name}`, req.url), 301)
  }

  const target = LEGACY[normalise(pathname)]
  if (target) return NextResponse.redirect(new URL(target, req.url), 301)

  // vene keelt uuel lehel ei ole
  if (/^\/ru(\/|$)/i.test(pathname)) return NextResponse.redirect(new URL('/', req.url), 301)

  // lopukaldkriips maha (vanad WordPressi aadressid lopevad kaldkriipsuga)
  if (pathname.length > 1 && pathname.endsWith('/')) {
    // tavaline URL: NextURL jataks lopukaldkriipsu alles ja tekiks tsykkel
    const url = new URL(pathname.replace(/\/+$/, '') + req.nextUrl.search, req.url)
    return NextResponse.redirect(url, 308)
  }

  if (pathname === '/') {
    const saved = req.cookies.get('bornit_lang')?.value
    if (saved === 'en' || saved === 'fi' || saved === 'lv') {
      return NextResponse.redirect(new URL(`/${saved}`, req.url), 302)
    }
  }

  const { locale, path } = splitLocale(pathname)
  const headers = new Headers(req.headers)
  headers.set('x-bornit-locale', locale)
  headers.set('x-bornit-path', path)

  if (locale !== 'et') {
    const url = req.nextUrl.clone()
    url.pathname = path
    return NextResponse.rewrite(url, { request: { headers } })
  }
  return NextResponse.next({ request: { headers } })
}

export const config = {
  matcher: [
    '/((?!api/|admin|_next/|img/|favicon|logo|site\\.js|robots\\.txt|sitemap\\.xml|.*\\.(?:png|jpe?g|webp|avif|gif|svg|ico|css|js|map|woff2?|txt)$).*)',
    '/wp-content/:path*',
  ],
}
