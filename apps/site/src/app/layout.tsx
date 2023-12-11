import './styles/globals.css';
import { type Metadata } from 'next';
import { cookies, draftMode } from 'next/headers';

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
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        {isEnabled && (
          <div>
            Draft mode ({cookies().get('ks-branch')?.value}){' '}
            <form method="POST" action="/preview/end">
              <button>End preview</button>
            </form>
          </div>
        )}
      </body>
    </html>
  );
}
