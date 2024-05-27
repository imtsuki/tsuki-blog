import {
  Email,
  Github,
  Twitter,
  Instagram,
  Linkedin,
  Mastodon,
  Telegram,
} from 'components/social';
import { Giscus } from 'components/giscus';

import siteConfig from 'site.config.js';

export const metadata = {
  title: '关于我',
  description: 'About me',
};

const AboutPage = () => {
  return (
    <article className="prose prose-zinc mx-auto dark:prose-invert prose-headings:font-black">
      <h1>{metadata.title}</h1>
      <hr />
      <Giscus {...siteConfig.giscus} mapping="specific" term="About" />
    </article>
  );
};

export default AboutPage;
