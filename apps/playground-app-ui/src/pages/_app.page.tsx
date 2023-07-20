import '../styles/globals.css';
import NextApp, { AppContext, type AppProps } from 'next/app';

import { Layout } from '../components/layout/layout';

const brandsList = ['bom', 'bsa', 'stg', 'wbc', 'wbg', 'rams'] as const;

type PlaygroundAppProps = AppProps & { brand: (typeof brandsList)[number] };

export default function PlaygroundApp({ Component, pageProps, brand }: PlaygroundAppProps) {
  return (
    <Layout brand={brand}>
      <Component {...pageProps} />
    </Layout>
  );
}

PlaygroundApp.getInitialProps = async (appContext: AppContext) => {
  const ctx = await NextApp.getInitialProps(appContext);
  const brandParam = appContext.ctx.query?.brand || '';
  const brand = brandsList.find(b => b.toLowerCase() === brandParam) || 'wbc';
  return { ...ctx, brand };
};
