import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
} from '../table/index.js';

import { Panel } from './panel.component.js';

import { PanelBody, PanelFooter } from './index.js';

const meta: Meta<typeof Panel> = {
  title: 'Components/Panel',
  component: Panel,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
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
      <PanelBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora officiis officia omnis aperiam voluptate
        suscipit, laudantium praesentium quas consequatur placeat, perferendis eligendi saepe in unde sequi dolores
        excepturi doloremque autem! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </PanelBody>,
      <PanelFooter>Panel footer</PanelFooter>,
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
      <PanelBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora officiis officia omnis aperiam voluptate
        suscipit, laudantium praesentium quas consequatur placeat, perferendis eligendi saepe in unde sequi dolores
        excepturi doloremque autem! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </PanelBody>,
      <PanelFooter>Panel footer</PanelFooter>,
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
        <TableCaption>
          Caption this table width is: <em>(100%)</em>
        </TableCaption>
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Date Modified</TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Games</TableCell>
            <TableCell>File folder</TableCell>
            <TableCell>6/7/2020</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Program Files</TableCell>
            <TableCell>File folder</TableCell>
            <TableCell>4/7/2021</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>bootmgr</TableCell>
            <TableCell>System file</TableCell>
            <TableCell>11/20/2010</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>log.txt</TableCell>
            <TableCell>Text Document</TableCell>
            <TableCell>1/18/2016</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter colspan={3}>Footer goes here and should colSpan all columns</TableFooter>
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
      <PanelBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora officiis officia omnis aperiam voluptate
        suscipit, laudantium praesentium quas consequatur placeat, perferendis eligendi saepe in unde sequi dolores
        excepturi doloremque autem! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </PanelBody>,
      <Table>
        <TableCaption>
          Caption this table width is: <em>(100%)</em>
        </TableCaption>
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Date Modified</TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Games</TableCell>
            <TableCell>File folder</TableCell>
            <TableCell>6/7/2020</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Program Files</TableCell>
            <TableCell>File folder</TableCell>
            <TableCell>4/7/2021</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>bootmgr</TableCell>
            <TableCell>System file</TableCell>
            <TableCell>11/20/2010</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>log.txt</TableCell>
            <TableCell>Text Document</TableCell>
            <TableCell>1/18/2016</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter colspan={3}>Footer goes here and should colSpan all columns</TableFooter>
      </Table>,
      <PanelFooter>Panel footer</PanelFooter>,
    ],
  },
};
