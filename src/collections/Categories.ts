import type { CollectionConfig } from 'payload'

/**
 * Tootekategooriad. Puu on kaheastmeline: peakategooria + alamkategooria.
 * Slugid tulevad vanalt lehelt muutmata, sest /tootekategooria/<slug>/ URLid
 * on Google'is indekseeritud.
 */
export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Tootekategooria', plural: 'Tootekategooriad' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'parent', 'order', 'updatedAt'],
    group: 'Kataloog',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nimi',
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
        description: 'Ara muuda ilma pohjuseta: vanad URLid on Google\'is indekseeritud.',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Ulemkategooria',
      admin: { position: 'sidebar', description: 'Tuhi tahendab peakategooriat.' },
      index: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Jarjekord',
      defaultValue: 100,
      admin: { position: 'sidebar', description: 'Vaiksem number on eespool.' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Kirjeldus',
      localized: true,
      admin: { description: 'Kuvatakse kategooria lehe pealkirja all.' },
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Ikoon',
      options: [
        { label: 'Tee', value: 'i-road' },
        { label: 'Vuuk', value: 'i-joint' },
        { label: 'Katus', value: 'i-roof' },
        { label: 'Vundament / hydroisolatsioon', value: 'i-hydro' },
        { label: 'SILIKAL', value: 'i-silikal' },
        { label: 'Eritooted', value: 'i-special' },
        { label: 'Markeerimine', value: 'i-marking' },
        { label: 'Pihustamine', value: 'i-spray' },
        { label: 'Tooriistad', value: 'i-tool' },
        { label: 'GRUN', value: 'i-grun' },
        { label: 'Dokument', value: 'i-doc' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Kategooria pilt',
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
