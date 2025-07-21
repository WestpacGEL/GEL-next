import { type Meta, StoryFn } from '@storybook/react-vite';
import { clsx } from 'clsx';

import {
  Link,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
} from '../../components/index.js';

const meta: Meta = {
  title: 'Foundation/Typography',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;

const twentyPixel = '1.428571429';
const fourteenPixel = '0.875rem (14px)';

/**
 * Brand fonts
 */
export const BrandFont = () => {
  const typographyScale = [
    { className: 'typography-brand-1', fontSize: '3.75rem (60px)', lineHeight: '1.2' },
    { className: 'typography-brand-2', fontSize: '3.375rem (54px)', lineHeight: '1.2' },
    { className: 'typography-brand-3', fontSize: '3rem (48px)', lineHeight: '1.2' },
    { className: 'typography-brand-4', fontSize: '2.625rem (42px)', lineHeight: '1.2' },
    { className: 'typography-brand-5', fontSize: '2.25rem (36px)', lineHeight: '1.2' },
    { className: 'typography-brand-6', fontSize: '1.875rem (30px)', lineHeight: '1.2' },
    { className: 'typography-brand-7', fontSize: '1.5rem (24px)', lineHeight: '1.2' },
    { className: 'typography-brand-8', fontSize: '1.125rem (18px)', lineHeight: '1.4' },
    { className: 'typography-brand-9', fontSize: '1rem (16px)', lineHeight: '1.4' },
    { className: 'typography-brand-10', fontSize: fourteenPixel, lineHeight: '1.4' },
    { className: 'typography-brand-11', fontSize: fourteenPixel, lineHeight: twentyPixel },
  ];
  return (
    <Table className="whitespace-pre">
      <TableCaption>GEL brand typography tokens</TableCaption>
      <TableHeader>
        <TableHeaderRow>
          <TableHeaderCell>Token</TableHeaderCell>
          <TableHeaderCell>Font size</TableHeaderCell>
          <TableHeaderCell>Line height</TableHeaderCell>
          <TableHeaderCell>Tailwind class</TableHeaderCell>
        </TableHeaderRow>
      </TableHeader>
      <TableBody>
        {typographyScale.map(i => (
          <TableRow key={i.className}>
            <TableCell>
              <span className={i.className}>{i.className.replace('typography-', '')}</span>
            </TableCell>
            <TableCell>{i.fontSize}</TableCell>
            <TableCell>{i.lineHeight}</TableCell>
            <TableCell>{i.className}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

/**
 * Body fonts
 */
export const BodyFont = () => {
  const typographyScale = [
    { className: 'typography-body-1', fontSize: '3.75rem (60px)', lineHeight: '1.2' },
    { className: 'typography-body-2', fontSize: '3.375rem (54px)', lineHeight: '1.2' },
    { className: 'typography-body-3', fontSize: '3rem (48px)', lineHeight: '1.2' },
    { className: 'typography-body-4', fontSize: '2.625rem (42px)', lineHeight: '1.2' },
    { className: 'typography-body-5', fontSize: '2.25rem (36px)', lineHeight: '1.2' },
    { className: 'typography-body-6', fontSize: '1.875rem (30px)', lineHeight: '1.2' },
    { className: 'typography-body-7', fontSize: '1.5rem (24px)', lineHeight: '1.2' },
    { className: 'typography-body-8', fontSize: '1.125rem (18px)', lineHeight: '1.4' },
    { className: 'typography-body-9', fontSize: '1rem (16px)', lineHeight: '1.4' },
    { className: 'typography-body-10', fontSize: fourteenPixel, lineHeight: '1.4' },
    { className: 'typography-body-11', fontSize: fourteenPixel, lineHeight: twentyPixel },
  ];
  return (
    <Table>
      <TableCaption>GEL body typography tokens</TableCaption>
      <TableHeader>
        <TableHeaderRow>
          <TableHeaderCell>Token</TableHeaderCell>
          <TableHeaderCell>Font size</TableHeaderCell>
          <TableHeaderCell>Line height</TableHeaderCell>
          <TableHeaderCell>Tailwind class</TableHeaderCell>
        </TableHeaderRow>
      </TableHeader>
      <TableBody>
        {typographyScale.map(i => (
          <TableRow key={i.className}>
            <TableCell>
              <span className={i.className}>{i.className.replace('typography-', '')}</span>
            </TableCell>
            <TableCell>{i.fontSize}</TableCell>
            <TableCell>{i.lineHeight}</TableCell>
            <TableCell>{i.className}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

/**
 * Line height
 */
export const LineHeight = () => {
  const lineHeights = [
    { className: 'leading-normal', lineHeight: '1.4' },
    { className: 'leading-tight', lineHeight: '1.2' },
    { className: 'leading-loose', lineHeight: '1.428571429' },
  ];
  return (
    <div>
      <p className="mb-2">
        The pre-Next version of GEL had a fall-back line height of 1.428571429 for things inside the body, the reasoning
        for this can be found{' '}
        <Link
          href="https://stackoverflow.com/questions/19982651/why-does-bootstrap-set-the-line-height-property-to-1-428571429"
          type="inline"
        >
          here
        </Link>
        . A typography type has been added and the leading style in tailwind (with 14px font) has been extended to
        include this value for use to match the older version of GEL. The default tailwind values for normal and tight
        have also been updated and included in the table
      </p>
      <Table>
        <TableCaption>GEL line height tokens</TableCaption>
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderCell>Token</TableHeaderCell>
            <TableHeaderCell>Line height</TableHeaderCell>
            <TableHeaderCell>Tailwind class</TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {lineHeights.map(i => (
            <TableRow key={i.className}>
              <TableCell>
                <span className={i.className}>{i.className.replace('leading-', '')}</span>
              </TableCell>
              <TableCell>{i.lineHeight}</TableCell>
              <TableCell>{i.className}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
const FontWeightTable = ({ type, caption }: { caption: string; type: 'brand' | 'body' }) => {
  const fontWeight = [
    { className: 'font-thin', weight: '100' },
    { className: 'font-extralight', weight: '200' },
    { className: 'font-light', weight: '300' },
    { className: 'font-normal', weight: '400' },
    { className: 'font-medium', weight: '500' },
    { className: 'font-semibold', weight: '600' },
    { className: 'font-bold', weight: '700' },
    { className: 'font-extrabold', weight: '800' },
    { className: 'font-black', weight: '900' },
  ];
  const typography = type === 'brand' ? 'typography-brand-7' : 'typography-body-7';
  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableHeaderRow>
          <TableHeaderCell>Token</TableHeaderCell>
          <TableHeaderCell>Font weight</TableHeaderCell>
          <TableHeaderCell>Tailwind class</TableHeaderCell>
        </TableHeaderRow>
      </TableHeader>
      <TableBody>
        {fontWeight.map(i => (
          <TableRow key={i.className}>
            <TableCell>
              <span className={clsx(typography, i.className)}>{i.className.replace('font-', '')}</span>
            </TableCell>
            <TableCell>{i.weight}</TableCell>
            <TableCell>{i.className}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

/**
 * Brand fonts weight
 */
export const BrandFontWeight = () => {
  return <FontWeightTable caption="GEL brand font weight tokens" type="brand" />;
};

/**
 * Body fonts weight
 */
export const BodyFontWeight = () => {
  return <FontWeightTable caption="GEL body font weight tokens" type="body" />;
};
