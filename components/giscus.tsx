'use client';

import Giscus, { type GiscusProps } from '@giscus/react';

const ClientGiscus = (props: GiscusProps) => {
  return <Giscus {...props} />;
};

export default ClientGiscus;
