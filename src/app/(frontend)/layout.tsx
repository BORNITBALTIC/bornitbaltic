import React from 'react'
import Script from 'next/script'
import type { Metadata } from 'next'

import { getLocale, getPath } from '@/lib/i18n'
import { extra } from '@/lib/i18n-extra'
import { SITE_URL } from '@/lib/seo'
import { footerFor, headerFor, iconDefs } from '@/lib/template'
import './styles.css'
import './catalog.css'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const x = extra(locale)
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: x.siteTitle, template: '%s | Bornit Baltic' },
    description: x.siteDescription,
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const path = await getPath()
  const lang = locale === 'lt' ? 'et' : locale

  return (
    <html lang={lang}>
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
        {/* display: contents, muidu on sticky paise konteiner paise enda korgune ja ei kleepu */}
        <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: headerFor(lang, path) }} />
        {children}
        <div dangerouslySetInnerHTML={{ __html: footerFor(lang) }} />
        <Script src="/site.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
