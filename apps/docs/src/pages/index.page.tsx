import Link from 'next/link';
import { ReactNode } from 'react';

import { Layout } from '../components/layout/layout';
import { DEFAULT_NAV_ITEMS } from '../components/layout/navItems';

export default function HomePage() {
  return (
    <>
      <ul>
        {DEFAULT_NAV_ITEMS.map(({ href, label }) => (
          <li key={href}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactNode, brand: string) {
  return <Layout brand={brand}>{page}</Layout>;
};
