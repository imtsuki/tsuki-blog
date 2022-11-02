import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '../components';
import siteConfig from '../site.config.js';

const AboutPage = () => {
  return (
    <Layout>
      <Head>
        <title>{`I am... | ${siteConfig.title}`}</title>
      </Head>
      <article className="prose prose-zinc mx-auto dark:prose-invert">
        <h1>I am...</h1>
        <p>You guess.</p>
      </article>
    </Layout>
  );
};

export default AboutPage;
