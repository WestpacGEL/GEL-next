'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
} from '@westpac/ui';
import { clsx } from 'clsx';

import { useBrand } from '@/app/design-system/hooks/use-brand';
import { ComponentTitle } from '@/components/document-renderer/component-title';

import { styles as FontsStyles } from './fonts.styles';

type FontProps = {
  view: 'default' | 'table';
};

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
} as const;

export const Fonts = ({ view = 'default' }: FontProps) => {
  const brand = useBrand();
  const fonts = FONTS_PER_BRAND[brand?.key || 'wbc'];

  const styles = FontsStyles({});

  if (view === 'default') {
    return (
      <div className={styles.default({})}>
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
  } else {
    return (
      <div className={styles.table({})}>
        <Table>
          <TableCaption>GEL brand font weight tokens</TableCaption>
          <TableHeader>
            <TableHeaderRow>
              <TableHeaderCell>Token</TableHeaderCell>
              <TableHeaderCell>Font weight</TableHeaderCell>
              <TableHeaderCell>Tailwind class</TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {fonts.map(i => (
              <TableRow key={i.className}>
                <TableCell>
                  <span className={clsx('typography-brand-7', i.className)}>{i.className.replace('font-', '')}</span>
                </TableCell>
                <TableCell>
                  {i.fontWeight} {brand?.fontName}
                </TableCell>
                <TableCell>{i.className}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
};
