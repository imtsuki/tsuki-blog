// TODO: remove this once upstream is fixed

declare module 'rehype-img-size' {
  import type { Plugin } from 'unified';
  import type { Root } from 'hast';

  interface Options {
    dir: string;
  }

  declare const rehypeImgSize: Plugin<[Options?], Root, Root>;
  export default rehypeImgSize;
  export type { Options };
}
