import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';
import { Tweet } from 'react-tweet';

import { Callout } from 'components/callout';
import { Annotation } from 'components/annotation';

import type { JSX } from 'react';

/** Custom components/renderers to pass to MDX. */
export const mdxComponents = {
  a: ({ href, ...props }: JSX.IntrinsicElements['a']) => {
    if (href && href.startsWith('/')) {
      return <Link href={href} {...props} />;
    } else if (href && !href.startsWith('#')) {
      return <a href={href} target="_blank" rel="noreferrer" {...props} />;
    } else {
      return <a href={href} {...props} />;
    }
  },
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
  Annotation,
  Callout,
  Tweet: (props: Parameters<typeof Tweet>[0]) => (
    <div className="not-prose">
      <Tweet {...props} />
    </div>
  ),
};
