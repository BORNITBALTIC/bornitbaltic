import { NextResponse } from 'next/server'

import { createInquiry } from '@/lib/inquiry'

/**
 * Avalehe hinnaparingu vorm postitab siia (site.js).
 * Tootelehe vorm kasutab serveritegevust, aga loogika on sama.
 *
 * Tee ei ole /api all, sest see kuulub Payloadile.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown> = {}
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ ok: false, message: 'Vigane paring.' }, { status: 400 })
  }

  const result = await createInquiry({
    honeypot: String(body.website ?? ''),
    name: String(body.name ?? ''),
    company: String(body.company ?? ''),
    email: String(body.email ?? ''),
    phone: String(body.phone ?? ''),
    quantity: String(body.quantity ?? ''),
    message: String(body.message ?? ''),
    productTitle: String(body.productTitle ?? 'Avalehe hinnaparing'),
    sourceUrl: String(body.sourceUrl ?? '/'),
  })

  return NextResponse.json(result, { status: result.ok ? 200 : 400 })
}
