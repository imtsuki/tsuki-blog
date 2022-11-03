import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Layout } from './Layout';
import { Head } from './Head';
import { Logo } from './Logo';
import { Favicon } from './Favicon';

/** Custom components/renderers to pass to MDX. */
export const mdxComponents = {
  // TODO: fix any type
  img: (props: any) => (
    // height and width are part of the props, so they get automatically passed here with {...props}
    <Image {...props} loading="lazy" alt={props.alt} />
  ),
  Underline: dynamic(() => import('./Annotation').then((mod) => mod.Underline)),
  Box: dynamic(() => import('./Annotation').then((mod) => mod.Box)),
  Circle: dynamic(() => import('./Annotation').then((mod) => mod.Circle)),
  Highlight: dynamic(() => import('./Annotation').then((mod) => mod.Highlight)),
  Head,
};

export { Favicon, Layout, Logo, Head };
