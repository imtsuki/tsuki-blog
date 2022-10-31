import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '../components';
import { metadata } from '../lib/meta';

const AboutPage = () => {
  return (
    <Layout>
      <Head>
        <title>{`I am... | ${metadata.title}`}</title>
      </Head>
      <article className="prose mx-auto dark:prose-invert">
        <h1>I am...</h1>
        <p>You guess.</p>
      </article>
    </Layout>
  );
};

export default AboutPage;
