import fs from 'fs';
import path from 'path';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeRewrite from 'rehype-rewrite';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import { imageSize } from 'image-size';
import { Element } from 'hast';

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
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath, remarkUnwrapImages],
      rehypePlugins: [
        [
          rehypeRewrite,
          {
            selector: 'img',
            rewrite: rewriteImageSize,
          },
        ],
        rehypeKatex,
        [
          rehypePrettyCode,
          {
            theme: 'css-variables',
          },
        ],
      ],
    },
    parseFrontmatter: true,
  });

  // Date objects cannot be passed across Next.js boundary
  return JSON.parse(JSON.stringify(mdxSource));
};

const rewriteImageSize = (node: Element, index: number, parent: Element) => {
  if (!node.properties || !node.properties.src) {
    console.warn('img node without src', node);
    return;
  }
  let src = node.properties.src as string;
  if (src.startsWith('/')) {
    let { width, height } = imageSize(path.join(process.cwd(), 'public', src));
    node.properties.width = width;
    node.properties.height = height;
  } else {
    console.warn(`Image ${src} is not local.`);
  }
};
