import path from 'node:path';
import { readFileSync } from 'node:fs';

import rehypeKatex from 'rehype-katex';
import rehypeShiki from '@shikijs/rehype';
import rehypeRewrite from 'rehype-rewrite';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkUnwrapImages from 'remark-unwrap-images';
import { imageSize } from 'image-size';

import { type MDXRemoteProps } from 'next-mdx-remote/rsc';

import { remarkTransformDirectives } from 'lib/directives';
import * as Log from 'lib/log';

const injectImageSizeAttributes = (
  node: import('hast').Element,
  index: number,
  parent: Element,
) => {
  if (!node.properties || !node.properties.src) {
    Log.warn('img node without src', node);
    return;
  }
  const src = node.properties.src as string;
  if (src.startsWith('/')) {
    const buffer = readFileSync(path.join(process.cwd(), 'public', src));
    const { width, height } = imageSize(buffer);
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
        rewrite: injectImageSizeAttributes,
      },
    ],
    rehypeKatex,
    [
      rehypeShiki,
      {
        themes: {
          dark: 'aurora-x',
          light: 'one-light',
        },
        defaultColor: false,
      },
    ],
  ],
} satisfies NonNullable<MDXRemoteProps['options']>['mdxOptions'];
