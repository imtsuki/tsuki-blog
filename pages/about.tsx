import { NextSeo } from 'next-seo';
import Giscus from '@giscus/react';
import { Layout } from '../components';
import {
  Email,
  Github,
  Twitter,
  Instagram,
  Linkedin,
  Mastodon,
} from '../components/social';
import siteConfig from '../site.config.js';

const AboutPage = () => {
  return (
    <Layout>
      <NextSeo title="I am..." description="About me" />
      <article className="prose prose-zinc mx-auto prose-headings:font-black dark:prose-invert">
        <h1>
          <span className="shadow-highlight shadow-franklin dark:shadow-blurple">
            I am...
          </span>
        </h1>
        <p>Hi.</p>
        <p>
          I am currently a {"master's"} student at the University of Toronto. I
          received my {"bachelor's"} degree from Beijing University of Posts and
          Telecommunications.
        </p>
        <p>
          I enjoy exploring my creative side through photography and learning to
          play the guitar (although I am still a beginner). I am also a huge fan
          of Nintendo games, with The Legend of Zelda: Breath of the Wild being
          my all-time favorite.
        </p>
        <p>
          As a software developer, I have a strong passion for building complex
          and sophisticated systems, and have had the opportunity to work on
          some amazing projects in the past, including my internship at tech
          startup SmartX where I worked on developing distributed storage
          systems for data centers. I have also had the chance to work at
          Alibaba Cloud, where I worked on ClickHouse, a world-renowned
          distributed database.
        </p>
        <p>
          My journey to this point has been full of twists and turns. It all
          started when I stumbled upon an old book about BASIC programming in my
          childhood. From that moment on, I knew I had a passion for coding, and
          set my sights on becoming a developer. However, my college days were
          filled with uncertainty as I explored different fields and tried to
          find my true passion. While I initially chased the trend of machine
          learning, I eventually realized that my true passion lay in building
          the systems that power large-scale applications.
        </p>
        <p>
          As I constantly seek software engineering opportunities, I am
          confident that I will be able to do great things with the knowledge
          and experience I have gained. I am excited to see what the future
          holds, and I am determined to make a difference in the world.
        </p>
        <p>
          If you are interested, you can find me on <Github />, <Twitter />,{' '}
          <Mastodon />, <Instagram />, <Linkedin />, and <Email />.
        </p>
        <hr />
        <Giscus {...siteConfig.giscus} mapping="specific" term="About" />
      </article>
    </Layout>
  );
};

export default AboutPage;
