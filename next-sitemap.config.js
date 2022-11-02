import siteConfig from './site.config.js';

/** @type {import('next-sitemap').IConfig} */
const nextSitemapConfig = {
  siteUrl: siteConfig.url,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
};

export default nextSitemapConfig;
