import { type Metadata } from 'next';
import Link from 'next/link';

import { formatInTimeZone } from 'date-fns-tz';

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
      acc: Record<string, { title: string; slug: string; date: Date }[]>,
      { slug, frontmatter: { title, date, tags } }
    ) => {
      tags.forEach((tag) => {
        if (!acc[tag]) {
          acc[tag] = [];
        }
        acc[tag].push({ slug, title, date });
      });
      return acc;
    },
    {}
  );

  return (
    <article className="prose prose-zinc mx-auto dark:prose-invert prose-headings:font-black">
      <h1>Tags</h1>
      {Object.keys(tags).map((tag) => (
        <div key={tag}>
          <h2>{tag}</h2>
          <ul>
            {tags[tag].map(({ title, slug, date }) => (
              <li className="flex space-x-4 max-[320px]:flex-col" key={slug}>
                <time
                  className="shrink-0 grow-0 lining-nums tabular-nums text-zinc-500 dark:text-zinc-400"
                  dateTime={date.toJSON()}
                >
                  {formatInTimeZone(date, 'UTC', 'yyyy-MM-dd')}
                </time>
                <Link className="text-lg" href={`/posts/${slug}`}>
                  {title}
                </Link>
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
