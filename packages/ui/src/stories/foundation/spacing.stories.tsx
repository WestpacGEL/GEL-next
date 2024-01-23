import { type Meta, StoryFn } from '@storybook/react';
import { clsx } from 'clsx';

import {
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
} from '../../components/index.js';
import { SPACING_UNIT } from '../../tailwind/constants/index.js';

const meta: Meta = {
  title: 'Foundation/Spacing',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;

const SPACING_SCALE = [
  { value: 0.5, className: 'pr-0.5' },
  { value: 1, className: 'pr-1' },
  { value: 1.5, className: 'pr-1.5' },
  { value: 2, className: 'pr-2' },
  { value: 2.5, className: 'pr-2.5' },
  { value: 3, className: 'pr-3' },
  { value: 3.5, className: 'pr-3.5' },
  { value: 4, className: 'pr-4' },
  { value: 4.5, className: 'pr-4.5' },
  { value: 5, className: 'pr-5' },
  { value: 5.5, className: 'pr-5.5' },
  { value: 6, className: 'pr-6' },
  { value: 6.5, className: 'pr-6.5' },
  { value: 7, className: 'pr-7' },
  { value: 7.5, className: 'pr-7.5' },
  { value: 8, className: 'pr-8' },
  { value: 8.5, className: 'pr-8.5' },
  { value: 9, className: 'pr-9' },
  { value: 9.5, className: 'pr-9.5' },
  { value: 10, className: 'pr-10' },
  { value: 10.5, className: 'pr-10.5' },
  { value: 11, className: 'pr-11' },
  { value: 11.5, className: 'pr-11.5' },
  { value: 12, className: 'pr-12' },
  { value: 12.5, className: 'pr-12.5' },
  { value: 13, className: 'pr-13' },
  { value: 13.5, className: 'pr-13.5' },
  { value: 14, className: 'pr-14' },
  { value: 14.5, className: 'pr-14.5' },
  { value: 15, className: 'pr-15' },
  { value: 15.5, className: 'pr-15.5' },
  { value: 16, className: 'pr-16' },
  { value: 16.5, className: 'pr-16.5' },
  { value: 17, className: 'pr-17' },
  { value: 17.5, className: 'pr-17.5' },
  { value: 18, className: 'pr-18' },
  { value: 18.5, className: 'pr-18.5' },
  { value: 19, className: 'pr-19' },
  { value: 19.5, className: 'pr-19.5' },
  { value: 20, className: 'pr-20' },
  { value: 20.5, className: 'pr-20.5' },
  { value: 21, className: 'pr-21' },
  { value: 21.5, className: 'pr-21.5' },
  { value: 22, className: 'pr-22' },
  { value: 22.5, className: 'pr-22.5' },
  { value: 23, className: 'pr-23' },
  { value: 23.5, className: 'pr-23.5' },
  { value: 24, className: 'pr-24' },
  { value: 24.5, className: 'pr-24.5' },
  { value: 25, className: 'pr-25' },
  { value: 25.5, className: 'pr-25.5' },
  { value: 26, className: 'pr-26' },
  { value: 26.5, className: 'pr-26.5' },
  { value: 27, className: 'pr-27' },
  { value: 27.5, className: 'pr-27.5' },
  { value: 28, className: 'pr-28' },
  { value: 28.5, className: 'pr-28.5' },
  { value: 29, className: 'pr-29' },
  { value: 29.5, className: 'pr-29.5' },
  { value: 30, className: 'pr-30' },
];
const VARIATION_MARGIN_PADDING = ['', 'x', 'y', 't', 'r', 'b', 'l'];
const SPACING_DEFAULT_CLASSES = 'h-3 w-0 bg-primary';

/**
 * Margin scale
 */
export const MarginScale = () => {
  return (
    <Table>
      <TableCaption>
        GEL spacing for <strong>margin</strong>
      </TableCaption>
      <TableHeader>
        <TableHeaderRow>
          <TableHeaderCell>Token</TableHeaderCell>
          <TableHeaderCell>Pixel</TableHeaderCell>
          <TableHeaderCell>REM</TableHeaderCell>
          <TableHeaderCell>Tailwind class</TableHeaderCell>
        </TableHeaderRow>
      </TableHeader>
      <TableBody>
        {SPACING_SCALE.map(spacing => {
          const pixelSize = SPACING_UNIT * spacing.value;
          const remSize = pixelSize / 16;
          return (
            <TableRow key={spacing.className}>
              <TableCell className="align-middle">
                <div className={clsx(spacing.className, SPACING_DEFAULT_CLASSES)} />
              </TableCell>
              <TableCell className="align-middle">{pixelSize}px</TableCell>
              <TableCell className="align-middle">{remSize}rem</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1 align-middle">
                  {VARIATION_MARGIN_PADDING.map(v => (
                    <Badge color="faint">{`.m${v}-${spacing.value}`}</Badge>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

/**
 * Padding scale
 */
export const PaddingScale = () => {
  return (
    <Table>
      <TableCaption>
        GEL spacing for <strong>padding</strong>
      </TableCaption>
      <TableHeader>
        <TableHeaderRow>
          <TableHeaderCell>Token</TableHeaderCell>
          <TableHeaderCell>Pixel</TableHeaderCell>
          <TableHeaderCell>REM</TableHeaderCell>
          <TableHeaderCell>Tailwind class</TableHeaderCell>
        </TableHeaderRow>
      </TableHeader>
      <TableBody>
        {SPACING_SCALE.map(spacing => {
          const pixelSize = SPACING_UNIT * spacing.value;
          const remSize = pixelSize / 16;
          return (
            <TableRow key={spacing.className}>
              <TableCell className="align-middle">
                <div className={clsx(spacing.className, SPACING_DEFAULT_CLASSES)} />
              </TableCell>
              <TableCell className="align-middle">{pixelSize}px</TableCell>
              <TableCell className="align-middle">{remSize}rem</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1 align-middle">
                  {VARIATION_MARGIN_PADDING.map(v => (
                    <Badge color="faint">{`.p${v}-${spacing.value}`}</Badge>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

/**
 * Gap scale
 */
export const GapScale = () => {
  return (
    <Table>
      <TableCaption>
        GEL spacing classes for <strong>gap</strong>
      </TableCaption>
      <TableHeader>
        <TableHeaderRow>
          <TableHeaderCell>Token</TableHeaderCell>
          <TableHeaderCell>Pixel</TableHeaderCell>
          <TableHeaderCell>REM</TableHeaderCell>
          <TableHeaderCell>Tailwind class</TableHeaderCell>
        </TableHeaderRow>
      </TableHeader>
      <TableBody>
        {SPACING_SCALE.map(spacing => {
          const pixelSize = SPACING_UNIT * spacing.value;
          const remSize = pixelSize / 16;
          return (
            <TableRow key={spacing.className}>
              <TableCell className="align-middle">
                <div className={clsx(spacing.className, SPACING_DEFAULT_CLASSES)} />
              </TableCell>
              <TableCell className="align-middle">{pixelSize}px</TableCell>
              <TableCell className="align-middle">{remSize}rem</TableCell>
              <TableCell className="align-middle">
                <Badge color="faint">{`.gap-${spacing.value}`}</Badge>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
