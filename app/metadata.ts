import { type Metadata } from 'next';
import siteConfig from 'site.config.js';

export const globalMetadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  /**
   * Indicate dark mode support.
   * Improves the default styling in dark mode, such as system controls
   * and scrollbars.
   * @see https://web.dev/color-scheme/
   */
  colorScheme: 'light dark',
  /**
   * Favicons.
   * Definitive edition of "How to Favicon in 2021"
   * @see https://dev.to/masakudamatsu/favicon-nightmare-how-to-maintain-sanity-3al7
   */
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-touch-icon.png',
  },
  /* TODO: link rel="manifest" href="/site.webmanifest" */
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: 'summary',
    site: siteConfig.twitter.handle,
    creator: siteConfig.twitter.handle,
  },
};
