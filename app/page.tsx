import Link from 'next/link';
import { formatInTimeZone } from 'date-fns-tz';

import { postsMetadata } from 'lib/content';

const IndexPage = () => {
  return (
    <ul className="mx-auto max-w-lg">
      {postsMetadata.map((post) => (
        <li className="flex space-x-4 max-[320px]:flex-col" key={post.slug}>
          <time
            className="shrink-0 grow-0 lining-nums tabular-nums text-zinc-500 dark:text-zinc-400"
            dateTime={post.frontmatter.date.toJSON()}
          >
            {formatInTimeZone(post.frontmatter.date, 'UTC', 'yyyy-MM-dd')}
          </time>
          <Link className="text-lg" href={`/posts/${post.slug}`}>
            {post.frontmatter.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default IndexPage;
