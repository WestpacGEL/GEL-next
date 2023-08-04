import Link from 'next/link';
import { ReactNode } from 'react';

import { Layout } from '../components/layout/layout';
import { DEFAULT_NAV_ITEMS } from '../components/layout/nav-items';

export default function HomePage() {
  return <></>;
}

HomePage.getLayout = function getLayout(page: ReactNode, brand: string) {
  return <Layout brand={brand}>{page}</Layout>;
};
