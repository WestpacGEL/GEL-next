import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Table } from '../table/index.js';

import { Panel } from './panel.component.js';

const meta: Meta<typeof Panel> = {
  title: 'Components/Panel',
  component: Panel,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="p-3">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    heading: 'Panel title',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    children: [
      <Panel.Body>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora officiis officia omnis aperiam voluptate
        suscipit, laudantium praesentium quas consequatur placeat, perferendis eligendi saepe in unde sequi dolores
        excepturi doloremque autem! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Panel.Body>,
      <Panel.Footer>Panel footer</Panel.Footer>,
    ],
  },
};

/**
 * > Faint look example
 */
export const FaintLook: Story = {
  args: {
    look: 'faint',
    children: [
      <Panel.Body>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora officiis officia omnis aperiam voluptate
        suscipit, laudantium praesentium quas consequatur placeat, perferendis eligendi saepe in unde sequi dolores
        excepturi doloremque autem! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Panel.Body>,
      <Panel.Footer>Panel footer</Panel.Footer>,
    ],
  },
};

/**
 * > Example using a table
 */
export const WithTable: Story = {
  args: {
    children: [
      <Table>
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
      </Table>,
    ],
  },
};

/**
 * > Example using a table with a body and a panel footer
 */
export const WithTableAndBody: Story = {
  args: {
    children: [
      <Panel.Body>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora officiis officia omnis aperiam voluptate
        suscipit, laudantium praesentium quas consequatur placeat, perferendis eligendi saepe in unde sequi dolores
        excepturi doloremque autem! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Panel.Body>,
      <Table>
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
      </Table>,
      <Panel.Footer>Panel footer</Panel.Footer>,
    ],
  },
};
