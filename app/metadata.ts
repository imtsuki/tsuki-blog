import { type Metadata } from 'next';
import siteConfig from 'site.config.js';

export const globalMetadata = {
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
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: 'summary',
    site: siteConfig.twitter.handle,
    creator: siteConfig.twitter.handle,
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.title}`,
    },
  },
  openGraph: {
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.title}`,
    },
    description: siteConfig.description,
  },
} satisfies Metadata;
