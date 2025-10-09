import { clsx } from 'clsx';
import { ReactNode } from 'react';

export function CustomHeading({
  children,
  tag: Tag = 'h1',
  groupHeading,
  leadText,
  beforeContent,
}: {
  beforeContent?: ReactNode;
  children: ReactNode;
  groupHeading?: ReactNode;
  leadText?: ReactNode;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}) {
  return (
    <div
      className={clsx('', {
        'max-md:py-8 py-9': Tag === 'h1',
        'max-md:pb-4 pt-2 pb-5': Tag === 'h2',
        'pt-0 pb-5': Tag === 'h3' || Tag === 'h4' || Tag === 'h5' || Tag === 'h6',
      })}
    >
      {beforeContent}
      {groupHeading && (
        <h3 className=" typography-body-10 pb-1 text-[11px] font-medium uppercase text-muted md:hidden">
          {groupHeading}
        </h3>
      )}
      <Tag
        className={clsx('font-bold text-heading', {
          'max-md:typography-body-6 typography-body-5': Tag === 'h1',
          'max-md:typography-body-7 typography-body-6': Tag === 'h2',
          'max-md:typography-body-8 typography-body-7': Tag === 'h3',
          'typography-body-8 max-md:typography-body-9': Tag === 'h4' || Tag === 'h5' || Tag === 'h6',
        })}
      >
        {children}
      </Tag>
      {leadText && (
        <p
          className={clsx('typography-body-9 text-heading', {
            'max-md:pt-3 pt-4': Tag === 'h1' || Tag === 'h2',
            'pt-2': Tag === 'h3',
            'max-md:pt-1 pt-2': Tag === 'h4' || Tag === 'h5' || Tag === 'h6',
          })}
        >
          {leadText}
        </p>
      )}
    </div>
  );
}
