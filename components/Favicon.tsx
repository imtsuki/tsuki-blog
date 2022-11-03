/**
 * Definitive edition of "How to Favicon in 2021"
 * https://dev.to/masakudamatsu/favicon-nightmare-how-to-maintain-sanity-3al7
 */
export const Favicon = () => {
  return (
    <>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </>
  );
};
