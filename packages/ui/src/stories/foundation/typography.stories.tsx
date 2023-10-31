import { type Meta, StoryFn } from '@storybook/react';

import { Link, Table } from '../../components/index.js';

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
    <Table>
      <Table.Caption>GEL brand typography tokens</Table.Caption>
      <Table.Header>
        <Table.HeaderRow>
          <Table.HeaderCell>Token</Table.HeaderCell>
          <Table.HeaderCell>Font size</Table.HeaderCell>
          <Table.HeaderCell>Line height</Table.HeaderCell>
          <Table.HeaderCell>Tailwind class</Table.HeaderCell>
        </Table.HeaderRow>
      </Table.Header>
      <Table.Body>
        {typographyScale.map(i => (
          <Table.Row key={i.className}>
            <Table.Cell>
              <span className={i.className}>{i.className.replace('typography-', '')}</span>
            </Table.Cell>
            <Table.Cell>{i.fontSize}</Table.Cell>
            <Table.Cell>{i.lineHeight}</Table.Cell>
            <Table.Cell>{i.className}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
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
      <Table.Caption>GEL body typography tokens</Table.Caption>
      <Table.Header>
        <Table.HeaderRow>
          <Table.HeaderCell>Token</Table.HeaderCell>
          <Table.HeaderCell>Font size</Table.HeaderCell>
          <Table.HeaderCell>Line height</Table.HeaderCell>
          <Table.HeaderCell>Tailwind class</Table.HeaderCell>
        </Table.HeaderRow>
      </Table.Header>
      <Table.Body>
        {typographyScale.map(i => (
          <Table.Row key={i.className}>
            <Table.Cell>
              <span className={i.className}>{i.className.replace('typography-', '')}</span>
            </Table.Cell>
            <Table.Cell>{i.fontSize}</Table.Cell>
            <Table.Cell>{i.lineHeight}</Table.Cell>
            <Table.Cell>{i.className}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
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
        have also been updated and included in the table.
      </p>
      <Table>
        <Table.Caption>GEL line height tokens</Table.Caption>
        <Table.Header>
          <Table.HeaderRow>
            <Table.HeaderCell>Token</Table.HeaderCell>
            <Table.HeaderCell>Line height</Table.HeaderCell>
            <Table.HeaderCell>Tailwind class</Table.HeaderCell>
          </Table.HeaderRow>
        </Table.Header>
        <Table.Body>
          {lineHeights.map(i => (
            <Table.Row key={i.className}>
              <Table.Cell>
                <span className={i.className}>{i.className.replace('leading-', '')}</span>
              </Table.Cell>
              <Table.Cell>{i.lineHeight}</Table.Cell>
              <Table.Cell>{i.className}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

/**
 * Fonts weight
 */
export const FontWeight = () => {
  const fontWeight = [
    { className: 'font-light', weight: '300' },
    { className: 'font-normal', weight: '400' },
    { className: 'font-medium', weight: '500' },
    { className: 'font-semibold', weight: '600' },
    { className: 'font-bold', weight: '700' },
  ];
  return (
    <Table>
      <Table.Caption>Font Weight</Table.Caption>
      <Table.Header>
        <Table.HeaderRow>
          <Table.HeaderCell>Token</Table.HeaderCell>
          <Table.HeaderCell>Font weight</Table.HeaderCell>
          <Table.HeaderCell>Tailwind class</Table.HeaderCell>
        </Table.HeaderRow>
      </Table.Header>
      <Table.Body>
        {fontWeight.map(i => (
          <Table.Row key={i.className}>
            <Table.Cell>
              <span className={i.className}>{i.className.replace('font-', '')}</span>
            </Table.Cell>
            <Table.Cell className={i.className}>{i.weight}</Table.Cell>
            <Table.Cell>{i.className}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
