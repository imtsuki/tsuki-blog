import Image, { type ImageProps } from 'next/image';

import { Callout } from 'components/callout';
import { Annotation } from 'components/annotation';

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
  Annotation,
  Callout,
};
