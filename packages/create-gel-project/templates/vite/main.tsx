import './global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
console.log('PASSING HERE??');

import { App } from './app';

async function enableMocking() {
  // TODO: uncomment this line
  // if (process.env.NODE_ENV !== 'development') {
  //   return
  // }
  const { worker } = await import('./mocks/browser');
  return worker.start();
}

const container = document.querySelector('#root');
enableMocking()
  .then(async () => {
    if (!container) return;

    const { default: routes } = await import('./routes'); // <-- new
    const router = createBrowserRouter(routes);

    const root = createRoot(container);
    root.render(
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
    );
  })
  .catch(error => {
    throw new Error(`Failed to enable mocking: ${error}`);
  });
