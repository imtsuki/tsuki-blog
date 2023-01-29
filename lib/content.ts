import fs from 'node:fs';
import path from 'node:path';

import { MDXRemoteSerializeResult } from 'next-mdx-remote';

import { compileMdx } from './compile';

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_ROOT = path.join(process.cwd(), 'posts');

// postFiles is the list of all mdx files inside the POSTS_PATH directory
export const postFiles = fs
  .readdirSync(POSTS_ROOT)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export const postSlugs = postFiles.map((filename) =>
  filename.replace(/\.mdx?$/, '')
);

export const getSourceBySlug = async (slug: string) => {
  const mdxFilePath = path.join(POSTS_ROOT, `${slug}.mdx`);
  const mdFilePath = path.join(POSTS_ROOT, `${slug}.md`);
  // prefer mdx over md
  const filePath = fs.existsSync(mdxFilePath) ? mdxFilePath : mdFilePath;
  const source = await fs.promises.readFile(filePath, 'utf8');
  return source;
};

export const getMdxSourceBySlug = async (
  slug: string
): Promise<MDXRemoteSerializeResult> => {
  const source = await getSourceBySlug(slug);

  const mdxSource = await compileMdx(source);

  // Date objects cannot be passed across Next.js boundary
  return JSON.parse(JSON.stringify(mdxSource));
};
