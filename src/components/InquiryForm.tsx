'use client'

import React, { useActionState } from 'react'

import { submitInquiry, type InquiryState } from '@/app/(frontend)/actions'
import type { FormStrings, Locale } from '@/lib/i18n'

export default function InquiryForm({
  productId,
  productTitle,
  sourceUrl,
  locale,
  strings,
}: {
  productId: string | number
  productTitle: string
  sourceUrl: string
  locale: Locale
  strings: FormStrings
}) {
  const [state, action, pending] = useActionState<InquiryState | null, FormData>(
    submitInquiry,
    null,
  )

  /* toote nimi laheb paringuga automaatselt kaasa ja on ka kasutajale nahtav */
  const subject = (
    <p className="prod-ask__subject">
      <span>{strings.product}</span>
      <strong>{productTitle}</strong>
    </p>
  )

  if (state?.ok) {
    return (
      <div className="prod-ask prod-ask--done" id="paring">
        <p className="eyebrow">{strings.sent}</p>
        <h2>{strings.thanks}</h2>
        <p className="lede">{state.message}</p>
        {subject}
      </div>
    )
  }

  return (
    <div className="prod-ask" id="paring">
      <p className="eyebrow">{strings.eyebrow}</p>
      <h2>{strings.heading}</h2>
      <p className="lede">{strings.lede}</p>

      {subject}

      <form action={action} className="prod-ask__form" noValidate>
        <input type="hidden" name="productId" value={String(productId)} />
        <input type="hidden" name="productTitle" value={productTitle} />
        <input type="hidden" name="sourceUrl" value={sourceUrl} />
        <input type="hidden" name="locale" value={locale} />
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
            <span>{strings.name} *</span>
            <input type="text" name="name" required autoComplete="name" />
          </label>
          <label>
            <span>{strings.company}</span>
            <input type="text" name="company" autoComplete="organization" />
          </label>
        </div>

        <div className="prod-ask__row">
          <label>
            <span>{strings.email} *</span>
            <input type="email" name="email" required autoComplete="email" />
          </label>
          <label>
            <span>{strings.phone}</span>
            <input type="tel" name="phone" autoComplete="tel" />
          </label>
        </div>

        <label>
          <span>{strings.quantity}</span>
          <input type="text" name="quantity" placeholder={strings.quantityHint} />
        </label>

        <label>
          <span>{strings.message} *</span>
          <textarea name="message" rows={4} required />
        </label>

        {state && !state.ok && (
          <p className="prod-ask__error" role="alert">
            {state.message}
          </p>
        )}

        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? strings.sending : strings.send}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <use href="#i-arrow" />
          </svg>
        </button>
        <p className="prod-ask__fine">
          {strings.orCall} <a href="tel:+3725265087">+372 526 5087</a> /{' '}
          <a href="mailto:info@bornitbaltic.ee">info@bornitbaltic.ee</a>
        </p>
      </form>
    </div>
  )
}
