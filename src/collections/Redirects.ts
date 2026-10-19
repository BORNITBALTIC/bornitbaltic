import type { CollectionConfig } from 'payload'

/**
 * Suunamised vanadelt aadressidelt uutele (kliendi punkt 4: kui tootegrupid
 * ja slugid muutuvad, peavad Google'is indekseeritud vanad URLid edasi tootama).
 *
 * Kataloogilehed kysivad enne 404 andmist siit: kui `from` klapib, tehakse
 * 308 suunamine `to` peale.
 */
export const Redirects: CollectionConfig = {
  slug: 'redirects',
  labels: { singular: 'Suunamine', plural: 'Suunamised' },
  admin: {
    useAsTitle: 'from',
    defaultColumns: ['from', 'to', 'updatedAt'],
    group: 'Kataloog',
    description:
      'Kui toote voi kategooria aadress muutub, lisa siia vana aadress ja uus aadress. '
      + 'Vana link hakkab automaatselt uuele lehele viima.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'from',
      type: 'text',
      label: 'Vana aadress',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Ilma domeenita, naiteks /tooted/vuugid-praod/bornit-fugenflex/' },
      hooks: {
        beforeValidate: [({ value }) => normalisePath(value)],
      },
    },
    {
      name: 'to',
      type: 'text',
      label: 'Uus aadress',
      required: true,
      admin: { description: 'Naiteks /tooted/vuugitihendustooted/vuugiliimid/bornit-fugenflex/' },
      hooks: {
        beforeValidate: [({ value }) => normalisePath(value)],
      },
    },
    {
      name: 'note',
      type: 'text',
      label: 'Markus',
      admin: { description: 'Vabatahtlik: miks suunamine tehti.' },
    },
  ],
}

/** Aadress algab kaldkriipsuga ja lopeb ilma; paringustring ja domeen visatakse ara. */
export const normalisePath = (value: unknown): string => {
  if (typeof value !== 'string') return ''
  let v = value.trim()
  try {
    if (/^https?:\/\//i.test(v)) v = new URL(v).pathname
  } catch {
    /* jaab nagu on */
  }
  v = v.split('?')[0].split('#')[0]
  if (!v.startsWith('/')) v = '/' + v
  if (v.length > 1) v = v.replace(/\/+$/, '')
  return v
}
