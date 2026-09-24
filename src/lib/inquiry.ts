import { getPayload } from 'payload'
import config from '@/payload.config'

export type InquiryInput = {
  name: string
  email: string
  message: string
  company?: string
  phone?: string
  quantity?: string
  productId?: string | number | null
  productTitle?: string
  sourceUrl?: string
  honeypot?: string
}

export type InquiryResult = { ok: boolean; message: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const clean = (v: unknown): string => String(v ?? '').trim()

/**
 * Uks koht, kuhu koik lehe vormid (tooteleht ja avalehe hinnaparing) jouavad.
 * Kirje laheb Payloadi kollektsiooni Paringud, sealt saadab afterChange hook
 * meili aadressile INQUIRY_TO.
 */
export const createInquiry = async (input: InquiryInput): Promise<InquiryResult> => {
  // nahtamatu vali peab jaama tuhjaks: robot taidab selle ara
  if (clean(input.honeypot)) {
    return { ok: true, message: 'Aitah, paring on saadetud.' }
  }

  const name = clean(input.name)
  const email = clean(input.email)
  const message = clean(input.message)

  if (name.length < 2) return { ok: false, message: 'Palun sisesta oma nimi.' }
  if (!EMAIL_RE.test(email)) return { ok: false, message: 'Palun kontrolli e-posti aadressi.' }
  if (message.length < 5) return { ok: false, message: 'Palun kirjuta, mida vajad.' }

  const rawId = clean(input.productId)
  const productId = rawId && !Number.isNaN(Number(rawId)) ? Number(rawId) : null

  const payload = await getPayload({ config: await config })

  try {
    await payload.create({
      collection: 'inquiries',
      overrideAccess: true,
      data: {
        product: productId,
        productTitle: clean(input.productTitle),
        name,
        company: clean(input.company),
        email,
        phone: clean(input.phone),
        quantity: clean(input.quantity),
        message,
        sourceUrl: clean(input.sourceUrl),
      },
    })
  } catch (err) {
    payload.logger.error({ err, msg: 'Paringu salvestamine ebaonnestus' })
    return { ok: false, message: 'Midagi laks katki. Palun helista voi kirjuta meilile.' }
  }

  return { ok: true, message: 'Aitah, paring on saadetud. Votame uhendust esimesel voimalusel.' }
}
