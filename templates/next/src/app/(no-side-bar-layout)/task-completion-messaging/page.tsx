'use client';

import { Button } from '@westpac/ui';
import { TickCircleIcon } from '@westpac/ui/icon';
import Link from 'next/link';

import { CustomHeading } from '@/components/custom-heading/custom-heading';

export default function TaskCompletionMessagingPage() {
  return (
    <div>
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
        <Link href="/" passHref legacyBehavior>
          <Button size="large" look="primary">
            Set PIN
          </Button>
        </Link>
        <Link href="/" passHref legacyBehavior>
          <Button size="large" look="link">
            Not now
          </Button>
        </Link>
      </div>
    </div>
  );
}
