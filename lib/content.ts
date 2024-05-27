import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_ROOT = path.join(process.cwd(), 'posts');

// postFiles is the list of all mdx files inside the POSTS_PATH directory
export const postFiles = fs
  .readdirSync(POSTS_ROOT)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export const postSlugs = postFiles.map((filename) =>
  filename.replace(/\.mdx?$/, ''),
);

export const getFilePathBySlug = (slug: string) => {
  const mdxFilePath = path.join(POSTS_ROOT, `${slug}.mdx`);
  const mdFilePath = path.join(POSTS_ROOT, `${slug}.md`);
  // prefer mdx over md
  const filePath = fs.existsSync(mdxFilePath) ? mdxFilePath : mdFilePath;
  return filePath;
};

export const getSourceBySlug = async (slug: string) => {
  const filePath = getFilePathBySlug(slug);

  const source = await fs.promises.readFile(filePath, 'utf8');
  return source;
};

export const getSourceBySlugSync = (slug: string) => {
  const filePath = getFilePathBySlug(slug);

  const source = fs.readFileSync(filePath, 'utf8');
  return source;
};

export const postSlugExists = (slug: string) => {
  return postSlugs.includes(slug);
};

export type Frontmatter = {
  title: string;
  date: string;
  description?: string;
  tags: string[];
};

export const postsMetadata = (
  postSlugs.map((slug) => {
    const source = getSourceBySlugSync(slug);

    const { data: frontmatter } = matter(source);

    return {
      frontmatter,
      slug,
    };
  }) as {
    frontmatter: Frontmatter;
    slug: string;
  }[]
).sort((a, b) => {
  if (a.frontmatter.date < b.frontmatter.date) {
    return 1;
  } else if (a.frontmatter.date > b.frontmatter.date) {
    return -1;
  } else {
    return 0;
  }
});
