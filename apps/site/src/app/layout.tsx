import './styles/globals.css';
import { type Metadata } from 'next';
import { draftMode } from 'next/headers';
import React from 'react';

import { Analytics } from '@/components/analytics';
import { FontPreloader } from '@/components/font-preloader';

export const metadata: Metadata = {
  title: {
    template: '%s · GEL Design System',
    default: 'GEL Design System',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = draftMode();
  return (
    <html lang="en" className="scroll-smooth">
      <FontPreloader />
      <meta name="google-site-verification" content="OqpMflvRwQAgK3Lbvov6fs-G37wjQy1hqAH7ECgCW7M" />
      <body>
        {children}
        {isEnabled && (
          <div className="absolute top-3 right-15 z-[999]">
            <form method="post" action="/preview/end">
              <button className="text-text-mono">End preview</button>
            </form>
          </div>
        )}
        <Analytics
          analyticsAppMeasurement={process.env.NEXT_PUBLIC_ANALYTICS_APP_MEASUREMENT || ''}
          scriptSrc={process.env.NEXT_PUBLIC_ANALYTICS_SCRIPT_SRC || ''}
        />
      </body>
    </html>
  );
}
