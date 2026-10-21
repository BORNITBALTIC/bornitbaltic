import fs from 'fs'
import path from 'path'

import siteDict from './site-dict.json'
import { localizePath, SITE_LOCALES } from './locale-path'

/**
 * Templatei osad tulevad failidest, mis on valja loigatud kliendi
 * kinnitatud kujundusest (bornitbaltic.netlify.app). Nii jaab pais,
 * jalus ja avaleht pikslipealt samaks ja Payload lisab peale ainult
 * kataloogilehed.
 */
const TEMPLATE_DIR = path.join(process.cwd(), 'src', 'template')

const read = (name: string): string => {
  try {
    return fs.readFileSync(path.join(TEMPLATE_DIR, name), 'utf-8')
  } catch {
    return ''
  }
}

export const iconDefs = read('icons.html')
export const headerHtml = read('header.html')
export const footerHtml = read('footer.html')
export const homeHtml = read('home.html')

type Dict = Record<string, string>
const T = (siteDict as { T: Record<string, Dict> }).T

const escText = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escAttr = (s: string) => escText(s).replace(/"/g, '&quot;')

/** Sisemised lehed, mille lingid saavad keele eesliite. */
const INTERNAL_HREF = /href="(\/(?:#[^"]*)?|\/(?:tooted|tootekategooria|kasulikku|tehtud-tood)(?:[/?#][^"]*)?)"/g

/**
 * Teeb templatei HTML-i antud keelde serveris, enne kui see brauserisse laheb:
 *  - data-i18n elementide tekst (sama sonastik, mida kasutas site.js)
 *  - data-i18n-ph valjade placeholder
 *  - sisemised lingid saavad eesliite /en, /fi, /lv
 * Google naeb seega igas keeles valmis teksti, mitte JavaScripti abil vahetatut.
 */
export const localizeHtml = (html: string, locale: string): string => {
  if (locale === 'et' || !T[locale]) return html
  const dict = T[locale]
  const en = T.en || {}
  let out = html.replace(
    /(<[a-z0-9]+\b[^>]*\sdata-i18n="([^"]+)"[^>]*>)([^<]*)(?=<\/)/gi,
    (m, open: string, key: string) => {
      const v = dict[key] ?? en[key]
      return v != null ? open + escText(v) : m
    },
  )
  out = out.replace(/<[a-z]+\b[^>]*\sdata-i18n-ph="([^"]+)"[^>]*>/gi, (tag: string, key: string) => {
    const v = dict[key] ?? en[key]
    return v ? tag.replace(/placeholder="[^"]*"/, `placeholder="${escAttr(v)}"`) : tag
  })
  out = out.replace(INTERNAL_HREF, (_m, href: string) => `href="${localizePath(href, locale)}"`)
  return out
}

const LANG_NAMES: Record<string, string> = { et: 'Eesti', en: 'English', fi: 'Suomi', lv: 'Latviešu' }

/**
 * Pais antud keeles. Keelevalik on parislingid sama lehe teistele keeleversioonidele,
 * et nii kasutaja kui Google leiaksid need ilma JavaScriptita.
 */
export const headerFor = (locale: string, currentPath: string): string => {
  let html = localizeHtml(headerHtml, locale)
  html = html.replace(/<span id="langNow">[^<]*<\/span>/, `<span id="langNow">${locale.toUpperCase()}</span>`)
  const items = SITE_LOCALES.map(
    (l) =>
      `<li><a data-lang="${l}" hreflang="${l}" lang="${l}" href="${localizePath(currentPath, l)}"${
        l === locale ? ' aria-current="true"' : ''
      }>${LANG_NAMES[l]}</a></li>`,
  ).join('\n          ')
  html = html.replace(/<ul>\s*<li><button data-lang[\s\S]*?<\/ul>/, `<ul>\n          ${items}\n        </ul>`)
  return html
}

export const footerFor = (locale: string): string => localizeHtml(footerHtml, locale)
