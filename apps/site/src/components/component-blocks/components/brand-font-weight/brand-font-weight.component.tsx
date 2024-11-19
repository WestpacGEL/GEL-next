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
import clsx from 'clsx';
import React from 'react';

import { useBrand } from '@/app/design-system/hooks/use-brand';

import { styles as BrandFontWeightStyles } from './brand-font-weight.styles';

interface BrandFontWeightProps {
  caption: string;
  type: 'brand' | 'body';
}

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

export function BrandFontWeight({ type, caption }: BrandFontWeightProps) {
  const brand = useBrand();
  const fonts = FONTS_PER_BRAND[brand?.key || 'wbc'];

  return (
    <div className="mb-5 mt-4 max-w-5xl bg-white p-6">
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
