/**
 * Tootmise kaivitus.
 *
 * Tavaolukorras kaivitab lihtsalt Next.js serveri. Kui `RUN_IMPORT=true`,
 * jookseb taustal ka sisu import.
 *
 * Miks nii: Railway eeldeploy (preDeployCommand) kaib konteineris, kus
 * ketast veel kylge pandud ei ole, seega sinna kirjutatud failid kaovad.
 * Paris konteineris on ketas olemas. Server kaivitatakse enne importi,
 * et tervisekontroll ei aeguks.
 */
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const mediaDir = process.env.MEDIA_DIR || path.resolve(process.cwd(), 'media')

const countFiles = () => {
  try {
    return fs.readdirSync(mediaDir).length
  } catch {
    return 0
  }
}

const next = spawn('npx', ['next', 'start'], { stdio: 'inherit', shell: true })
next.on('exit', (code) => process.exit(code ?? 0))

if (process.env.RUN_IMPORT === 'true') {
  const existing = countFiles()
  if (existing > 200) {
    console.log(`[start] meediakaustas on juba ${existing} faili, import jaab vahele`)
  } else {
    console.log(`[start] meediakaustas on ${existing} faili, kaivitan impordi taustal`)
    const imp = spawn('npx', ['tsx', 'scripts/import-bornit.ts'], {
      stdio: 'inherit',
      shell: true,
      env: process.env,
    })
    imp.on('exit', (code) => {
      console.log(`[start] import lopetas koodiga ${code}, faile kettal: ${countFiles()}`)
    })
  }
}
