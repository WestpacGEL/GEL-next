import { ReactNode } from 'react';

export function CustomHeading({
  children,
  tag: Tag = 'h1',
  groupHeading,
  leadText,
}: {
  children: ReactNode;
  groupHeading?: string;
  leadText?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}) {
  const getStyle = () => {
    switch (Tag) {
      case 'h1':
        return 'max-sm:typography-body-6 max-sm:py-8 py-9 typography-body-5 font-bold text-heading';
      case 'h2':
        return 'max-sm:typography-body-7 max-sm:pb-4 pb-5 pt-2 typography-body-6 font-bold text-heading';
      case 'h3':
        return 'max-sm:typography-body-8 pb-5 typography-body-7 font-bold text-heading';
      default:
        return 'max-sm:typography-body-9 pb-5 typography-body-8 font-bold text-heading';
    }
  };
  return (
    <>
      <h3 className="font-bold text-['11px']">{groupHeading}</h3>
      <Tag className={getStyle()}>{children}</Tag>
      <p className="typography-body-9 text-text">{leadText}</p>
    </>
  );
}
