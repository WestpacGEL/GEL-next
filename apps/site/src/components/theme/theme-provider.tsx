'use client';

import { useSearchParams } from 'next/navigation';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand') ?? 'wbc';

  return <div data-theme={brand?.toLowerCase()}>{children}</div>;
}
