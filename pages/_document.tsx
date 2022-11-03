import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html className="dark:bg-zinc-900 dark:text-white">
      <Head>
        {/**
         * Favicons
         * Definitive edition of "How to Favicon in 2021"
         * https://dev.to/masakudamatsu/favicon-nightmare-how-to-maintain-sanity-3al7
         */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Third-party stylesheets */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.3/dist/katex.min.css"
          integrity="sha384-Juol1FqnotbkyZUT5Z7gUPjQ9gzlwCENvUZTpQBAPxtusdwFLRy382PSDx5UUJ4/"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
