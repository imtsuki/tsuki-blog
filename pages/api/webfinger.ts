// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const host = req.headers.host;
  const baseUrl = `${req.headers['x-forwarded-proto'] || 'http'}://${host}`;
  const { resource } = req.query;
  if (resource === `acct:blog@${host}`) {
    res.status(200).json({
      subject: `acct:blog@${host}`,
      links: [
        {
          rel: 'self',
          type: 'application/activity+json',
          href: `${baseUrl}/api/activitypub/actor`,
        },
      ],
    });
  } else {
    res.status(404).end();
  }
};

export default handler;
