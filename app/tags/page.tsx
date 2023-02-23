import { type Metadata } from 'next';

import { Giscus } from 'components/giscus';
import { postsMetadata } from 'lib/content';

import siteConfig from 'site.config.js';

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Tags',
};

const TagsPage = async () => {
  const tags = postsMetadata.reduce(
    (
      acc: Record<string, { title: string; slug: string }[]>,
      { slug, frontmatter: { title, tags } }
    ) => {
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

  return (
    <article className="prose prose-zinc mx-auto dark:prose-invert prose-headings:font-black">
      <h1>
        <span className="shadow-highlight shadow-franklin dark:shadow-blurple">
          Tags
        </span>
      </h1>
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
  );
};

export default TagsPage;
