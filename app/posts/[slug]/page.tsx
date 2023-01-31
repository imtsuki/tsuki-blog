import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';

import { formatInTimeZone } from 'date-fns-tz';

import { mdxOptions } from 'lib/compile';
import {
  getSourceBySlug,
  postSlugs,
  postSlugExists,
  type Frontmatter,
} from 'lib/content';

import { Giscus } from 'components/giscus';
import { mdxComponents } from 'components/mdx';

import siteConfig from 'site.config.js';

const PostPage = async ({ params }: { params: { slug: string } }) => {
  console.log('rendering post page', params);

  if (!postSlugExists(params.slug)) {
    notFound();
  }

  const source = await getSourceBySlug(params.slug);

  const {
    content,
    frontmatter: { title, date, tags },
  } =
    // @ts-ignore
    (await compileMDX({
      source,
      options: { mdxOptions, parseFrontmatter: true },
      components: mdxComponents,
    })) as { content: JSX.Element; frontmatter: Frontmatter };

  return (
    <article className="prose prose-zinc mx-auto prose-headings:font-black dark:prose-invert">
      <h1>
        <span className="shadow-highlight shadow-franklin dark:shadow-blurple">
          {title}
        </span>
      </h1>
      <time
        className="mr-4 text-zinc-500 dark:text-zinc-400"
        dateTime={date.toJSON()}
      >
        {formatInTimeZone(date, 'UTC', 'yyyy-MM-dd')}
      </time>
      <span className="space-x-2 text-sm uppercase text-zinc-500 dark:text-zinc-400">
        {tags.map((tag) => (
          <span className="before:content-['#']" key={tag}>
            {tag}
          </span>
        ))}
      </span>
      {content}
      <hr />
      <Giscus {...siteConfig.giscus} mapping="specific" term={title} />
    </article>
  );
};

export const generateStaticParams = async () => {
  return postSlugs.map((slug) => ({ slug }));
};

export default PostPage;
