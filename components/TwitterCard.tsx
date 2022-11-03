import siteConfig from '../site.config.js';

interface TwitterCardProps {
  title: string;
  description?: string;
}

export const TwitterCard = ({ title, description }: TwitterCardProps) => {
  const { twitter: twitterHandle } = siteConfig.author;
  return (
    <>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
    </>
  );
};
