import { type Meta, StoryFn } from '@storybook/react-vite';

import {
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
    <TableCaption>GEL breakpoint tokens</TableCaption>
    <TableHeader>
      <TableHeaderRow>
        <TableHeaderCell>Token</TableHeaderCell>
        <TableHeaderCell>Value</TableHeaderCell>
        <TableHeaderCell>Tailwind prefix</TableHeaderCell>
      </TableHeaderRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>xsl</TableCell>
        <TableCell>0px and up</TableCell>
        <TableCell>xsl:</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>sm</TableCell>
        <TableCell>768px and up</TableCell>
        <TableCell>sm:</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>md</TableCell>
        <TableCell>992 and up</TableCell>
        <TableCell>md:</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>lg</TableCell>
        <TableCell>1200 and up</TableCell>
        <TableCell>lg:</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>xl</TableCell>
        <TableCell>1900 and up</TableCell>
        <TableCell>xl:</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);
