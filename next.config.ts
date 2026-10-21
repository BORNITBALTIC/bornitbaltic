import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  // kaldkriipsu eemaldamine on proxy's, et vana aadress jouaks uuele yhe suunamisega
  skipTrailingSlashRedirect: true,
  // testdomeen (Railway) ei tohi Google'isse minna: noindex koigele, mis ei ole bornitbaltic.ee
  async headers() {
    return [
      {
        source: '/:path*',
        missing: [{ type: 'host', value: '(www\\.)?bornitbaltic\\.ee' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ]
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
