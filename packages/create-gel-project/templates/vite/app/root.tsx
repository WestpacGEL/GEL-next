import { Outlet, ScrollRestoration, Scripts, Meta, Links } from 'react-router';
import '../global.css';

export default function Root() {
  return (
    <html lang="en" data-brand="wbc">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Vitamin" />
        <meta name="theme-color" content="#BD34FE" />
        <Meta />
        <Links />
        <title>Protoform</title>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <main
          className={`
            m-auto flex min-h-screen max-w-[1923px] flex-col overscroll-y-none
            border border-y-0 border-border-muted-soft
          `}
        >
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </main>
      </body>
    </html>
  );
}
