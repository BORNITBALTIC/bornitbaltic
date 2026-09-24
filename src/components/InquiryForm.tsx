'use client'

import React, { useActionState } from 'react'

import { submitInquiry, type InquiryState } from '@/app/(frontend)/actions'

export default function InquiryForm({
  productId,
  productTitle,
  sourceUrl,
}: {
  productId: string | number
  productTitle: string
  sourceUrl: string
}) {
  const [state, action, pending] = useActionState<InquiryState | null, FormData>(
    submitInquiry,
    null,
  )

  if (state?.ok) {
    return (
      <div className="prod-ask prod-ask--done" id="paring">
        <p className="eyebrow">Saadetud</p>
        <h2>Aitah</h2>
        <p className="lede">{state.message}</p>
      </div>
    )
  }

  return (
    <div className="prod-ask" id="paring">
      <p className="eyebrow">Hinnap&auml;ring</p>
      <h2>K&uuml;si selle toote kohta</h2>
      <p className="lede">
        Saada kogus ja objekt, vastame hinna, saadavuse ja paigaldusn&otilde;uannetega.
      </p>

      <form action={action} className="prod-ask__form" noValidate>
        <input type="hidden" name="productId" value={String(productId)} />
        <input type="hidden" name="productTitle" value={productTitle} />
        <input type="hidden" name="sourceUrl" value={sourceUrl} />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="prod-ask__trap"
        />

        <div className="prod-ask__row">
          <label>
            <span>Nimi *</span>
            <input type="text" name="name" required autoComplete="name" />
          </label>
          <label>
            <span>Ettev&otilde;te</span>
            <input type="text" name="company" autoComplete="organization" />
          </label>
        </div>

        <div className="prod-ask__row">
          <label>
            <span>E-post *</span>
            <input type="email" name="email" required autoComplete="email" />
          </label>
          <label>
            <span>Telefon</span>
            <input type="tel" name="phone" autoComplete="tel" />
          </label>
        </div>

        <label>
          <span>Kogus</span>
          <input type="text" name="quantity" placeholder="n&auml;iteks 200 l v&otilde;i 40 m2" />
        </label>

        <label>
          <span>Objekt ja k&uuml;simus *</span>
          <textarea name="message" rows={4} required />
        </label>

        {state && !state.ok && (
          <p className="prod-ask__error" role="alert">
            {state.message}
          </p>
        )}

        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? 'Saadan…' : 'Saada päring'}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <use href="#i-arrow" />
          </svg>
        </button>
        <p className="prod-ask__fine">
          V&otilde;i helista <a href="tel:+3725265087">+372 526 5087</a> /{' '}
          <a href="mailto:info@bornitbaltic.ee">info@bornitbaltic.ee</a>
        </p>
      </form>
    </div>
  )
}
