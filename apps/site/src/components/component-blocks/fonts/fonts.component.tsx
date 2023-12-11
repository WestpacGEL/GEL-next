'use client';

import { useBrand } from '@/app/design-system/hooks/use-brand';
import { ComponentTitle } from '@/components/document-renderer/component-title';

const FONT_LIGHT = 'font-light';
const FONT_REGULAR = 'font-regular';
const FONT_BOLD = 'font-bold';

const FONTS_PER_BRAND = {
  bom: [
    {
      fontWeight: 'Light',
      className: FONT_LIGHT,
    },
    {
      fontWeight: 'Regular',
      className: FONT_REGULAR,
    },
    {
      fontWeight: 'Bold',
      className: FONT_BOLD,
    },
  ],
  bsa: [
    {
      fontWeight: 'Light',
      className: FONT_LIGHT,
    },
    {
      fontWeight: 'Bold',
      className: FONT_BOLD,
    },
  ],
  rams: [
    {
      fontWeight: 'Regular',
      className: FONT_REGULAR,
    },
    {
      fontWeight: 'Semi-bold', //600
      className: 'font-semibold',
    },
    {
      fontWeight: 'Bold', // 700 900
      className: FONT_BOLD,
    },
  ],
  stg: [
    {
      fontWeight: 'Bold',
      className: FONT_BOLD,
    },
  ],
  wbc: [
    {
      fontWeight: 'Bold',
      className: FONT_BOLD,
    },
  ],
  wbg: [
    {
      fontWeight: 'Light', //100 - 300
      className: FONT_LIGHT,
    },
    {
      fontWeight: 'Regular', //400 - 600
      className: FONT_REGULAR,
    },
    {
      fontWeight: 'Bold', //700 - 900
      className: FONT_BOLD,
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
