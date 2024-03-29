import { render } from '@testing-library/react';

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

describe('Table', () => {
  it('renders the component', () => {
    const { container } = render(
      <Table>
        <TableCaption>
          Caption this table width is: <em>(100%)</em>
        </TableCaption>
        <TableHeader>
          <TableHeaderRow data-testid="header-row">
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Date Modified</TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          <TableRow data-testid="header-row">
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
    );
    expect(container).toBeInTheDocument();
  });

  it('should render table with correct styling when bordered', () => {
    const { getByTestId, getByText } = render(
      <Table bordered>
        <TableCaption>
          Caption this table width is: <em>(100%)</em>
        </TableCaption>
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderCell data-testid="header-cell">Name</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Date Modified</TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell data-testid="cell">Games</TableCell>
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
    );
    expect(getByTestId('header-cell')).toHaveClass('border-x border-t border-x-border border-t-border');
    expect(getByTestId('cell')).toHaveClass('border-x');
    expect(getByText('Footer goes here and should colSpan all columns')).toHaveClass('border-border border');
  });

  it('should render table with correct styling when striped', () => {
    const { getByTestId } = render(
      <Table striped>
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
          <TableRow data-testid="row-2">
            <TableCell>Program Files</TableCell>
            <TableCell>File folder</TableCell>
            <TableCell>4/7/2021</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(getByTestId('row-2')).toHaveClass('even:bg-light');
  });

  it('should render table with correct styling with highlighting options', () => {
    const { getByTestId, getAllByTestId } = render(
      <Table bordered>
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Date Modified</TableHeaderCell>
            <TableHeaderCell>Test 1</TableHeaderCell>
            <TableHeaderCell>Test 2</TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          <TableRow data-testid="row" highlighted>
            <TableCell>Games</TableCell>
            <TableCell>File folder</TableCell>
            <TableCell>6/7/2020</TableCell>
            <TableCell>File folder</TableCell>
            <TableCell>6/7/2020</TableCell>
          </TableRow>
          <TableRow highlighted={[0, 2]}>
            <TableCell data-testid="cell-start">Program Files</TableCell>
            <TableCell>File folder</TableCell>
            <TableCell data-testid="cell-start">4/7/2021</TableCell>
            <TableCell>File folder</TableCell>
            <TableCell>6/7/2020</TableCell>
          </TableRow>
          <TableRow>
            <TableCell highlightStart highlighted data-testid="cell-start">
              bootmgr
            </TableCell>
            <TableCell highlighted data-testid="cell-end">
              System file
            </TableCell>
            <TableCell>11/20/2010</TableCell>
            <TableCell>File folder</TableCell>
            <TableCell>6/7/2020</TableCell>
          </TableRow>
          <TableRow highlighted={[0, [2, 4]]}>
            <TableCell data-testid="cell-start">Program Files</TableCell>
            <TableCell>File folder</TableCell>
            <TableCell data-testid="cell-start">4/7/2021</TableCell>
            <TableCell data-testid="cell-end">File folder</TableCell>
            <TableCell data-testid="cell-end">6/7/2020</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const starterCells = getAllByTestId('cell-start');
    const endCells = getAllByTestId('cell-end');
    expect(getByTestId('row')).toHaveClass('border border-primary border-l-[6px] border-b-[3px] border-r-0');
    starterCells.forEach(cell =>
      expect(cell).toHaveClass('border border-l-primary border-l-[6px] border-b-[3px] border-b-primary border-b-[3px]'),
    );
    endCells.forEach(cell => expect(cell).toHaveClass('border border-b-primary border-b-[3px]'));
  });
});
