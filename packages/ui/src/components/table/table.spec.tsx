import { render } from '@testing-library/react';

import { Table } from './table.component.js';

describe('Table', () => {
  it('renders the component', () => {
    const { container } = render(
      <Table>
        <Table.Caption>
          Caption this table width is: <em>(100%)</em>
        </Table.Caption>
        <Table.Header>
          <Table.HeaderRow data-testid="header-row">
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Date Modified</Table.HeaderCell>
          </Table.HeaderRow>
        </Table.Header>
        <Table.Body>
          <Table.Row data-testid="header-row">
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
    );
    expect(container).toBeInTheDocument();
  });

  it('should render table with correct styling when bordered', () => {
    const { getByTestId, getByText } = render(
      <Table bordered>
        <Table.Caption>
          Caption this table width is: <em>(100%)</em>
        </Table.Caption>
        <Table.Header>
          <Table.HeaderRow>
            <Table.HeaderCell data-testid="header-cell">Name</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Date Modified</Table.HeaderCell>
          </Table.HeaderRow>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell data-testid="cell">Games</Table.Cell>
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
    );
    expect(getByTestId('header-cell')).toHaveClass('border-x-1 border-t-1 border-x-border border-t-border');
    expect(getByTestId('cell')).toHaveClass('border-x-1');
    expect(getByText('Footer goes here and should colSpan all columns')).toHaveClass('border-border border');
  });

  it('should render table with correct styling when striped', () => {
    const { getByTestId } = render(
      <Table striped>
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
          <Table.Row data-testid="row-2">
            <Table.Cell>Program Files</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell>4/7/2021</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );
    expect(getByTestId('row-2')).toHaveClass('even:bg-background hover:bg-default');
  });

  it('should render table with correct styling with highlighting options', () => {
    const { getByTestId, getAllByTestId } = render(
      <Table bordered>
        <Table.Header>
          <Table.HeaderRow>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Date Modified</Table.HeaderCell>
            <Table.HeaderCell>Test 1</Table.HeaderCell>
            <Table.HeaderCell>Test 2</Table.HeaderCell>
          </Table.HeaderRow>
        </Table.Header>
        <Table.Body>
          <Table.Row data-testid="row" highlighted>
            <Table.Cell>Games</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell>6/7/2020</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell>6/7/2020</Table.Cell>
          </Table.Row>
          <Table.Row highlighted={[0, 2]}>
            <Table.Cell data-testid="cell-start">Program Files</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell data-testid="cell-start">4/7/2021</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell>6/7/2020</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell highlightStart highlighted data-testid="cell-start">
              bootmgr
            </Table.Cell>
            <Table.Cell highlighted data-testid="cell-end">
              System file
            </Table.Cell>
            <Table.Cell>11/20/2010</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell>6/7/2020</Table.Cell>
          </Table.Row>
          <Table.Row highlighted={[0, [2, 4]]}>
            <Table.Cell data-testid="cell-start">Program Files</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell data-testid="cell-start">4/7/2021</Table.Cell>
            <Table.Cell data-testid="cell-end">File folder</Table.Cell>
            <Table.Cell data-testid="cell-end">6/7/2020</Table.Cell>
          </Table.Row>
        </Table.Body>
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
