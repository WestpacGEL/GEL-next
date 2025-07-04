'use client';

import { List, ListItem } from '@westpac/ui';
import Link from 'next/link';
import { useEffect } from 'react';

import { CustomHeading } from '@/components/custom-heading/custom-heading';
import { RopeDataSetter } from '@/components/rope-data-setter/rope-data-setter';
import { useSidebar } from '@/components/sidebar/context';

export default function Home() {
  const { open, setOpen } = useSidebar();
  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [open, setOpen]);
  return (
    <section>
      <RopeDataSetter data={undefined} />
      <CustomHeading tag="h1">Protoform</CustomHeading>
      <List type="link">
        <Link href="/credit-cards" passHref legacyBehavior>
          <ListItem>Credit Cards</ListItem>
        </Link>
      </List>
    </section>
  );
}
