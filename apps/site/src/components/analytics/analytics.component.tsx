'use client';

import Script from 'next/script';
import React from 'react';

import { type AnalyticsProps } from './analytics.types';

export function Analytics({ analyticsAppMeasurement, scriptSrc }: AnalyticsProps) {
  return (
    <>
      <Script id="analytics-appmeasurement">{`window.__adobe_anayltics_appmeasurement="${analyticsAppMeasurement}"`}</Script>
      <Script id="analytics-script" src={scriptSrc} strategy="afterInteractive" />
    </>
  );
}
