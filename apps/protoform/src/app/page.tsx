import { List, ListItem } from '@westpac/ui';
import Link from 'next/link';

import { CustomHeading } from '@/components/custom-heading/custom-heading';

export default function Home() {
  return (
    <section>
      <CustomHeading tag="h1">Protoform</CustomHeading>
      <List type="link">
        <Link href="/credit-cards" passHref legacyBehavior>
          <ListItem>Credit Cards</ListItem>
        </Link>
      </List>
    </section>
  );
}
