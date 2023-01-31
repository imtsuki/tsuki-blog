'use client';

import GiscusComponent, { type GiscusProps } from '@giscus/react';

export const Giscus = (props: GiscusProps) => {
  return <GiscusComponent {...props} />;
};

export { type GiscusProps };
