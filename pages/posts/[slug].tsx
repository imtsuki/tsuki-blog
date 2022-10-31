import { ParsedUrlQuery } from 'querystring';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { format } from 'date-fns';

import { Layout, mdxComponents } from '../../components';
import { postSlugs, getMdxSourceBySlug } from '../../lib/content';
import { metadata } from '../../lib/meta';

interface PostPageProps {
  source: MDXRemoteSerializeResult;
}

const PostPage: NextPage<PostPageProps> = ({ source }) => {
  const date = new Date(source.frontmatter?.date ?? '1970-01-01');
  const formattedDate = format(date, 'yyyy-MM-dd');
  return (
    <Layout>
      <Head>
        <title>{`${source.frontmatter?.title} | ${metadata.title}`}</title>
      </Head>
      <article className="prose prose-zinc prose-quoteless mx-auto dark:prose-invert">
        <h1>{source.frontmatter?.title}</h1>
        <time
          className="mr-4 text-zinc-500 dark:text-zinc-400"
          dateTime={source.frontmatter?.date}
        >
          {formattedDate}
        </time>
        <span className="space-x-2 uppercase text-zinc-500 dark:text-zinc-400">
          {source.frontmatter?.tags?.map((tag) => (
            <span className="before:content-['#']" key={tag}>
              {tag}
            </span>
          ))}
        </span>
        <MDXRemote {...source} components={mdxComponents} />
      </article>
    </Layout>
  );
};

interface PostPageParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<
  PostPageProps,
  PostPageParams
> = async ({ params }) => {
  const slug = params?.slug;
  if (!slug) {
    throw new Error('No post slug found during getStaticProps');
  }
  const source = await getMdxSourceBySlug(slug);

  return {
    props: {
      source,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postSlugs
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
