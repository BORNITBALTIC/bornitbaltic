import fs from 'fs'
import path from 'path'

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
