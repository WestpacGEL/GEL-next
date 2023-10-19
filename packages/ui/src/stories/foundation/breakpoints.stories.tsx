import { type Meta, StoryFn } from '@storybook/react';

import { Table } from '../../components/index.js';

const meta: Meta = {
  title: 'Foundation/Breakpoints',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;

/**
 * Breakpoints are a set of predefined viewport widths that can be used to change the layout of a webpage to ensure it accommodates different devices.
 * For styling GEL is using Tailwind and refer https://tailwindcss.com/docs/responsive-design for detailed documentation.
 */
export const Breakpoints = () => (
  <Table>
    <Table.Caption>GEL breakpoint tokens</Table.Caption>
    <Table.Header>
      <Table.HeaderRow>
        <Table.HeaderCell>Token</Table.HeaderCell>
        <Table.HeaderCell>Value</Table.HeaderCell>
        <Table.HeaderCell>Tailwind prefix</Table.HeaderCell>
      </Table.HeaderRow>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>xsl</Table.Cell>
        <Table.Cell>0px and up</Table.Cell>
        <Table.Cell>xsl:</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>sm</Table.Cell>
        <Table.Cell>768px and up</Table.Cell>
        <Table.Cell>sm:</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>md</Table.Cell>
        <Table.Cell>992 and up</Table.Cell>
        <Table.Cell>md:</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>lg</Table.Cell>
        <Table.Cell>1200 and up</Table.Cell>
        <Table.Cell>lg:</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>xl</Table.Cell>
        <Table.Cell>1900 and up</Table.Cell>
        <Table.Cell>xl:</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);
