import { type Meta, StoryFn } from '@storybook/react';
import { clsx } from 'clsx';

import { Badge, Table } from '../../components/index.js';
import { SPACING_UNIT } from '../../tailwind/constants/index.js';

const meta: Meta = {
  title: 'Foundation/Spacing',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;

const SPACING_SCALE = [
  { className: 'pr-1' },
  { className: 'pr-2' },
  { className: 'pr-3' },
  { className: 'pr-4' },
  { className: 'pr-5' },
  { className: 'pr-6' },
  { className: 'pr-7' },
  { className: 'pr-8' },
  { className: 'pr-9' },
  { className: 'pr-10' },
  { className: 'pr-11' },
  { className: 'pr-12' },
  { className: 'pr-13' },
  { className: 'pr-14' },
  { className: 'pr-15' },
  { className: 'pr-16' },
  { className: 'pr-17' },
  { className: 'pr-18' },
  { className: 'pr-19' },
  { className: 'pr-20' },
  { className: 'pr-21' },
  { className: 'pr-22' },
  { className: 'pr-23' },
  { className: 'pr-24' },
  { className: 'pr-25' },
  { className: 'pr-26' },
  { className: 'pr-27' },
  { className: 'pr-28' },
  { className: 'pr-29' },
  { className: 'pr-30' },
];
const VARIATION_MARGIN_PADDING = ['', 'x', 'y', 't', 'r', 'b', 'l'];

/**
 * Margin scale
 */
export const MarginScale = () => {
  return (
    <Table>
      <Table.Caption>
        GEL spacing for <strong>margin</strong>
      </Table.Caption>
      <Table.Header>
        <Table.HeaderRow>
          <Table.HeaderCell>Token</Table.HeaderCell>
          <Table.HeaderCell>Pixel</Table.HeaderCell>
          <Table.HeaderCell>REM</Table.HeaderCell>
          <Table.HeaderCell>Tailwind class</Table.HeaderCell>
        </Table.HeaderRow>
      </Table.Header>
      <Table.Body>
        {SPACING_SCALE.map((spacing, index) => {
          const size = index + 1;
          const pixelSize = SPACING_UNIT * size;
          const remSize = pixelSize / 16;
          return (
            <Table.Row key={spacing.className}>
              <Table.Cell className="align-middle">
                <div className={clsx(spacing.className, 'h-3 w-0 bg-primary')} />
              </Table.Cell>
              <Table.Cell className="align-middle">{pixelSize}px</Table.Cell>
              <Table.Cell className="align-middle">{remSize}rem</Table.Cell>
              <Table.Cell>
                <div className="flex flex-wrap gap-1 align-middle">
                  {VARIATION_MARGIN_PADDING.map(v => (
                    <Badge color="faint">{`.m${v}-${size}`}</Badge>
                  ))}
                </div>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

/**
 * Padding scale
 */
export const PaddingScale = () => {
  return (
    <Table>
      <Table.Caption>
        GEL spacing for <strong>padding</strong>
      </Table.Caption>
      <Table.Header>
        <Table.HeaderRow>
          <Table.HeaderCell>Token</Table.HeaderCell>
          <Table.HeaderCell>Pixel</Table.HeaderCell>
          <Table.HeaderCell>REM</Table.HeaderCell>
          <Table.HeaderCell>Tailwind class</Table.HeaderCell>
        </Table.HeaderRow>
      </Table.Header>
      <Table.Body>
        {SPACING_SCALE.map((spacing, index) => {
          const size = index + 1;
          const pixelSize = SPACING_UNIT * size;
          const remSize = pixelSize / 16;
          return (
            <Table.Row key={spacing.className}>
              <Table.Cell className="align-middle">
                <div className={clsx(spacing.className, 'h-3 w-0 bg-primary')} />
              </Table.Cell>
              <Table.Cell className="align-middle">{pixelSize}px</Table.Cell>
              <Table.Cell className="align-middle">{remSize}rem</Table.Cell>
              <Table.Cell>
                <div className="flex flex-wrap gap-1 align-middle">
                  {VARIATION_MARGIN_PADDING.map(v => (
                    <Badge color="faint">{`.p${v}-${size}`}</Badge>
                  ))}
                </div>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

/**
 * Gap scale
 */
export const GapScale = () => {
  return (
    <Table>
      <Table.Caption>
        GEL spacing classes for <strong>gap</strong>
      </Table.Caption>
      <Table.Header>
        <Table.HeaderRow>
          <Table.HeaderCell>Token</Table.HeaderCell>
          <Table.HeaderCell>Pixel</Table.HeaderCell>
          <Table.HeaderCell>REM</Table.HeaderCell>
          <Table.HeaderCell>Tailwind class</Table.HeaderCell>
        </Table.HeaderRow>
      </Table.Header>
      <Table.Body>
        {SPACING_SCALE.map((spacing, index) => {
          const size = index + 1;
          const pixelSize = SPACING_UNIT * size;
          const remSize = pixelSize / 16;
          return (
            <Table.Row key={spacing.className}>
              <Table.Cell className="align-middle">
                <div className={clsx(spacing.className, 'h-3 w-0 bg-primary')} />
              </Table.Cell>
              <Table.Cell className="align-middle">{pixelSize}px</Table.Cell>
              <Table.Cell className="align-middle">{remSize}rem</Table.Cell>
              <Table.Cell className="align-middle">
                <Badge color="faint">{`.gap-${size}`}</Badge>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
