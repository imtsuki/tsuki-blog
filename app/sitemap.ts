import { MetadataRoute } from 'next';

import { postSlugs } from 'lib/content';

import siteConfig from 'site.config.js';

const sitemap = (): MetadataRoute.Sitemap => {
  const lastModified = new Date();

  const routes = ['', '/about', '/tags', '/rss.xml'].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
  }));

  const posts = postSlugs.map((slug) => ({
    url: `${siteConfig.url}/posts/${slug}`,
    lastModified,
  }));

  return [...routes, ...posts];
};

export default sitemap;
