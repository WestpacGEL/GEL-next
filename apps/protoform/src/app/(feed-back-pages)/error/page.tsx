'use client';

import { Button } from '@westpac/ui';
import { CustomHeading } from '@/components/custom-heading/custom-heading';
import { ErrorIcon } from '@westpac/ui/icon';

export default function ErrorPage() {
  return (
    <div>
      <CustomHeading
        groupHeading="Get started"
        leadText="We’re experiencing technical difficulties. Please try again later."
        beforeContent={
          <span className="mb-3 block">
            <ErrorIcon look="outlined" size="xlarge" />
          </span>
        }
      >
        Sorry - We’re having technical issues
      </CustomHeading>
      <p>{'<If this issue continues, call us on 132032 for assistance.>'}</p>
      <div className="flex flex-col xsl:flex-row gap-2 mt-5">
        <Button look="primary" size="large">
          Go to page
        </Button>
        <Button look="link" size="large">
          Cancel
        </Button>
      </div>
    </div>
  );
}
