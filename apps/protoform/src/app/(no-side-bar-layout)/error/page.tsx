'use client';

import { Button, Link as LinkGELUI } from '@westpac/ui';
import { ErrorIcon } from '@westpac/ui/icon';
import NextLink from 'next/link';

import { CustomHeading } from '@/components/custom-heading/custom-heading';

export default function ErrorPage() {
  return (
    <div>
      <CustomHeading
        groupHeading="Get started"
        leadText={
          <>
            We’re experiencing technical difficulties.
            <br />
            Please try again later.
          </>
        }
        beforeContent={
          <span className="mb-3 block md:mb-4">
            <ErrorIcon color="hero" look="outlined" size="xlarge" />
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

      <Button
        tag={NextLink}
        href="/"
        look="primary"
        size="large"
        block={{ initial: true, xsl: false }}
        className="mt-5"
      >
        Go to page
      </Button>
    </div>
  );
}
