'use client';

import { List, ListItem, Link as GELLink } from '@westpac/ui';
import { Link } from 'react-router';

import { ContentWrapper } from '@/components/content-wrapper/content-wrapper';
import { CustomFooter } from '@/components/custom-footer/custom-footer';
import { CustomHeader } from '@/components/custom-header/custom-header';
import { CustomHeading } from '@/components/custom-heading/custom-heading';
import { LeadText } from '@/components/lead-text/lead-text.component';

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
                <Link to="/credit-cards?flatten=true">
                  <GELLink className="typography-body-9">Default progress rope</GELLink>
                </Link>
                <p className="typography-body-9 text-text-muted">
                  Use the default progress rope for forms with up to around eight pages. It shows customers how many
                  steps they are and give them a sense of the information required.
                </p>
              </ListItem>

              <ListItem className="flex flex-col gap-1">
                <Link to="/credit-cards">
                  <GELLink className="typography-body-9">Grouped progress rope</GELLink>
                </Link>
                <p className="typography-body-9 text-text-muted">
                  For complex forms with more than eight pages, use the Grouped progress rope. In this version pages are
                  collapsed under categories so customers aren't overwhelmed when they first arrive at the from.
                </p>
              </ListItem>

              <ListItem className="flex flex-col gap-1">
                <Link to="/no-progress-rope">
                  <GELLink className="typography-body-9">No progress rope</GELLink>
                </Link>
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
              <Link to="/personal-customer">
                <ListItem className="flex flex-col gap-1 typography-body-9">Personal customer</ListItem>
              </Link>
              <Link to="/business-customer">
                <ListItem className="flex flex-col gap-1 typography-body-9">Business customer</ListItem>
              </Link>
              <Link to="/extra-care-customer">
                <ListItem className="flex flex-col gap-1 typography-body-9">
                  Extra-care customer (Staff facing only)
                </ListItem>
              </Link>
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
              <Link to="/error">
                <ListItem className="flex flex-col gap-1 typography-body-9">Error messaging page</ListItem>
              </Link>
              <Link to="/success">
                <ListItem className="flex flex-col gap-1 typography-body-9">Success messaging page</ListItem>
              </Link>
              <Link to="/task-completion-messaging">
                <ListItem className="flex flex-col gap-1 typography-body-9">Task completion messaging page</ListItem>
              </Link>
            </List>
          </div>
        </div>
      </ContentWrapper>
      <CustomFooter />
    </>
  );
}
