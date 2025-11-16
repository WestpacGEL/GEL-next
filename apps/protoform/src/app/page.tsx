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
          leadText={
            <>
              <p className="mb-3">
                The GEL Forms Framework provides a simple, scalable approach for collecting customer information. It
                includes standardised form validation and offers different navigational options depending on the form’s
                length and complexity.
              </p>
              <p>
                See examples below <i>(the content in these examples is for UI demonstration purposed only)</i>:
              </p>
            </>
          }
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
                  Use the default progress rope for forms with up to around eight pages. It shows customers how many
                  steps they are and give them a sense of the information required.
                </p>
              </ListItem>

              <ListItem className="flex flex-col gap-1">
                <Link href="/credit-cards" passHref legacyBehavior>
                  <GELLink className="typography-body-9">Grouped progress rope</GELLink>
                </Link>
                <p className="typography-body-9 text-muted">
                  For complex forms with more than eight pages, use the Grouped progress rope. In this version pages are
                  collapsed under categories so customers aren't overwhelmed when they first arrive at the from.
                </p>
              </ListItem>

              <ListItem className="flex flex-col gap-1">
                <Link href="/no-progress-rope" passHref legacyBehavior>
                  <GELLink className="typography-body-9">No progress rope</GELLink>
                </Link>
                <p className="typography-body-9 text-muted">
                  For very simple forms with just one or two pages, a progress rope isn't needed.
                </p>
              </ListItem>
            </List>
          </div>
          <div>
            <h3 className="typography-body-7 mb-5 font-bold text-heading xl:typography-body-6">
              Profile indicator examples
            </h3>
            <p className="typography-body-9 mb-5 text-text">
              When customers have multiple profiles (such as business and personal), indicators at the top of the form
              clearly show which profile they are working in. The Extra-care indicator is used only for staff facing
              processes.
            </p>
            <List type="link" className="flex flex-col gap-1">
              <Link href="/personal-customer" passHref legacyBehavior>
                <ListItem className="typography-body-9 flex flex-col gap-1">Personal customer</ListItem>
              </Link>
              <Link href="/business-customer" passHref legacyBehavior>
                <ListItem className="typography-body-9 flex flex-col gap-1">Business customer</ListItem>
              </Link>
              <Link href="/extra-care-customer" passHref legacyBehavior>
                <ListItem className="typography-body-9 flex flex-col gap-1">
                  Extra-care customer (Staff facing only)
                </ListItem>
              </Link>
            </List>
          </div>
          <div>
            <h3 className="typography-body-7 mb-5 font-bold text-heading xl:typography-body-6">
              Messaging page examples
            </h3>
            <List type="link" className="flex flex-col gap-1">
              <Link href="/error" passHref legacyBehavior>
                <ListItem className="typography-body-9 flex flex-col gap-1">Error messaging page</ListItem>
              </Link>
              <Link href="/success" passHref legacyBehavior>
                <ListItem className="typography-body-9 flex flex-col gap-1">Success messaging page</ListItem>
              </Link>
              <Link href="/task-completion-messaging" passHref legacyBehavior>
                <ListItem className="typography-body-9 flex flex-col gap-1">Task completion messaging page</ListItem>
              </Link>
            </List>
          </div>
        </div>
      </ContentWrapper>
      <CustomFooter />
    </>
  );
}
