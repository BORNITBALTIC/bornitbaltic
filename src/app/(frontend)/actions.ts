'use server'

import { createInquiry, type InquiryResult } from '@/lib/inquiry'

export type InquiryState = InquiryResult

/**
 * Tootelehe paringuvorm. Sisu valideerimine ja salvestamine on lib/inquiry.ts
 * sees, et avalehe vorm ja tootelehe vorm kaiksid sama teed.
 */
export async function submitInquiry(
  _prev: InquiryState | null,
  formData: FormData,
): Promise<InquiryState> {
  const value = (key: string) => String(formData.get(key) ?? '')

  return createInquiry({
    honeypot: value('website'),
    productId: value('productId'),
    productTitle: value('productTitle'),
    name: value('name'),
    company: value('company'),
    email: value('email'),
    phone: value('phone'),
    quantity: value('quantity'),
    message: value('message'),
    sourceUrl: value('sourceUrl'),
  })
}
