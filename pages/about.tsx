import Head from 'next/head';
import Giscus from '@giscus/react';
import { Layout, TwitterCard } from '../components';
import siteConfig from '../site.config.js';

const AboutPage = () => {
  const pageTitle = `I am... | ${siteConfig.title}`;
  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
        <TwitterCard title={pageTitle} />
      </Head>
      <article className="prose prose-zinc mx-auto dark:prose-invert">
        <h1>I am...</h1>
        <p>You guess.</p>
        <hr />
        <Giscus {...siteConfig.giscus} mapping="specific" term="About" />
      </article>
    </Layout>
  );
};

export default AboutPage;
