import path from 'node:path';

import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeRewrite from 'rehype-rewrite';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkUnwrapImages from 'remark-unwrap-images';
import { imageSize } from 'image-size';

import { type SerializeOptions } from 'next-mdx-remote/dist/types';

import { remarkTransformDirectives } from 'lib/directives';
import * as Log from 'lib/log';

const rewriteImageSize = (
  node: import('hast').Element,
  index: number,
  parent: Element
) => {
  if (!node.properties || !node.properties.src) {
    Log.warn('img node without src', node);
    return;
  }
  let src = node.properties.src as string;
  if (src.startsWith('/')) {
    let { width, height } = imageSize(path.join(process.cwd(), 'public', src));
    node.properties.width = width;
    node.properties.height = height;
  } else {
    Log.warn(`Image ${src} is not local.`);
  }
};

export const mdxOptions = {
  remarkPlugins: [
    remarkGfm,
    remarkDirective,
    remarkTransformDirectives,
    remarkMath,
    remarkUnwrapImages,
  ],
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
} satisfies SerializeOptions['mdxOptions'];
