import './styles/globals.css';
import { type Metadata } from 'next';

import { StickyFooter } from '@/components/sticky-footer';
import { ThemeProvider } from '@/components/theme';

export const metadata: Metadata = {
  title: {
    template: '%s · GEL Design System',
    default: 'GEL Design System',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <StickyFooter />
      </body>
    </html>
  );
}
