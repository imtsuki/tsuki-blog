import NextHead from 'next/head';
import { PropsWithChildren } from 'react';
import siteConfig from '../site.config.js';

interface HeadProps extends PropsWithChildren {
  title?: string;
  description?: string;
}

export const Meta = ({ title, description, children }: HeadProps) => {
  const { twitter } = siteConfig.author;
  const pageTitle = title ? `${title} | ${siteConfig.title}` : siteConfig.title;
  return (
    <NextHead>
      <title>{pageTitle}</title>
      {description && (
        <meta name="description" content={description} key="description" />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} key="og:title" />
      {description && (
        <meta
          property="og:description"
          content={description}
          key="og:description"
        />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" key="twitter:card" />
      <meta name="twitter:site" content={twitter} key="twitter:site" />
      <meta name="twitter:creator" content={twitter} key="twitter:creator" />
      <meta name="twitter:title" content={pageTitle} key="twitter:title" />
      {description && (
        <meta
          name="twitter:description"
          content={description}
          key="twitter:description"
        />
      )}

      {/* Other children */}
      {children}
    </NextHead>
  );
};
