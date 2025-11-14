'use client';

import { Button, Link as LinkGELUI } from '@westpac/ui';
import { ErrorIcon } from '@westpac/ui/icon';
import Link from 'next/link';

import { CustomHeading } from '@/components/custom-heading/custom-heading';

export default function ErrorPage() {
  return (
    <div>
      <CustomHeading
        groupHeading="Get started"
        leadText={
          <>
            <p>We’re experiencing technical difficulties.</p>
            <p>Please try again later.</p>
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

      <Link href="/" passHref legacyBehavior>
        <Button tag="a" look="primary" size="large" block={{ initial: true, xsl: false }} className="mt-5">
          Go to page
        </Button>
      </Link>
    </div>
  );
}
