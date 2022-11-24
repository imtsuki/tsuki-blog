// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import siteConfig from '../../../site.config.js';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const baseUrl = `${req.headers['x-forwarded-proto'] || 'http'}://${
    req.headers.host
  }`;
  console.log('baseUrl', baseUrl);
  // set content type
  res
    .setHeader('Content-Type', 'application/activity+json')
    .status(200)
    .json({
      '@context': [
        'https://www.w3.org/ns/activitystreams',
        'https://w3id.org/security/v1',
      ],
      id: `${baseUrl}/api/activitypub/actor`,
      type: 'Person',
      inbox: `${baseUrl}/api/activitypub/inbox`,
      outbox: `${baseUrl}/api/activitypub/outbox`,
      following: `${baseUrl}/api/activitypub/following`,
      followers: `${baseUrl}/api/activitypub/followers`,
      preferredUsername: 'blog',
      name: siteConfig.title,
      summary: siteConfig.description,
      icon: {
        type: 'Image',
        mediaType: 'image/png',
        url: `${baseUrl}/apple-touch-icon.png`,
      },
      publicKey: {
        id: `${baseUrl}/api/activitypub/actor#main-key`,
        owner: `${baseUrl}/api/activitypub/actor`,
        publicKeyPem: process.env.ACTIVITYPUB_PUBLIC_KEY,
      },
    });
};

export default handler;
