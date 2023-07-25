import Link from 'next/link';

function Home() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/button">Button</Link>
      </li>
      <li>
        <Link href="/typography">Typography</Link>
      </li>
      <li>
        <Link href="/colors">Colors</Link>
      </li>
      <li>
        <Link href="/alerts">Alert</Link>
      </li>
    </ul>
  );
}

export default Home;
