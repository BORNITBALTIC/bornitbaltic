import React from 'react'

import { homeHtml } from '@/lib/template'

/**
 * Avaleht on kliendi kinnitatud kujundus muutmata kujul. Tooted, teenused ja
 * kontaktivorm on selle sees. Kataloogilehed (/tooted, /tootekategooria)
 * tulevad Payloadist.
 */
export default async function HomePage() {
  return <div dangerouslySetInnerHTML={{ __html: homeHtml }} />
}
