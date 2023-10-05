'use client';

import { List } from '@westpac/ui';

import { ArrowDownRightIcon } from '@/components/icons';

export function TableOfContents() {
  return (
    <nav>
      <h2 className="typography-body-9 border-b border-border pb-2 font-medium">Page content</h2>
      <List icon={ArrowDownRightIcon} type="icon" look="primary" className="mt-3 [&_li]:my-[0.5625rem]">
        <List.Item>
          <Link href="#alert-boxes">Alert boxes</Link>
        </List.Item>
        <List.Item>
          <Link href="#alert-text">Alert text</Link>
        </List.Item>
        <List.Item>
          <Link href="#user-experience">User experience</Link>
        </List.Item>
        <List.Item>
          <Link href="#visual-design">Visual design</Link>
        </List.Item>
        <List.Item>
          <Link href="#dos-and-donts">Do&apos;s and don&apos;ts</Link>
        </List.Item>
      </List>
    </nav>
  );
}

function Link({ href, children }: { children?: React.ReactNode; href?: string }) {
  return (
    <a href={href} className="hover:underline">
      {children}
    </a>
  );
}
