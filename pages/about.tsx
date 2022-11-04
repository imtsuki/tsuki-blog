import { NextSeo } from 'next-seo';
import Giscus from '@giscus/react';
import { Layout } from '../components';
import siteConfig from '../site.config.js';

const AboutPage = () => {
  return (
    <Layout>
      <NextSeo title="I am..." description="About me" />
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
