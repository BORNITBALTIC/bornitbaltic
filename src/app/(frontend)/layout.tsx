import React from 'react'
import Script from 'next/script'
import type { Metadata } from 'next'

import { footerHtml, headerHtml, iconDefs } from '@/lib/template'
import './styles.css'
import './catalog.css'

export const metadata: Metadata = {
  title: 'Bornit Baltic — BORNIT® esindaja Baltikumis ja Soomes',
  description:
    'Bituumenmaterjalide projektimüük ja paigaldus. Hüdroisolatsioon, vuugitihendus, teedeehitusmaterjalid ja märgistus.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="et">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,400..900&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div dangerouslySetInnerHTML={{ __html: iconDefs }} />
        <div dangerouslySetInnerHTML={{ __html: headerHtml }} />
        {children}
        <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
        <Script src="/site.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
