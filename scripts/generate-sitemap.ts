import { SitemapStream, streamToPromise } from 'sitemap';

import { postFiles } from '../lib/content.js';

const stream = new SitemapStream({
  hostname: 'https://qjx.app',
});

for (const path of postFiles) {
  stream.write({
    url: path.replace(/\.mdx?$/, ''),
    changefreq: 'daily',
    priority: 0.7,
  });
}

stream.end();

streamToPromise(stream)
  .then((sm) => sm.toString())
  .then(console.log);

console.log(postFiles);
