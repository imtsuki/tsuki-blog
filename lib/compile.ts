import path from 'node:path';

import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeRewrite from 'rehype-rewrite';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkUnwrapImages from 'remark-unwrap-images';
import { imageSize } from 'image-size';

import { visit } from 'unist-util-visit';

import { CALLOUT_TYPES } from '../components/callout';
import { type SerializeOptions } from 'next-mdx-remote/dist/types';

const rewriteImageSize = (
  node: import('hast').Element,
  index: number,
  parent: Element
) => {
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

const remarkCallout = () => {
  // annotating types here causes TypeScript language server to lag
  const transformer = (tree: any) => {
    visit(tree, (node) => {
      if (node.type !== 'containerDirective') return;
      if (!CALLOUT_TYPES.includes(node.name)) return;

      const calloutType = node.name;

      node.type = 'mdxJsxFlowElement';
      node.name = 'Callout';
      node.attributes = [
        { type: 'mdxJsxAttribute', name: 'type', value: calloutType },
      ];
    });
  };

  return transformer;
};

export const mdxOptions = {
  remarkPlugins: [
    remarkGfm,
    remarkDirective,
    remarkCallout,
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
