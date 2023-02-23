import { Feed } from 'feed';

import { postsMetadata } from 'lib/content';
import siteConfig from 'site.config.js';

export const GET = async () => {
  const getPublicUrlBySlug = (slug: string) =>
    `${siteConfig.url}/posts/${slug}`;

  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    image: `${siteConfig.url}/icon.png`,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: siteConfig.author.name,
    author: {
      name: siteConfig.author.name,
      link: siteConfig.url,
    },
  });

  const items = await Promise.all(
    postsMetadata.map(async ({ frontmatter, slug }) => {
      return {
        title: frontmatter.title,
        id: getPublicUrlBySlug(slug),
        link: getPublicUrlBySlug(slug),
        date: frontmatter.date,
      };
    })
  );

  items.sort((a, b) => (a.date > b.date ? -1 : 1));

  items.forEach((item) => feed.addItem(item));

  const rss = feed.rss2();

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
