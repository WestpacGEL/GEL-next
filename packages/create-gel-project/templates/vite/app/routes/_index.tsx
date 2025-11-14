'use client';

import { List, ListItem } from '@westpac/ui';

import { ContentWrapper } from '@/components/content-wrapper/content-wrapper';
import { CustomFooter } from '@/components/custom-footer/custom-footer';
import { CustomHeader } from '@/components/custom-header/custom-header';
import { CustomHeading } from '@/components/custom-heading/custom-heading';
import { LeadText } from '@/components/lead-text/lead-text.component';
import { RoutingLink } from '@/components/routing-link/routing-link.component';
import { RoutingListItem } from '@/components/routing-list-item/routing-list-item.component';

export default function Home() {
  return (
    <>
      <CustomHeader />
      <ContentWrapper>
        <CustomHeading
          afterContent={
            <>
              <LeadText className="mb-3">
                The GEL Forms Framework provides a simple, scalable approach for collecting customer information. It
                includes standardised form validation and offers different navigational options depending on the form’s
                length and complexity.
              </LeadText>
              <LeadText>
                See examples below <i>(the content in these examples is for UI demonstration purposed only)</i>:
              </LeadText>
            </>
          }
        >
          GEL forms framework
        </CustomHeading>

        <div className="flex flex-col gap-5">
          <div>
            <h3
              className={`
                mb-5 typography-body-7 font-bold text-text-heading
                xl:typography-body-6
              `}
            >
              Navigation options
            </h3>
            <List type="unstyled" className="flex flex-col gap-3">
              <ListItem className="flex flex-col gap-1">
                <RoutingLink to="/credit-cards?flatten=true">Default progress rope</RoutingLink>
                <p className="typography-body-9 text-text-muted">
                  Use the default progress rope for forms with up to around eight pages. It shows customers how many
                  steps they are and give them a sense of the information required.
                </p>
              </ListItem>

              <ListItem className="flex flex-col gap-1">
                <RoutingLink to="/credit-cards">Grouped progress rope</RoutingLink>
                <p className="typography-body-9 text-text-muted">
                  For complex forms with more than eight pages, use the Grouped progress rope. In this version pages are
                  collapsed under categories so customers aren't overwhelmed when they first arrive at the from.
                </p>
              </ListItem>

              <ListItem className="flex flex-col gap-1">
                <RoutingLink to="/no-progress-rope">No progress rope</RoutingLink>
                <p className="typography-body-9 text-text-muted">
                  For very simple forms with just one or two pages, a progress rope isn't needed.
                </p>
              </ListItem>
            </List>
          </div>
          <div>
            <h3
              className={`
                mb-5 typography-body-7 font-bold text-text-heading
                xl:typography-body-6
              `}
            >
              Profile indicator examples
            </h3>
            <p className="mb-5 typography-body-9 text-text-body">
              When customers have multiple profiles (such as business and personal), indicators at the top of the form
              clearly show which profile they are working in. The Extra-care indicator is used only for staff facing
              processes.
            </p>
            <List type="link" className="flex flex-col gap-1">
              <RoutingListItem className="flex flex-col gap-1 typography-body-9" to="/personal-customer">
                Personal customer
              </RoutingListItem>
              <RoutingListItem className="flex flex-col gap-1 typography-body-9" to="/business-customer">
                Business customer
              </RoutingListItem>
              <RoutingListItem className="flex flex-col gap-1 typography-body-9" to="/extra-care-customer">
                Extra-care customer (Staff facing only)
              </RoutingListItem>
            </List>
          </div>
          <div>
            <h3
              className={`
                mb-5 typography-body-7 font-bold text-text-heading
                xl:typography-body-6
              `}
            >
              Messaging page examples
            </h3>
            <List type="link" className="flex flex-col gap-1">
              <RoutingListItem className="flex flex-col gap-1 typography-body-9" to="/error">
                Error messaging page
              </RoutingListItem>
              <RoutingListItem className="flex flex-col gap-1 typography-body-9" to="/success">
                Success messaging page
              </RoutingListItem>
              <RoutingListItem className="flex flex-col gap-1 typography-body-9" to="/task-completion-messaging">
                Task completion messaging page
              </RoutingListItem>
            </List>
          </div>
        </div>
      </ContentWrapper>
      <CustomFooter />
    </>
  );
}
