'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { Suspense, useEffect } from 'react';

import { sendToAnalytics } from '@/utils/send-to-analytics';

import { type AnalyticsProps } from './analytics.types';

function TrackPageNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    sendToAnalytics('page');
  }, [pathname, searchParams]);

  return <></>;
}

export function Analytics({ analyticsAppMeasurement, scriptSrc }: AnalyticsProps) {
  return (
    <>
      <Script id="analytics-appmeasurement">{`window.__adobe_analytics_app_measurement="${analyticsAppMeasurement}"`}</Script>
      <Script id="analytics-script" src={scriptSrc} strategy="afterInteractive" />
      <Suspense>
        <TrackPageNavigation />
      </Suspense>
    </>
  );
}
