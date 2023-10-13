import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Table } from './table.component.js';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    children: (
      <>
        <Table.Caption>
          Caption this table width is: <em>(100%)</em>
        </Table.Caption>
        <Table.Header>
          <Table.HeaderRow>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Date Modified</Table.HeaderCell>
          </Table.HeaderRow>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Games</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell>6/7/2020</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Program Files</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell>4/7/2021</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>bootmgr</Table.Cell>
            <Table.Cell>System file</Table.Cell>
            <Table.Cell>11/20/2010</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>log.txt</Table.Cell>
            <Table.Cell>Text Document</Table.Cell>
            <Table.Cell>1/18/2016</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer colspan={3}>Footer goes here and should colSpan all columns</Table.Footer>
      </>
    ),
  },
};

/**
 * > Striped example
 */
export const Striped: Story = {
  args: {
    striped: true,
    children: (
      <>
        <Table.Caption>
          Caption this table width is: <em>(100%)</em>
        </Table.Caption>
        <Table.Header>
          <Table.HeaderRow>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Date Modified</Table.HeaderCell>
          </Table.HeaderRow>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Games</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell>6/7/2020</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Program Files</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell>4/7/2021</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>bootmgr</Table.Cell>
            <Table.Cell>System file</Table.Cell>
            <Table.Cell>11/20/2010</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>log.txt</Table.Cell>
            <Table.Cell>Text Document</Table.Cell>
            <Table.Cell>1/18/2016</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer colspan={3}>Footer goes here and should colSpan all columns</Table.Footer>
      </>
    ),
  },
};

/**
 * > Bordered example
 */
export const Bordered: Story = {
  args: {
    bordered: true,
    children: (
      <>
        <Table.Caption>
          Caption this table width is: <em>(100%)</em>
        </Table.Caption>
        <Table.Header>
          <Table.HeaderRow>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Date Modified</Table.HeaderCell>
          </Table.HeaderRow>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Games</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell>6/7/2020</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Program Files</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell>4/7/2021</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>bootmgr</Table.Cell>
            <Table.Cell>System file</Table.Cell>
            <Table.Cell>11/20/2010</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>log.txt</Table.Cell>
            <Table.Cell>Text Document</Table.Cell>
            <Table.Cell>1/18/2016</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer colspan={3}>Footer goes here and should colSpan all columns</Table.Footer>
      </>
    ),
  },
};

/**
 * > Bordered & Striped example
 */
export const BorderedAndStriped: Story = {
  args: {
    bordered: true,
    striped: true,
    children: (
      <>
        <Table.Caption>
          Caption this table width is: <em>(100%)</em>
        </Table.Caption>
        <Table.Header>
          <Table.HeaderRow>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Date Modified</Table.HeaderCell>
          </Table.HeaderRow>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Games</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell>6/7/2020</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Program Files</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell>4/7/2021</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>bootmgr</Table.Cell>
            <Table.Cell>System file</Table.Cell>
            <Table.Cell>11/20/2010</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>log.txt</Table.Cell>
            <Table.Cell>Text Document</Table.Cell>
            <Table.Cell>1/18/2016</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer colspan={3}>Footer goes here and should colSpan all columns</Table.Footer>
      </>
    ),
  },
};

/**
 * > Example of table with highlighted rows or cells
 */
export const HighlightedRowCell: Story = {
  args: {
    children: (
      <>
        <Table.Caption>
          Caption this table width is: <em>(100%)</em>
        </Table.Caption>
        <Table.Header>
          <Table.HeaderRow>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Date Modified</Table.HeaderCell>
          </Table.HeaderRow>
        </Table.Header>
        <Table.Body>
          <Table.Row highlighted>
            <Table.Cell>Games</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell>6/7/2020</Table.Cell>
          </Table.Row>
          <Table.Row highlighted={[0, 2]}>
            <Table.Cell>Program Files</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell>4/7/2021</Table.Cell>
          </Table.Row>
          <Table.Row highlighted={[1, 2]}>
            <Table.Cell>bootmgr</Table.Cell>
            <Table.Cell>System file</Table.Cell>
            <Table.Cell>11/20/2010</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell highlightStart highlighted>
              log.txt
            </Table.Cell>
            <Table.Cell>Text Document</Table.Cell>
            <Table.Cell>1/18/2016</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer colspan={3}>Footer goes here and should colSpan all columns</Table.Footer>
      </>
    ),
  },
};
