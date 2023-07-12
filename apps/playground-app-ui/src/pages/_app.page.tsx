import '../styles/globals.css';

import NextApp, { AppContext, type AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

App.getInitialProps = async (appContext: AppContext) => {
  const ctx = await NextApp.getInitialProps(appContext);
  const brandParam = appContext.ctx.query?.brand || '';
  const brandsList = ['bom', 'bsa', 'stg', 'wbc', 'wbg', 'rams'];
  const brand = brandsList.find(b => b.toLowerCase() === brandParam) || 'wbc';
  return { ...ctx, brand };
};
