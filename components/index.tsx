import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image, { type ImageProps } from 'next/image';
import { Layout } from './Layout';
import { Logo } from './Logo';
import { Callout } from './Callout';

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
  Underline: dynamic(() => import('./Annotation').then((mod) => mod.Underline)),
  Box: dynamic(() => import('./Annotation').then((mod) => mod.Box)),
  Circle: dynamic(() => import('./Annotation').then((mod) => mod.Circle)),
  Highlight: dynamic(() => import('./Annotation').then((mod) => mod.Highlight)),
  Head,
};

export { Layout, Logo };
