import path from 'path'
import type { CollectionConfig } from 'payload'

/**
 * Uks kogum nii piltide kui PDFide jaoks (tehniline info, ohutuskaart).
 * Pildid saavad suurused, PDFid lahevad labi puutumatult.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Fail', plural: 'Failid' },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'mimeType', 'updatedAt'],
    group: 'Sisu',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt tekst',
      localized: true,
      admin: {
        description: 'Piltidel kohustuslik ligipaasetavuse ja SEO jaoks. PDFidel voib tuhjaks jatta.',
      },
    },
    {
      name: 'legacyUrl',
      type: 'text',
      label: 'Vana lehe URL',
      admin: { readOnly: true, position: 'sidebar', description: 'Taidetakse migratsioonil.' },
      index: true,
    },
  ],
  upload: {
    /**
     * Railway peal tuleb siia kylge haakida volume (nt /app/media),
     * muidu kaovad failid iga uue deploy'ga.
     */
    staticDir: process.env.MEDIA_DIR || path.resolve(process.cwd(), 'media'),
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 400, position: 'centre' },
      { name: 'card', width: 768, height: 576, position: 'centre' },
      { name: 'wide', width: 1600, height: undefined },
    ],
    focalPoint: true,
  },
}
