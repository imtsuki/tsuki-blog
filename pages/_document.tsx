import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html className="text-black dark:bg-zinc-900 dark:text-white">
      <Head>
        <meta
          name="google-site-verification"
          content="Sf3TQAKc2EfeBR3ltsbYlbX06bHJ4-QbsC_7Jko3zZ8"
        />

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
