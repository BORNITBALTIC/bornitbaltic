/**
 * Kiire ulevaade: mis andmebaasis on. Kasutus: npm run stats
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.js'

const run = async () => {
  const payload = await getPayload({ config })

  const [products, categories, media, inquiries, users] = await Promise.all([
    payload.count({ collection: 'products' }),
    payload.count({ collection: 'categories' }),
    payload.count({ collection: 'media' }),
    payload.count({ collection: 'inquiries' }),
    payload.count({ collection: 'users' }),
  ])

  console.log('tooted     :', products.totalDocs)
  console.log('kategooriad:', categories.totalDocs)
  console.log('failid     :', media.totalDocs)
  console.log('paringud   :', inquiries.totalDocs)
  console.log('kasutajad  :', users.totalDocs)

  const withTech = await payload.count({
    collection: 'products',
    where: { 'documents.kind': { equals: 'tehniline_info' } },
  })
  const withSheet = await payload.count({
    collection: 'products',
    where: { 'documents.kind': { equals: 'ohutuskaart' } },
  })
  console.log('\ntehnilise infoga tooteid:', withTech.totalDocs)
  console.log('ohutuskaardiga tooteid  :', withSheet.totalDocs)

  // massiivivalja tuhjust ei saa drizzle kaudu kysida, seega loeme kohapeal
  const all = await payload.find({
    collection: 'products',
    limit: 1000,
    pagination: false,
    depth: 0,
  })
  const noDocs = all.docs.filter((p) => !p.documents || p.documents.length === 0)
  const noImages = all.docs.filter((p) => !p.images || (p.images as unknown[]).length === 0)
  console.log('ilma dokumendita tooteid:', noDocs.length)
  console.log('ilma pildita tooteid    :', noImages.length)
  if (noDocs.length) console.log('  ', noDocs.map((p) => p.slug).join(', '))

  const latest = await payload.find({
    collection: 'inquiries',
    limit: 5,
    sort: '-createdAt',
    depth: 0,
  })
  if (latest.docs.length) {
    console.log('\nviimased paringud:')
    for (const d of latest.docs) {
      console.log(`  ${d.createdAt} | ${d.productTitle} | ${d.name} | ${d.email}`)
    }
  }

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
