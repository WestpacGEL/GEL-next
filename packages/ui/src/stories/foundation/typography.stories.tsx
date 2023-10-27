import { type Meta, StoryFn } from '@storybook/react';
import { clsx } from 'clsx';

import { Table } from '../../components/index.js';

const meta: Meta = {
  title: 'Foundation/Typography',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;

/**
 * Brand fonts
 */
export const BrandFont = () => {
  const typographyBrandScale = [
    { className: 'typography-brand-1', size: '3.75rem (60px)' },
    { className: 'typography-brand-2', size: '3.375rem (54px)' },
    { className: 'typography-brand-3', size: '3rem (48px)' },
    { className: 'typography-brand-4', size: '2.625rem (42px)' },
    { className: 'typography-brand-5', size: '2.25rem (36px)' },
    { className: 'typography-brand-6', size: '1.875rem (30px)' },
    { className: 'typography-brand-7', size: '1.5rem (24px)' },
    { className: 'typography-brand-8', size: '1.125rem (18px)' },
    { className: 'typography-brand-9', size: '1rem (16px)' },
    { className: 'typography-brand-10', size: '0.875rem (14px)' },
  ];
  return (
    <Table>
      <Table.Caption>GEL brand typography tokens</Table.Caption>
      <Table.Header>
        <Table.HeaderRow>
          <Table.HeaderCell>Token</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
          <Table.HeaderCell>Tailwind class</Table.HeaderCell>
        </Table.HeaderRow>
      </Table.Header>
      <Table.Body>
        {typographyBrandScale.map(i => (
          <Table.Row key={i.className}>
            <Table.Cell>
              <span className={clsx(i.className, 'capitalize')}>{i.className.replace('typography-', '')}</span>
            </Table.Cell>
            <Table.Cell>{i.size}</Table.Cell>
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
  const typographyBrandScale = [
    { className: 'typography-body-1', size: '3.75rem (60px)' },
    { className: 'typography-body-2', size: '3.375rem (54px)' },
    { className: 'typography-body-3', size: '3rem (48px)' },
    { className: 'typography-body-4', size: '2.625rem (42px)' },
    { className: 'typography-body-5', size: '2.25rem (36px)' },
    { className: 'typography-body-6', size: '1.875rem (30px)' },
    { className: 'typography-body-7', size: '1.5rem (24px)' },
    { className: 'typography-body-8', size: '1.125rem (18px)' },
    { className: 'typography-body-9', size: '1rem (16px)' },
    { className: 'typography-body-10', size: '0.875rem (14px)' },
  ];
  return (
    <Table>
      <Table.Caption>GEL body typography tokens</Table.Caption>
      <Table.Header>
        <Table.HeaderRow>
          <Table.HeaderCell>Token</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
          <Table.HeaderCell>Tailwind class</Table.HeaderCell>
        </Table.HeaderRow>
      </Table.Header>
      <Table.Body>
        {typographyBrandScale.map(i => (
          <Table.Row key={i.className}>
            <Table.Cell>
              <span className={clsx(i.className, 'capitalize')}>{i.className.replace('typography-', '')}</span>
            </Table.Cell>
            <Table.Cell>{i.size}</Table.Cell>
            <Table.Cell>{i.className}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

/**
 * Fonts weight
 */
export const FontWeight = () => {
  const fontWeight = [
    { className: 'typography-brand-7 font-light', weight: '300' },
    { className: 'typography-brand-7 font-normal', weight: '400' },
    { className: 'typography-brand-7 font-medium', weight: '500' },
    { className: 'typography-brand-7 font-semibold', weight: '600' },
    { className: 'typography-brand-7 font-bold', weight: '700' },
  ];
  return (
    <Table>
      <Table.Caption>Font Weight</Table.Caption>
      <Table.Header>
        <Table.HeaderRow>
          <Table.HeaderCell>Token</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
          <Table.HeaderCell>Tailwind class</Table.HeaderCell>
        </Table.HeaderRow>
      </Table.Header>
      <Table.Body>
        {fontWeight.map(i => (
          <Table.Row key={i.className}>
            <Table.Cell>
              <span className={clsx(i.className, 'capitalize')}>
                {i.className.replace('typography-brand-7 font-', '')}
              </span>
            </Table.Cell>
            <Table.Cell className={i.className}>{i.weight}</Table.Cell>
            <Table.Cell>{i.className.replace('typography-brand-7 ', '')}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
