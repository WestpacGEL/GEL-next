'use client';

import { List, ListItem } from '@westpac/ui';
import Link from 'next/link';

import { CustomHeading } from '@/components/custom-heading/custom-heading';
import { CustomHeader } from '@/components/custom-header/custom-header';
import { ContentWrapper } from '@/components/content-wrapper/content-wrapper';
import { CustomFooter } from '@/components/custom-footer/custom-footer';
import { useSidebar } from '@/components/sidebar/context';

export default function Home() {
  return (
    <>
      <CustomHeader />
      <ContentWrapper>
        <CustomHeading tag="h1">Protoform</CustomHeading>
        <List type="link">
          <Link href="/credit-cards" passHref legacyBehavior>
            <ListItem>Credit Cards</ListItem>
          </Link>
          <Link href="/credit-cards?flatten=true" passHref legacyBehavior>
            <ListItem>Credit Cards: Progress rope flatten</ListItem>
          </Link>
          <Link href="/success" passHref legacyBehavior>
            <ListItem>Success page</ListItem>
          </Link>
          <Link href="/error" passHref legacyBehavior>
            <ListItem>Error page</ListItem>
          </Link>
          <Link href="/company-individual-name" passHref legacyBehavior>
            <ListItem>Company Individual page</ListItem>
          </Link>
        </List>
      </ContentWrapper>
      <CustomFooter />
    </>
  );
}
