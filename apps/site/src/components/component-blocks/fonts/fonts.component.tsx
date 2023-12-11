'use client';

import { useBrand } from '@/app/design-system/hooks/use-brand';
import { ComponentTitle } from '@/components/document-renderer/component-title';

const FONTS_PER_BRAND = {
  bom: [
    {
      fontWeight: 'Light',
      className: 'font-light',
    },
    {
      fontWeight: 'Regular',
      className: 'font-regular',
    },
    {
      fontWeight: 'Bold',
      className: 'font-bold',
    },
  ],
  bsa: [
    {
      fontWeight: 'Light',
      className: 'font-light',
    },
    {
      fontWeight: 'Bold',
      className: 'font-bold',
    },
  ],
  rams: [
    {
      fontWeight: 'Regular',
      className: 'font-regular',
    },
    {
      fontWeight: 'Semi-bold', //600
      className: 'font-semibold',
    },
    {
      fontWeight: 'Bold', // 700 900
      className: 'font-bold',
    },
  ],
  stg: [
    {
      fontWeight: 'Bold',
      className: 'font-bold',
    },
  ],
  wbc: [
    {
      fontWeight: 'Bold',
      className: 'font-bold',
    },
  ],
  wbg: [
    {
      fontWeight: 'Light', //100 - 300
      className: 'font-light',
    },
    {
      fontWeight: 'Regular', //400 - 600
      className: 'font-regular',
    },
    {
      fontWeight: 'Bold', //700 - 900
      className: 'font-bold',
    },
  ],
} as const;

export const Fonts = () => {
  const brand = useBrand();
  const fonts = FONTS_PER_BRAND[brand?.key || 'wbc'];

  return (
    <div className="flex flex-col gap-2 bg-white p-6">
      {fonts.map(({ fontWeight, className }) => (
        <div key={fontWeight} className={className}>
          <ComponentTitle className={className}>
            {brand?.fontName} {fontWeight}
          </ComponentTitle>
          <p className="typography-brand-4 break-words">abcdefghijklmnopqrstuvwxyz</p>
          <p className="typography-brand-4 break-words">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
          <p className="typography-brand-4 break-words">1234567890</p>
          <p className="typography-brand-4 break-words">!@#$¢%&*©®™£</p>
          <p className="typography-brand-4 break-words">ﬁ ﬂ ﬀ</p>
        </div>
      ))}
    </div>
  );
};
