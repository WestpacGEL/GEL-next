import { AnalyticsConfig, AnalyticsPayload, EventType } from '../types/analytics.types';

import { createRequest, track } from './analytics.utils';

const SITE = 'gel.westpacgroup.com.au';

const ANALYTICS_CONFIG: AnalyticsConfig = {
  encryptedID: '',
  journeyType: 'pub',
  loginStatus: 'logged out',
  pageStatus: 'pub',
  siteBrand: 'wbc',
  siteDomain: SITE,
  siteEnv: 'test',
  siteVersion: '4.0',
  siteName: 'gel',
  trackOnce: true,
};

export const sendToAnalytics = (event: EventType, analyticsPayload?: AnalyticsPayload) => {
  const host = window?.location?.hostname;
  const path = window?.location?.pathname;
  if (host.includes('vercel.app') || path.startsWith('/keystatic')) {
    // We don't want to track PR builds or CMS edits
    return;
  }
  const siteEnv = host === SITE ? 'prod' : 'test';
  const request = createRequest({ ...ANALYTICS_CONFIG, ...{ siteEnv: siteEnv } }, analyticsPayload);
  track(event, request);
};
