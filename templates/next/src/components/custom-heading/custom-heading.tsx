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
        <h3 className="pb-1 typography-body-10 text-[11px] font-medium text-text-muted uppercase md:hidden">
          {groupHeading}
        </h3>
      )}
      <h1 className="typography-body-5 font-bold text-text-heading max-md:typography-body-6">{children}</h1>
      {leadText && <LeadText>{leadText}</LeadText>}
      {afterContent}
    </div>
  );
}
