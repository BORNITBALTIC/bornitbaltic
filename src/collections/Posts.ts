import type { CollectionConfig } from 'payload'

/**
 * Artiklid (vana lehe "Kasulikku" blogi). URL jaab vanaga samaks:
 *   /kasulikku/<slug>
 * Vanad soome ja vene artiklid suunatakse proxy's eestikeelse slugi peale,
 * tekst ise on keelte kaupa.
 */
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Artikkel', plural: 'Artiklid (Kasulikku)' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'updatedAt'],
    group: 'Leht',
    description: 'Lehe "Kasulikku" artiklid. Tekstid on keelte kaupa (keelevalik üleval paremal).',
  },
  access: { read: () => true },
  defaultSort: '-publishedAt',
  fields: [
    { name: 'title', type: 'text', label: 'Pealkiri', required: true, localized: true },
    {
      name: 'slug',
      type: 'text',
      label: 'URLi slug',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'Ära muuda ilma põhjuseta: vana URL on Google\'is indekseeritud.' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Avaldatud',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' } },
    },
    { name: 'cover', type: 'upload', relationTo: 'media', label: 'Kaanepilt' },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Lühikokkuvõte',
      localized: true,
      admin: { description: 'Kuvatakse artiklite nimekirjas ja Google\'i otsingutulemuses.' },
    },
    { name: 'content', type: 'richText', label: 'Sisu', localized: true },
    {
      name: 'legacyUrl',
      type: 'text',
      label: 'Vana lehe URL',
      admin: { readOnly: true, position: 'sidebar', hidden: true },
    },
  ],
}
