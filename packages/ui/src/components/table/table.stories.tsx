import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { Table } from './table.component.js';

import {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
} from './index.js';

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
          <TableRow highlighted>
            <TableCell>Games</TableCell>
            <TableCell>File folder</TableCell>
            <TableCell>6/7/2020</TableCell>
          </TableRow>
          <TableRow highlighted={[0, 2]}>
            <TableCell>Program Files</TableCell>
            <TableCell>File folder</TableCell>
            <TableCell>4/7/2021</TableCell>
          </TableRow>
          <TableRow highlighted={[1, 2]}>
            <TableCell>bootmgr</TableCell>
            <TableCell>System file</TableCell>
            <TableCell>11/20/2010</TableCell>
          </TableRow>
          <TableRow>
            <TableCell highlightStart highlighted>
              log.txt
            </TableCell>
            <TableCell>Text Document</TableCell>
            <TableCell>1/18/2016</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter colspan={3}>Footer goes here and should colSpan all columns</TableFooter>
      </>
    ),
  },
};
