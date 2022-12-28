import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Giscus from '@giscus/react';
import { Layout } from '../components';
import siteConfig from '../site.config.js';
import { postSlugs, getSourceBySlug } from '../lib/content';
import matter from 'gray-matter';

interface TagsPageProps {
  tags: Record<string, { title: string; slug: string }[]>;
}

const TagsPage: NextPage<TagsPageProps> = ({ tags }) => {
  return (
    <Layout>
      <NextSeo title="Tags" description="Tags" />
      <article className="prose prose-zinc mx-auto prose-headings:font-black dark:prose-invert">
        <h1>Tags</h1>
        {Object.keys(tags).map((tag) => (
          <div key={tag}>
            <h2>{tag}</h2>
            <ul>
              {tags[tag].map(({ title, slug }) => (
                <li key={slug}>
                  <a href={`/posts/${slug}`}>{title}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <hr />
        <Giscus {...siteConfig.giscus} mapping="specific" term="Tags" />
      </article>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<TagsPageProps> = async () => {
  const tagsData = await Promise.all(
    postSlugs.map(async (slug) => {
      const source = await getSourceBySlug(slug);
      const { content, data } = matter(source);

      const title: string = data.title;
      const tags: string[] = data.tags;

      return {
        slug,
        title,
        tags,
      };
    })
  );

  const reduced = tagsData.reduce(
    (acc: TagsPageProps['tags'], { slug, title, tags }) => {
      tags.forEach((tag) => {
        if (!acc[tag]) {
          acc[tag] = [];
        }
        acc[tag].push({ slug, title });
      });
      return acc;
    },
    {}
  );

  return { props: { tags: reduced } };
};

export default TagsPage;
