'use client';

import { Button, List, ListItem } from '@westpac/ui';
import { TickCircleIcon } from '@westpac/ui/icon';
import Link from 'next/link';

import { CustomHeading } from '@/components/custom-heading/custom-heading';

export default function SuccessPage() {
  return (
    <div>
      <CustomHeading
        leadText="Reference number: 1234 56789"
        beforeContent={
          <span className="mb-3 block">
            <TickCircleIcon size="xlarge" color="success" />
          </span>
        }
      >
        Your application has been conditionally approved
      </CustomHeading>
      <div className="mb-5 flex flex-col gap-3">
        <p className="typography-body-9">Thanks for your application.</p>
        <p className="typography-body-9">
          Will be in touch within the next two business days to clarify a few things and discuss next steps.
        </p>
      </div>
      <h3 className="typography-body-7 mb-5 font-bold text-heading">What happens next:</h3>
      <List className="flex flex-col gap-1" type="bullet" look="primary">
        <ListItem className="typography-body-9">
          We’ve emailed you@email.com to confirm our receipt of your details
        </ListItem>
        <ListItem className="typography-body-9">
          Within 1 business day (in most cases) you’ll receive a decision on your application
        </ListItem>
        <ListItem className="typography-body-9">
          If it’s successful, we’ll provide sign-in instructions for Westpac OnlinePay
        </ListItem>
      </List>
      <Link href="/" passHref legacyBehavior>
        <Button tag="a" look="primary" size="large" block={{ initial: true, xsl: false }} className="mt-5">
          Return home
        </Button>
      </Link>
    </div>
  );
}
