import React from 'react';
import Image, { type ImageProps } from 'next/image';

import { Callout } from 'components/callout';

// TODO: fix react rough notation server component error
const Underline = ({ children }: { children: React.ReactNode }) => (
  <span>{children}</span>
);
const Box = ({ children }: { children: React.ReactNode }) => (
  <span>{children}</span>
);
const Circle = ({ children }: { children: React.ReactNode }) => (
  <span>{children}</span>
);
const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span>{children}</span>
);

/** Custom components/renderers to pass to MDX. */
export const mdxComponents = {
  img: ({
    title,
    src,
    alt,
    width,
    height,
    ...props
  }: Omit<JSX.IntrinsicElements['img'], 'srcSet' | 'ref' | 'placeholder'>) => (
    <figure>
      <Image
        title={title}
        src={src as ImageProps['src']}
        alt={alt as ImageProps['alt']}
        width={width as ImageProps['width']}
        height={height as ImageProps['height']}
        loading="lazy"
        {...props}
      />
      {title && <figcaption>{title}</figcaption>}
    </figure>
  ),
  Callout,
  // Underline: dynamic(() => import('./Annotation').then((mod) => mod.Underline)),
  // Box: dynamic(() => import('./Annotation').then((mod) => mod.Box)),
  // Circle: dynamic(() => import('./Annotation').then((mod) => mod.Circle)),
  // Highlight: dynamic(() => import('./Annotation').then((mod) => mod.Highlight)),
  Underline,
  Box,
  Circle,
  Highlight,
};
