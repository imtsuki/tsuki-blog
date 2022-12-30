import { NextPage } from 'next';
import Link from 'next/link';
import { formatInTimeZone } from 'date-fns-tz';
import matter from 'gray-matter';

import { Layout } from '../components';
import { postSlugs, getSourceBySlug } from '../lib/content';

interface IndexPageProps {
  posts: Array<{
    frontmatter: {
      title: string;
      date: string;
    };
    slug: string;
    formattedDate: string;
  }>;
}

const IndexPage: NextPage<IndexPageProps> = ({ posts }) => {
  return (
    <Layout>
      <ul className="mx-auto max-w-lg">
        {posts.map((post) => (
          <li className="flex space-x-4 max-[320px]:flex-col" key={post.slug}>
            <time
              className="shrink-0 grow-0 lining-nums tabular-nums text-zinc-500 dark:text-zinc-400"
              dateTime={post.frontmatter.date}
            >
              {post.formattedDate}
            </time>
            <Link
              className="text-lg"
              as={`/posts/${post.slug}`}
              href={`/posts/[slug]`}
            >
              {post.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const posts = await Promise.all(
    postSlugs.map(async (slug) => {
      const source = await getSourceBySlug(slug);
      const { content, data } = matter(source);
      const frontmatter = {
        ...data,
        date: data.date?.toJSON(),
      };

      const formattedDate = formatInTimeZone(data.date, 'UTC', 'yyyy-MM-dd');

      return {
        frontmatter,
        slug,
        formattedDate,
      };
    })
  );

  posts.sort((a, b) => {
    if (a.frontmatter.date < b.frontmatter.date) {
      return 1;
    } else if (a.frontmatter.date > b.frontmatter.date) {
      return -1;
    } else {
      return 0;
    }
  });

  return { props: { posts } };
};

export default IndexPage;
