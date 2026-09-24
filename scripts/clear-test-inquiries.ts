/** Eemaldab kontrollimisel tekkinud testparingud. Kasutus: npx tsx scripts/clear-test-inquiries.ts */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.js'

const run = async () => {
  const payload = await getPayload({ config })
  const res = await payload.delete({
    collection: 'inquiries',
    where: { email: { in: ['kontroll@example.com', 'avaleht@example.com', 'lopp@example.com'] } },
  })
  console.log('kustutatud:', res.docs.length)
  process.exit(0)
}
run().catch((e) => { console.error(e); process.exit(1) })
