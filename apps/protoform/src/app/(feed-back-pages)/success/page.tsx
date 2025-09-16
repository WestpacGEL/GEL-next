'use client';

import { Button } from '@westpac/ui';
import { CustomHeading } from '@/components/custom-heading/custom-heading';
import { TickCircleIcon } from '@westpac/ui/icon';

export default function SuccessPage() {
  return (
    <div>
      <CustomHeading
        leadText="Lorem ipsum dolor sit amet consectetur, adipisicing elit, sed to eiusmod tempor"
        beforeContent={
          <span className="mb-3 block">
            <TickCircleIcon size="xlarge" color="success" />
          </span>
        }
      >
        Proof of rental income receibed
      </CustomHeading>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis provident dolore magni aliquid officia dolor
        reprehenderit. Provident maxime aspernatur, eum dolorem molestias reprehenderit corporis laudantium saepe sint
        culpa, illum ut!
      </p>
      <div className="flex flex-col xsl:flex-row gap-2 mt-5">
        <Button size="large" look="primary">
          Next
        </Button>
        <Button size="large" look="link">
          Cancel
        </Button>
      </div>
    </div>
  );
}
