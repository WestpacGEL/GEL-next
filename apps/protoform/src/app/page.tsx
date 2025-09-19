'use client';

import { List, ListItem, Link as GELLink } from '@westpac/ui';
import Link from 'next/link';

import { ContentWrapper } from '@/components/content-wrapper/content-wrapper';
import { CustomFooter } from '@/components/custom-footer/custom-footer';
import { CustomHeader } from '@/components/custom-header/custom-header';
import { CustomHeading } from '@/components/custom-heading/custom-heading';

export default function Home() {
  return (
    <>
      <CustomHeader />
      <ContentWrapper>
        <CustomHeading
          tag="h1"
          leadText="The GEL Design System form pattern framework has been designed to create a simple, scalable approach for collecting customer information. It includes standardised form validation and various navigational options based on the length and complexity of the form. 
See examples below (the content in these examples is for UI demonstration purposed only):"
        >
          GEL forms framework
        </CustomHeading>

        <div className="flex flex-col gap-5">
          <div>
            <h3 className="typography-body-7 mb-5 font-bold text-heading xl:typography-body-6">Navigation options</h3>
            <List type="unstyled" className="flex flex-col gap-3">
              <ListItem className="flex flex-col gap-1">
                <Link href="/credit-cards?flatten=true" passHref legacyBehavior>
                  <GELLink className="typography-body-9">Default progress rope</GELLink>
                </Link>
                <p className="typography-body-9 text-muted">
                  Use the Default progress rope for forms with up to approximately eight pages, the page items listed
                  within the rope inform the customer how many steps there are and provide an idea of the sort of
                  information they will be asked.
                </p>
              </ListItem>

              <ListItem className="flex flex-col gap-1">
                <Link href="/credit-cards" passHref legacyBehavior>
                  <GELLink className="typography-body-9">Grouped progress rope</GELLink>
                </Link>
                <p className="typography-body-9 text-muted">
                  Use the Grouped progress rope for complex forms with more than eight pages. The page items collapse
                  under categories within the rope, so as not to overwhelm the customer as soon as they arrive on the
                  page.
                </p>
              </ListItem>

              <ListItem className="flex flex-col gap-1">
                <Link href="/no-progress-rope" passHref legacyBehavior>
                  <GELLink className="typography-body-9">No progress rope</GELLink>
                </Link>
                <p className="typography-body-9 text-muted">
                  If you have a very simple one or two page form, you do not need to use a Progress rope at all.
                </p>
              </ListItem>
            </List>
          </div>
          <div>
            <h3 className="typography-body-7 mb-5 font-bold text-heading xl:typography-body-6">
              Profile indicator examples
            </h3>
            <List type="link" className="flex flex-col gap-1">
              <Link href="/personal-customer" passHref legacyBehavior>
                <ListItem className="flex flex-col gap-1">Personal customer</ListItem>
              </Link>
              <Link href="/business-customer" passHref legacyBehavior>
                <ListItem className="flex flex-col gap-1">Business customer</ListItem>
              </Link>
              <Link href="/extra-care-customer" passHref legacyBehavior>
                <ListItem className="flex flex-col gap-1">Extra-care customer (Staff facing only)</ListItem>
              </Link>
            </List>
          </div>
          <div>
            <h3 className="typography-body-7 mb-5 font-bold text-heading xl:typography-body-6">
              Messaging page examples
            </h3>
            <List type="link" className="flex flex-col gap-1">
              <Link href="/error" passHref legacyBehavior>
                <ListItem className="flex flex-col gap-1">Error messaging page</ListItem>
              </Link>
              <Link href="/success" passHref legacyBehavior>
                <ListItem className="flex flex-col gap-1">Success messaging page</ListItem>
              </Link>
              <Link href="/task-completion-messaging" passHref legacyBehavior>
                <ListItem className="flex flex-col gap-1">Task completion messaging page</ListItem>
              </Link>
            </List>
          </div>
        </div>
      </ContentWrapper>
      <CustomFooter />
    </>
  );
}
