// @ts-check
import bundleAnalyzer from '@next/bundle-analyzer';
import { env } from './src/env.mjs';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return withBundleAnalyzer(config);
}

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // Docker
  // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: [
      'cdn.discordapp.com',
      'lh3.googleusercontent.com',
      'images.clerk.dev',
      'www.gravatar.com',
      env.MINIO_ENDPOINT,
    ],
  },
  experimental: {
    swcPlugins: [
      [
        'next-superjson-plugin',
        {
          excluded: [],
        },
      ],
    ],
  },
});
