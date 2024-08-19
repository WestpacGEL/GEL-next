import { AnalyticsConfig, AnalyticsPayload, EventType } from '../types/analytics.types';

import { createRequest, track } from './analytics.utils';

const ANALYTICS_CONFIG: AnalyticsConfig = {
  // TODO: remove?
  encryptedID: '',
  journeyType: 'pub',
  loginStatus: 'logged out',
  pageStatus: 'pub',
  // TODO: which script and path?
  scriptSrc: '',
  siteBrand: 'bom',
  siteDomain: 'localhost',
  siteEnv: 'test',
  siteVersion: '1.0.0',
  siteName: 'online',
  trackOnce: false,
};

export const sendToAnalytics = (event: EventType, analyticsPayload?: AnalyticsPayload) => {
  const request = createRequest(ANALYTICS_CONFIG, analyticsPayload);
  track(event, request);
};
