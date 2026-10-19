/**
 * Kirjutab tolked templatei JavaScripti sisse.
 *
 * Template tuli viie keele tugiga, aga soome, lati ja leedu keeles olid
 * ainult navigatsiooni votmed. See skript liidab puuduvad tolked
 * .tmp/bornit/tolked.json failist T sonastikku ning CATEGORIES ja SPOTS
 * massiividesse.
 *
 * Kasutus: node scripts/apply-translations.cjs
 */
const fs = require('fs')
const path = require('path')

const SITE = path.join(__dirname, '..', 'public', 'site.js')
const HOME = path.join(__dirname, '..', 'src', 'template', 'home.html')
const DATA = path.join(__dirname, '..', '..', '.tmp', 'bornit', 'tolked.json')

const LANGS = ['fi', 'lv', 'lt']

/** Leiab `const <nimi> = <avaja> ... <sulgeja>` plokis sulgude kaupa taispika teksti. */
function span(src, name, open, close) {
  const start = src.indexOf('const ' + name + ' = ' + open)
  if (start < 0) throw new Error('ei leidnud: ' + name)
  const from = src.indexOf(open, start)
  let depth = 0
  for (let i = from; i < src.length; i++) {
    if (src[i] === open) depth++
    else if (src[i] === close) {
      depth--
      if (depth === 0) return { from, to: i + 1, text: src.slice(from, i + 1) }
    }
  }
  throw new Error('sulgemata plokk: ' + name)
}

function evalLiteral(text) {
  // eslint-disable-next-line no-new-func
  return new Function('return ' + text)()
}

const tr = JSON.parse(fs.readFileSync(DATA, 'utf8'))
let src = fs.readFileSync(SITE, 'utf8')

/* ---------- 1. T sonastik ---------- */
const tSpan = span(src, 'T', '{', '}')
const T = evalLiteral(tSpan.text)

let added = 0
for (const [key, vals] of Object.entries(tr.ui)) {
  for (const lang of Object.keys(vals)) {
    if (lang === 'et') continue // eesti tekst elab HTMLis
    if (!T[lang]) T[lang] = {}
    T[lang][key] = vals[lang]
    added++
  }
}
src = src.slice(0, tSpan.from) + JSON.stringify(T, null, 2) + src.slice(tSpan.to)

/* ---------- 2. CATEGORIES kirjeldused ---------- */
const cSpan = span(src, 'CATEGORIES', '[', ']')
const CATEGORIES = evalLiteral(cSpan.text)
if (CATEGORIES.length !== tr.catDs.length) {
  throw new Error(`kategooriaid ${CATEGORIES.length}, tolkeid ${tr.catDs.length}`)
}
CATEGORIES.forEach((c, i) => {
  for (const lang of LANGS) c.ds[lang] = tr.catDs[i][lang]
})
src = src.slice(0, cSpan.from) + JSON.stringify(CATEGORIES, null, 2) + src.slice(cSpan.to)

/* ---------- 3. SPOTS sumptomid, lahendused, loetelud ---------- */
const sSpan = span(src, 'SPOTS', '[', ']')
const SPOTS = evalLiteral(sSpan.text)
if (SPOTS.length !== tr.spots.length) {
  throw new Error(`kohti ${SPOTS.length}, tolkeid ${tr.spots.length}`)
}
SPOTS.forEach((s, i) => {
  for (const lang of LANGS) {
    s.sym[lang] = tr.spots[i].sym[lang]
    s.sol[lang] = tr.spots[i].sol[lang]
    s.items[lang] = tr.spots[i].items[lang]
  }
})
src = src.slice(0, sSpan.from) + JSON.stringify(SPOTS, null, 2) + src.slice(sSpan.to)

fs.writeFileSync(SITE, src, 'utf8')

/* ---------- 4. eesti ja inglise tekst, mida muudeti ---------- */
let home = fs.readFileSync(HOME, 'utf8')
for (const [key, vals] of Object.entries(tr.ui)) {
  if (!vals.et) continue
  const re = new RegExp(`(data-i18n="${key}"[^>]*>)([^<]*)(<)`)
  if (re.test(home)) {
    home = home.replace(re, `$1${vals.et}$3`)
    console.log(`  home.html: ${key} eesti tekst uuendatud`)
  }
}
fs.writeFileSync(HOME, home, 'utf8')

/* ---------- kokkuvote ---------- */
const check = evalLiteral(span(fs.readFileSync(SITE, 'utf8'), 'T', '{', '}').text)
const keys = new Set()
Object.values(check).forEach((o) => Object.keys(o).forEach((k) => keys.add(k)))
console.log(`\nlisatud ${added} tolget`)
for (const lang of Object.keys(check)) {
  const missing = [...keys].filter((k) => check[lang][k] === undefined)
  console.log(`  ${lang}: ${Object.keys(check[lang]).length} votit, puudu ${missing.length}`)
  if (missing.length) console.log('     ', missing.join(', '))
}
