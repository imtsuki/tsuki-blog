import fs from 'node:fs';
import path from 'node:path';
import { Feed } from 'feed';
import matter from 'gray-matter';
import siteConfig from '../site.config.js';

// FIXME: copy-pasted here to avoid import errors

const POSTS_ROOT = path.join(process.cwd(), 'posts');

const postFiles = fs
  .readdirSync(POSTS_ROOT)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

const postSlugs = postFiles.map((filename) => filename.replace(/\.mdx?$/, ''));

const getSourceBySlug = async (slug: string) => {
  const mdxFilePath = path.join(POSTS_ROOT, `${slug}.mdx`);
  const mdFilePath = path.join(POSTS_ROOT, `${slug}.md`);
  // prefer mdx over md
  const filePath = fs.existsSync(mdxFilePath) ? mdxFilePath : mdFilePath;
  const source = await fs.promises.readFile(filePath, 'utf8');
  return source;
};

const getPublicUrlBySlug = (slug: string) => `${siteConfig.url}/posts/${slug}`;

console.log('Generating RSS feed...');

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
  postSlugs.map(async (slug) => {
    const source = await getSourceBySlug(slug);
    const { data } = matter(source);
    return {
      title: data.title,
      id: getPublicUrlBySlug(slug),
      link: getPublicUrlBySlug(slug),
      date: data.date,
    };
  })
);

console.log(`Found ${items.length} posts`);

items.sort((a, b) => (a.date > b.date ? -1 : 1));

items.forEach((item) => feed.addItem(item));

console.log('Writing RSS feed to public/rss.xml');

const rss = feed.rss2();

await fs.promises.writeFile('public/rss.xml', rss);

console.log('Done generating RSS feed');
