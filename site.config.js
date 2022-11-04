const siteConfig = {
  title: 'ツキの月',
  description: "Tsuki's Blog",
  url: 'https://qjx.app',
  author: { name: 'imtsuki' },
  twitter: {
    handle: '@iimtsuki',
  },
  /** @type {import('@giscus/react').GiscusProps} */
  giscus: {
    repo: 'imtsuki/tsuki-blog',
    repoId: 'MDEwOlJlcG9zaXRvcnkxNTA1OTAxMTg=',
    category: 'Announcements',
    categoryId: 'DIC_kwDOCPnSps4CSV3-',
    strict: '1',
    reactionsEnabled: '1',
    emitMetadata: '0',
    inputPosition: 'top',
    theme: 'preferred_color_scheme',
    lang: 'en',
  },
};

export default siteConfig;
