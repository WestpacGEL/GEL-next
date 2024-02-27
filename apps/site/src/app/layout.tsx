import './styles/globals.css';
import { type Metadata } from 'next';
import { draftMode } from 'next/headers';
import React from 'react';

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
    <html lang="en">
      <FontPreloader />
      <meta name="google-site-verification" content="OqpMflvRwQAgK3Lbvov6fs-G37wjQy1hqAH7ECgCW7M" />
      <body>
        {children}
        {isEnabled && (
          <div className="absolute right-15 top-3 z-[999]">
            <form method="post" action="/preview/end">
              <button className="text-white">End preview</button>
            </form>
          </div>
        )}
      </body>
    </html>
  );
}
