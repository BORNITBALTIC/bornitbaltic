import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'

/**
 * Tootelehe paringuvormi sisendid. Iga uus paring laheb meilile
 * (INQUIRY_TO, vaikimisi marek@bornitbaltic.ee) ja jaab ka Payloadi alles,
 * et miski ei kaoks kui meil peaks kinni jaama.
 */
const notify: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc

  const to = process.env.INQUIRY_TO || 'marek@bornitbaltic.ee'
  const from = process.env.SMTP_FROM || 'no-reply@bornitbaltic.ee'

  const rows: [string, string][] = [
    ['Toode', doc.productTitle || '(maaramata)'],
    ['Nimi', doc.name],
    ['Ettevote', doc.company || '-'],
    ['E-post', doc.email],
    ['Telefon', doc.phone || '-'],
    ['Kogus', doc.quantity || '-'],
    ['Leht', doc.sourceUrl || '-'],
  ]

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Sonum:',
    doc.message || '-',
  ].join('\n')

  const html = `
    <h2 style="font-family:Arial,sans-serif">Uus paring: ${escapeHtml(doc.productTitle || 'Bornit Baltic')}</h2>
    <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#57514A">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(String(v))}</strong></td></tr>`,
        )
        .join('')}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(doc.message || '')}</p>
  `

  try {
    await req.payload.sendEmail({
      to,
      from,
      replyTo: doc.email,
      subject: `Paring: ${doc.productTitle || 'Bornit Baltic'}`,
      text,
      html,
    })
  } catch (err) {
    req.payload.logger.error({ err, msg: 'Paringu meili saatmine ebaonnestus' })
  }

  return doc
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: { singular: 'Paring', plural: 'Paringud' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['productTitle', 'name', 'email', 'phone', 'createdAt'],
    group: 'Paringud',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: { afterChange: [notify] },
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      label: 'Toode',
      admin: { position: 'sidebar' },
    },
    { name: 'productTitle', type: 'text', label: 'Toote nimi paringu hetkel' },
    { name: 'name', type: 'text', label: 'Nimi', required: true },
    { name: 'company', type: 'text', label: 'Ettevote' },
    { name: 'email', type: 'email', label: 'E-post', required: true },
    { name: 'phone', type: 'text', label: 'Telefon' },
    { name: 'quantity', type: 'text', label: 'Kogus' },
    { name: 'message', type: 'textarea', label: 'Sonum' },
    {
      name: 'sourceUrl',
      type: 'text',
      label: 'Leht kust saadeti',
      admin: { position: 'sidebar' },
    },
    {
      name: 'handled',
      type: 'checkbox',
      label: 'Vastatud',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
  ],
}
