/**
 * Loob esimese admin kasutaja.
 * Kasutus: ADMIN_EMAIL=... ADMIN_PASSWORD=... npm run seed:admin
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.js'

const run = async () => {
  const payload = await getPayload({ config })
  const email = process.env.ADMIN_EMAIL || 'marek@bornitbaltic.ee'
  const password = process.env.ADMIN_PASSWORD

  if (!password) {
    console.error('ADMIN_PASSWORD on puudu.')
    process.exit(1)
  }

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })

  if (existing.docs[0]) {
    console.log('Kasutaja ' + email + ' on juba olemas.')
    process.exit(0)
  }

  await payload.create({ collection: 'users', data: { email, password } })
  console.log('Admin loodud: ' + email)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
