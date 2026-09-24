import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Categories } from './collections/Categories'
import { Inquiries } from './collections/Inquiries'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/**
 * Andmebaas tuleb keskkonnast. Railway peal on Postgres (DATABASE_URI),
 * kohalikuks kontrolliks piisab SQLitest, kui DATABASE_URI on seadmata.
 */
const databaseUri = process.env.DATABASE_URI || process.env.DATABASE_URL || ''
const usePostgres = databaseUri.startsWith('postgres')

const db = usePostgres
  ? postgresAdapter({
      pool: { connectionString: databaseUri },
      push: process.env.PAYLOAD_DB_PUSH === 'true',
      migrationDir: path.resolve(dirname, 'migrations'),
    })
  : sqliteAdapter({
      client: { url: databaseUri || `file:${path.resolve(dirname, '../.bornit.db')}` },
    })

/**
 * Meil laheb labi SMTP, kui seadistatud. Muidu Payload logib kirjad konsooli,
 * nii et arendus ei kuku labi puuduvate votmete parast.
 */
const email = process.env.SMTP_HOST
  ? nodemailerAdapter({
      defaultFromAddress: process.env.SMTP_FROM || 'no-reply@bornitbaltic.ee',
      defaultFromName: 'Bornit Baltic',
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
    })
  : undefined

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' | Bornit Baltic',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Products, Categories, Media, Inquiries, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db,
  email,
  sharp,
  /**
   * Sisu tuleb praegu ainult eesti keeles, aga skeem on viiele keelele valmis,
   * nii et tolked saab hiljem juurde ilma andmebaasi muutmata.
   */
  localization: {
    locales: [
      { code: 'et', label: 'Eesti' },
      { code: 'en', label: 'English' },
      { code: 'fi', label: 'Suomi' },
      { code: 'lv', label: 'Latviesu' },
      { code: 'lt', label: 'Lietuviu' },
    ],
    defaultLocale: 'et',
    fallback: true,
  },
  plugins: [
    seoPlugin({
      collections: ['products', 'categories'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc?.title || doc?.name || ''} | Bornit Baltic`,
      generateURL: ({ doc }) => `https://bornitbaltic.ee/tooted/${doc?.slug || ''}/`,
    }),
  ],
})
