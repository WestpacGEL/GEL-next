import { ReactNode } from 'react';

import { LeadText } from '../lead-text/lead-text.component';

export function CustomHeading({
  children,
  groupHeading,
  leadText,
  beforeContent,
  afterContent,
}: {
  afterContent?: ReactNode;
  beforeContent?: ReactNode;
  children: ReactNode;
  groupHeading?: ReactNode;
  leadText?: ReactNode;
}) {
  return (
    <div className="pb-9">
      {beforeContent}
      {groupHeading && (
        <h3 className=" typography-body-10 text-text-muted pb-1 text-[11px] font-medium uppercase md:hidden">
          {groupHeading}
        </h3>
      )}
      <h1 className="text-text-heading max-md:typography-body-6 typography-body-5 font-bold">{children}</h1>
      {leadText && <LeadText>{leadText}</LeadText>}
      {afterContent}
    </div>
  );
}
