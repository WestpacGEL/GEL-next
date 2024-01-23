import './styles/globals.css';
import { type Metadata } from 'next';
import { draftMode } from 'next/headers';
import React, { Suspense } from 'react';

import { FontPreloader } from '@/components/font-preloader';
import { ThemeProvider } from '@/components/theme';

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
      <body>
        {/*We need to move theme to a cookie based approach for performance*/}
        <Suspense>
          <ThemeProvider>{children}</ThemeProvider>
        </Suspense>
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
