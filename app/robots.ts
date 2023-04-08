import { MetadataRoute } from 'next';

import siteConfig from 'site.config.js';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
  },
  sitemap: `${siteConfig.url}/sitemap.xml`,
  host: siteConfig.url,
});

export default robots;
