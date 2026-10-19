import type { GlobalConfig } from 'payload'

/**
 * Avalehe muudetav sisu: teenused ja tehtud tood (kliendi punkt 6, haldus).
 * Kujundus jaab template'i omaks, siit tulevad ainult tekstid ja pildid.
 * Kui plokk on tuhi, naitab leht template'i algsisu.
 */
export const SiteContent: GlobalConfig = {
  slug: 'site-content',
  label: 'Avalehe sisu',
  admin: {
    group: 'Leht',
    description: 'Teenuste ja tehtud toode plokid avalehel. Tekstid on keelte kaupa (keelevalik ules paremal).',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Teenused',
          fields: [
            {
              name: 'servicesTitle',
              type: 'text',
              label: 'Ploki pealkiri',
              localized: true,
              admin: { description: 'Nait: Müüme materjali ja paigaldame selle ise' },
            },
            {
              name: 'services',
              type: 'array',
              label: 'Teenused',
              labels: { singular: 'Teenus', plural: 'Teenused' },
              maxRows: 8,
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  label: 'Ikoon',
                  defaultValue: 'i-doc',
                  options: [
                    { label: 'Veoauto (tarne, projektimüük)', value: 'i-truck' },
                    { label: 'Käsi (paigaldus)', value: 'i-hand' },
                    { label: 'Hammasratas (seadmed)', value: 'i-gear' },
                    { label: 'Dokument (nõustamine)', value: 'i-doc' },
                    { label: 'Tilk (hüdroisolatsioon)', value: 'i-hydro' },
                    { label: 'Tee', value: 'i-road' },
                    { label: 'Vuuk', value: 'i-joint' },
                    { label: 'Katus', value: 'i-roof' },
                    { label: 'Tööriist', value: 'i-tool' },
                    { label: 'Pihusti', value: 'i-spray' },
                    { label: 'Märgistus', value: 'i-marking' },
                  ],
                },
                { name: 'title', type: 'text', label: 'Pealkiri', required: true, localized: true },
                { name: 'text', type: 'textarea', label: 'Tekst', required: true, localized: true },
              ],
            },
          ],
        },
        {
          label: 'Tehtud tööd',
          fields: [
            {
              name: 'worksTitle',
              type: 'text',
              label: 'Ploki pealkiri',
              localized: true,
              admin: { description: 'Nait: Objektid, kus materjal on juba töös' },
            },
            {
              name: 'works',
              type: 'array',
              label: 'Tööd',
              labels: { singular: 'Töö', plural: 'Tööd' },
              maxRows: 12,
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', label: 'Foto', required: true },
                { name: 'title', type: 'text', label: 'Objekt', required: true, localized: true },
                {
                  name: 'meta',
                  type: 'text',
                  label: 'Mis tehti ja kus',
                  localized: true,
                  admin: { description: 'Nait: Vuugiliim, praosaneerimine ja märgistus — Harjumaa' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
