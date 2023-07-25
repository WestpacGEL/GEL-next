import Link from 'next/link';

import { DEFAULT_NAV_ITEMS } from '../components/layout/navItems';

function Home() {
  return (
    <ul>
      {DEFAULT_NAV_ITEMS.map(({ href, label }) => (
        <li key={href}>
          <Link href={href}>{label}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Home;
