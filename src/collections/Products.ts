import type { CollectionConfig } from 'payload'

/**
 * Tooted. Tootelehe struktuur kliendi soovil:
 *   pealkiri, kirjeldus, tehniline info, ohutuskaart, paringuvorm.
 *
 * URL jaab vana lehe kujul: /tooted/<kategooria>/<alamkategooria>/<slug>/
 */
export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Toode', plural: 'Tooted' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'brand', 'updatedAt'],
    group: 'Kataloog',
    description: 'Tootelehe sisu. Dokumendid (tehniline info, ohutuskaart) lisa Dokumentide vahekaardil.',
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Pealkiri',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URLi slug',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Ara muuda ilma pohjuseta: vana URL on Google\'is indekseeritud.',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Kategooria',
      required: true,
      index: true,
      admin: { position: 'sidebar', description: 'Vali koige tapsem (alam)kategooria.' },
    },
    {
      name: 'brand',
      type: 'select',
      label: 'Kaubamark',
      defaultValue: 'bornit',
      options: [
        { label: 'BORNIT', value: 'bornit' },
        { label: 'GRUN', value: 'grun' },
        { label: 'SILIKAL', value: 'silikal' },
        { label: 'Muu', value: 'muu' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Sisu',
          fields: [
            {
              name: 'images',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              label: 'Pildid',
              admin: { description: 'Esimene pilt on tootelehe pohipilt.' },
            },
            {
              name: 'lead',
              type: 'richText',
              label: 'Lyhikirjeldus',
              localized: true,
              admin: { description: 'Kuvatakse pealkirja all ja tootenimekirjas.' },
            },
            {
              name: 'description',
              type: 'richText',
              label: 'Kirjeldus',
              localized: true,
            },
          ],
        },
        {
          label: 'Tehnilised andmed',
          fields: [
            {
              name: 'measures',
              type: 'array',
              label: 'Moodud ja omadused',
              localized: true,
              labels: { singular: 'Rida', plural: 'Read' },
              admin: {
                description: 'Nait: Pakendi suurus / 5 l, 10 l, 25 l. Kuvatakse tabelina.',
                initCollapsed: true,
              },
              fields: [
                { name: 'nimi', type: 'text', label: 'Nimi', required: true },
                { name: 'vaartus', type: 'text', label: 'Vaartus', required: true },
              ],
            },
          ],
        },
        {
          label: 'Dokumendid',
          fields: [
            {
              name: 'documents',
              type: 'array',
              label: 'Dokumendid',
              labels: { singular: 'Dokument', plural: 'Dokumendid' },
              admin: {
                description: 'Tehniline info ja ohutuskaart kuvatakse tootelehel eraldi nuppudena.',
              },
              fields: [
                {
                  name: 'kind',
                  type: 'select',
                  label: 'Tuup',
                  required: true,
                  defaultValue: 'tehniline_info',
                  options: [
                    { label: 'Tehniline info', value: 'tehniline_info' },
                    { label: 'Ohutuskaart', value: 'ohutuskaart' },
                    { label: 'Infoleht', value: 'infoleht' },
                    { label: 'Toimivusdeklaratsioon', value: 'toimivusdeklaratsioon' },
                    { label: 'Kasutusjuhend', value: 'kasutusjuhend' },
                    { label: 'Muu', value: 'muu' },
                  ],
                },
                {
                  name: 'label',
                  type: 'text',
                  label: 'Nupu tekst',
                  localized: true,
                  admin: { description: 'Tuhjaks jattes kasutatakse tuubi nime.' },
                },
                {
                  name: 'file',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Fail',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'legacyUrl',
      type: 'text',
      label: 'Vana lehe URL',
      admin: { readOnly: true, position: 'sidebar', hidden: true },
    },
    {
      name: 'wcId',
      type: 'number',
      label: 'WooCommerce ID',
      unique: true,
      index: true,
      admin: { readOnly: true, position: 'sidebar', hidden: true },
    },
  ],
}
