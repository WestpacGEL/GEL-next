import { Metadata } from 'next';

import KeystaticApp from './keystatic';

export const metadata: Metadata = {
  title: 'Admin UI',
};

export default function RootLayout() {
  return <KeystaticApp />;
}
