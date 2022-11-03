import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { Noto_Serif_SC } from '@next/font/google';
import { Logo } from './Logo';
import siteConfig from '../site.config.js';

const notoSerif = Noto_Serif_SC({
  weight: ['400', '900'],
  subsets: ['chinese-simplified'],
  display: 'swap',
});

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={`container mx-auto min-h-screen min-w-[360px] px-5 ${notoSerif.className}`}
    >
      <header className="mx-auto mb-12 mt-8 flex max-w-prose items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="flex space-x-4">
          <Link href="/about">About</Link>
          <Link href="/rss.xml">Feed</Link>
        </nav>
      </header>
      <main className="mx-auto my-12">{children}</main>
      <footer className="mx-auto my-12 max-w-prose">
        <small>
          Copyright © {new Date().getFullYear()} {siteConfig.author.name}. Built
          with Next.js.
        </small>
      </footer>
    </div>
  );
};
