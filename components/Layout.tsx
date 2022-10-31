import Link from 'next/link';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import logoSvg from '../public/logo.svg';
import { Cormorant, Noto_Serif_SC } from '@next/font/google';

const cormorant = Cormorant({ subsets: ['latin'] });
const notoSerif = Noto_Serif_SC({
  weight: ['400', '900'],
  subsets: ['chinese-simplified'],
});

const notoSerif900 = Noto_Serif_SC({
  weight: '900',
  subsets: ['chinese-simplified'],
});

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={`container mx-auto min-h-screen min-w-[360px] px-5 ${notoSerif.className}`}
    >
      <header className="mx-auto mb-12 mt-8 flex max-w-prose items-center justify-between">
        <Link href="/">
          <Image src={logoSvg} alt="Back to home page" />
        </Link>
        <nav className="flex space-x-4">
          <Link href="/about">About</Link>
          <Link href="/rss.xml">Feed</Link>
        </nav>
      </header>
      <main className="mx-auto my-12">{children}</main>
      <footer className="mx-auto my-12 max-w-prose">
        <small>
          Copyright © {new Date().getFullYear()} imtsuki. Built with Next.js.
        </small>
      </footer>
    </div>
  );
};
