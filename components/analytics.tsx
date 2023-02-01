'use client';

import {
  Analytics as AnalyticsComponent,
  type AnalyticsProps,
} from '@vercel/analytics/react';

export const Analytics = (props: AnalyticsProps) => {
  return <AnalyticsComponent {...props} />;
};

export { type AnalyticsProps };
