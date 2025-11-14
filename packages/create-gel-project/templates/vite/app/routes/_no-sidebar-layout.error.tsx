'use client';

import { Button, Link as LinkGELUI } from '@westpac/ui';
import { ErrorIcon } from '@westpac/ui/icon';
import { Link } from 'react-router';

import { CustomHeading } from '@/components/custom-heading/custom-heading';
import { LeadText } from '@/components/lead-text/lead-text.component';

export default function ErrorPage() {
  return (
    <>
      <CustomHeading
        groupHeading="Get started"
        afterContent={
          <>
            <LeadText>We’re experiencing technical difficulties.</LeadText>
            <LeadText>Please try again later.</LeadText>
          </>
        }
        beforeContent={
          <span className="mb-3 block">
            <ErrorIcon color="heading" look="outlined" size="xlarge" />
          </span>
        }
      >
        We’re having technical issues
      </CustomHeading>
      <p className="typography-body-9">
        If this issue continues, call us on{' '}
        <LinkGELUI type="inline" href="tel:132032">
          132 032
        </LinkGELUI>{' '}
        for assistance.
      </p>

      <Link to="/">
        <Button tag="button" look="primary" size="large" block={{ initial: true, xsl: false }} className="mt-5">
          Go to page
        </Button>
      </Link>
    </>
  );
}
