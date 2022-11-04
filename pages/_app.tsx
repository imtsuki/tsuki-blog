import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { Analytics } from '@vercel/analytics/react';
import siteConfig from '../site.config.js';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <DefaultSeo
        titleTemplate={`%s | ${siteConfig.title}`}
        defaultTitle={siteConfig.title}
        description={siteConfig.description}
        twitter={{
          cardType: 'summary',
          site: siteConfig.twitter.handle,
          handle: siteConfig.twitter.handle,
        }}
      />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
};

export default App;
