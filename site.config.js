const siteConfig = {
  title: 'ツキの月',
  description: "Tsuki's Blog",
  url: 'https://qjx.app',
  author: {
    name: 'imtsuki',
    email: 'me@qjx.app',
  },
  links: {
    github: 'https://github.com/imtsuki',
    twitter: 'https://twitter.com/iimtsuki',
    mastodon: 'https://mastodon.social/@imtsuki',
    linkedin: 'https://www.linkedin.com/in/jxqiu/',
    instagram: 'https://www.instagram.com/iimtsuki/',
  },
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
