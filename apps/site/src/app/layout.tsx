import './styles/globals.css';

import { StickyFooter } from '@/components/sticky-footer';
import { ThemeProvider } from '@/components/theme';

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
