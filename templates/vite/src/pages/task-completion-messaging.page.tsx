'use client';

import { Button } from '@westpac/ui';
import { TickCircleIcon } from '@westpac/ui/icon';
import { Link } from 'react-router';

import { CustomHeading } from '@/components/custom-heading/custom-heading';
import NoSidebarsLayout from '@/layouts/no-sidebar.layout';

export function TaskCompletionMessagingPage() {
  return (
    <NoSidebarsLayout>
      <CustomHeading
        beforeContent={
          <span className="mb-3 block">
            <TickCircleIcon size="xlarge" color="success" />
          </span>
        }
      >
        Card activated
      </CustomHeading>
      <p>Your new card is good to go. You can now set or change your pin.</p>
      <div className="mt-5 flex flex-col gap-2 xsl:flex-row">
        <Link to="/">
          <Button size="large" look="primary">
            Set PIN
          </Button>
        </Link>
        <Link to="/">
          <Button size="large" look="link">
            Not now
          </Button>
        </Link>
      </div>
    </NoSidebarsLayout>
  );
}
