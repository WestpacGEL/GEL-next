import { ReactNode } from 'react';

import { Layout } from '../components/layout/layout';

export default function HomePage() {
  return <></>;
}

HomePage.getLayout = function getLayout(page: ReactNode, brand: string) {
  return <Layout brand={brand}>{page}</Layout>;
};
