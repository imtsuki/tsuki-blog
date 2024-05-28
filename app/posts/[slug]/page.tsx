import { type Metadata } from 'next';

import { compileMDX } from 'next-mdx-remote/rsc';

import { formatInTimeZone } from 'date-fns-tz';
import { IconTag } from '@tabler/icons-react';

import { mdxOptions } from 'lib/compile';
import {
  getSourceBySlug,
  postSlugs,
  postsMetadata,
  type Frontmatter,
} from 'lib/content';
import * as Log from 'lib/log';

import { Giscus } from 'components/giscus';
import { mdxComponents } from 'components/mdx';

import siteConfig from 'site.config.js';

export const dynamicParams = false;

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const metadata = postsMetadata.find((post) => post.slug === params.slug);

  if (!metadata) {
    Log.warn('no metadata found for slug', params.slug);
    return {};
  }

  const title = metadata.frontmatter.title;
  const description = metadata.frontmatter.description ?? title;

  return {
    title,
    description,
    twitter: {
      title,
    },
    openGraph: {
      title,
      description,
    },
  };
};

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const source = await getSourceBySlug(params.slug);

  const {
    content,
    frontmatter: { title, date, tags },
  } = await compileMDX<Frontmatter>({
    source,
    options: { mdxOptions, parseFrontmatter: true },
    components: mdxComponents,
  });

  return (
    <article className="prose prose-zinc mx-auto dark:prose-invert prose-headings:font-black">
      <h1>
        <span className="shadow-highlight shadow-franklin dark:shadow-blurple">
          {title}
        </span>
      </h1>
      <time
        className="mr-2 text-sm text-zinc-500 dark:text-zinc-400"
        dateTime={date}
      >
        {formatInTimeZone(date, 'UTC', 'yyyy-MM-dd')}
      </time>
      <span className="space-x-2 font-mono text-sm capitalize text-zinc-500 dark:text-zinc-400">
        {tags.map((tag) => (
          <span key={tag} className="inline-flex items-baseline">
            <IconTag className="mr-0.5 inline self-center" size="1em" />
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
