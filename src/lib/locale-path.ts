/**
 * Keelte URL-id. Eesti keel on ilma eesliiteta (vanad aadressid jaavad samaks),
 * teised keeled saavad eesliite: /en/..., /fi/..., /lv/...
 *
 * Fail ei impordi Next'i serverimooduleid, et seda saaks kasutada nii
 * proxy's, serverikomponentides kui ka sitemapis.
 */
export const SITE_LOCALES = ['et', 'en', 'fi', 'lv'] as const
export type SiteLocale = (typeof SITE_LOCALES)[number]
export const PREFIXED_LOCALES = ['en', 'fi', 'lv'] as const

const PREFIX_RE = /^\/(en|fi|lv)(?=\/|$)/

/** Eraldab URL-ist keele ja keeleta tee. */
export const splitLocale = (pathname: string): { locale: SiteLocale; path: string } => {
  const m = pathname.match(PREFIX_RE)
  if (!m) return { locale: 'et', path: pathname || '/' }
  const rest = pathname.slice(m[0].length)
  return { locale: m[1] as SiteLocale, path: rest || '/' }
}

/**
 * Lisab keeleta teele keele eesliite. Valised lingid, ankrud ja failid jaavad samaks.
 *   localizePath('/tooted/x', 'fi')  -> '/fi/tooted/x'
 *   localizePath('/#kontakt', 'en')  -> '/en#kontakt'
 *   localizePath('/', 'lv')          -> '/lv'
 */
export const localizePath = (path: string, locale: string | undefined | null): string => {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path
  if (!locale || locale === 'et' || !(PREFIXED_LOCALES as readonly string[]).includes(locale)) return path
  if (path === '/') return `/${locale}`
  if (path.startsWith('/#') || path.startsWith('/?')) return `/${locale}${path.slice(1)}`
  return `/${locale}${path}`
}

/** Open Graph keelekood. */
export const OG_LOCALE: Record<SiteLocale, string> = {
  et: 'et_EE',
  en: 'en_GB',
  fi: 'fi_FI',
  lv: 'lv_LV',
}
