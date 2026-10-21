import React from 'react'

/** Struktureeritud andmed (schema.org) lehe sisse. */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // < asendus hoiab ara skripti katkemise, kui tekstis on "</script>"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
