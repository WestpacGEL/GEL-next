import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';

import { AdvancedTable } from './advanced-table.component.js';
import { makeDataFromCols } from './story-utils/fakerData.js';
import { dataForColsSB, dataForRowsColsSB, manyColsSB, manyRowsColsSB } from './story-utils/storyData.js';

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table/Scrollable (Virtualized)',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<unknown>;

export const VirtualizedColumns: Story = {
  render: () => (
    <>
      <p className="typography-body-9 font-bold">Total cells: {dataForColsSB.length * manyColsSB.length}</p>
      <p className="typography-body-9 font-bold">Total rows: {dataForColsSB.length}</p>
      <p className="typography-body-9 font-bold">Total columns: {manyColsSB.length}</p>
      <AdvancedTable data={dataForColsSB} columns={manyColsSB} scrollableColumns showPagination />
    </>
  ),
};

export const VirtualizedRows: Story = {
  render: () => (
    <>
      <p className="typography-body-9 font-bold">Total cells: {dataForRowsColsSB.length * manyRowsColsSB.length}</p>
      <p className="typography-body-9 font-bold">Total rows: {dataForRowsColsSB.length}</p>
      <p className="typography-body-9 font-bold">Total columns: {manyRowsColsSB.length}</p>
      <AdvancedTable data={dataForRowsColsSB} columns={manyRowsColsSB} scrollableRows fixedHeight="300px" />
    </>
  ),
};

export const VirtualizedRowsAndColumns: Story = {
  render: () => (
    <>
      <p className="typography-body-9 font-bold">Total cells: {dataForColsSB.length * manyColsSB.length}</p>
      <p className="typography-body-9 font-bold">Total rows: {dataForColsSB.length}</p>
      <p className="typography-body-9 font-bold">Total columns: {manyColsSB.length}</p>
      <AdvancedTable data={dataForColsSB} columns={manyColsSB} scrollableRows scrollableColumns />
    </>
  ),
};

export const VirtualizedWithCustomHeightAndWidth: Story = {
  render: () => (
    <>
      <p className="typography-body-9 font-bold">Total cells: {dataForColsSB.length * manyColsSB.length}</p>
      <p className="typography-body-9 font-bold">Total rows: {dataForColsSB.length}</p>
      <p className="typography-body-9 font-bold">Total columns: {manyColsSB.length}</p>
      <AdvancedTable
        data={dataForColsSB}
        columns={manyColsSB}
        scrollableRows
        scrollableColumns
        fixedHeight="700px"
        fixedWidth="500px"
      />
    </>
  ),
};

export const VirtualizedRowsWithSorting: Story = {
  render: () => (
    <AdvancedTable data={dataForRowsColsSB} columns={manyRowsColsSB} scrollableRows fixedHeight="400px" enableSorting />
  ),
};

export const VirtualizedRowsWithSelection: Story = {
  render: () => (
    <AdvancedTable
      data={dataForRowsColsSB}
      columns={manyRowsColsSB}
      scrollableRows
      fixedHeight="400px"
      enableRowSelection
    />
  ),
};

export const VirtualizedRowsBordered: Story = {
  render: () => (
    <AdvancedTable data={dataForRowsColsSB} columns={manyRowsColsSB} scrollableRows fixedHeight="400px" bordered />
  ),
};

export const VirtualizedColumnsWithSorting: Story = {
  render: () => (
    <AdvancedTable data={dataForColsSB} columns={manyColsSB} scrollableColumns enableSorting showPagination />
  ),
};

export const VirtualizedRowsAndColumnsWithSorting: Story = {
  render: () => (
    <AdvancedTable data={dataForColsSB} columns={manyColsSB} scrollableRows scrollableColumns enableSorting />
  ),
};

export const VirtualizedColumnsWithPinning: Story = {
  render: () => (
    <AdvancedTable data={dataForColsSB} columns={manyColsSB} scrollableColumns enableColumnPinning showPagination />
  ),
};

export const VirtualizedColumnsWithPinningAndSelection: Story = {
  render: () => (
    <AdvancedTable
      data={dataForColsSB}
      columns={manyColsSB}
      scrollableColumns
      enableColumnPinning
      enableRowSelection
      showPagination
    />
  ),
};

export const VirtualizedColumnsWithPinningAndRowPinning: Story = {
  render: () => (
    <AdvancedTable
      data={dataForColsSB}
      columns={manyColsSB}
      scrollableColumns
      enableColumnPinning
      enableRowPinning
      showPagination
    />
  ),
};

export const VirtualizedColumnsWithAllPinningOptions: Story = {
  render: () => (
    <AdvancedTable
      data={dataForColsSB}
      columns={manyColsSB}
      scrollableColumns
      enableColumnPinning
      enableRowSelection
      enableRowPinning
      showPagination
    />
  ),
};

export const VirtualizedRowsAndColumnsWithPinning: Story = {
  render: () => (
    <AdvancedTable
      data={dataForColsSB}
      columns={manyColsSB}
      scrollableRows
      scrollableColumns
      enableColumnPinning
      enableRowSelection
      enableRowPinning
    />
  ),
};

const PAGE_SIZE = 50;

function LoadMoreDemo({ threshold }: { threshold?: number }) {
  const [data, setData] = useState(() => makeDataFromCols(PAGE_SIZE, manyRowsColsSB));
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMore = useCallback(() => {
    setIsLoadingMore(true);
    // Simulate an async fetch
    setTimeout(() => {
      setData(prev => [...prev, ...makeDataFromCols(PAGE_SIZE, manyRowsColsSB)]);
      setIsLoadingMore(false);
    }, 600);
  }, []);

  let statusText = 'Scroll to the bottom to load more.';
  if (isLoadingMore) statusText = 'Loading more…';
  else if (threshold) statusText = `Prefetches the next page once ${threshold} rows from the bottom become visible.`;

  return (
    <>
      <p className="typography-body-9 font-bold">Loaded rows: {data.length}</p>
      <p className="typography-body-9">{statusText}</p>
      <AdvancedTable
        data={data}
        columns={manyRowsColsSB}
        scrollableRows
        fixedHeight="400px"
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        loadMoreThreshold={threshold}
      />
    </>
  );
}

/**
 * `onLoadMore` fires when virtualized rows scroll near the bottom. Use it to
 * progressively fetch more data; `isLoadingMore` prevents duplicate calls
 * while a request is in flight.
 */
export const VirtualizedRowsLoadMore: Story = {
  render: () => <LoadMoreDemo />,
};

/**
 * `loadMoreThreshold` lets you trigger `onLoadMore` before the user reaches the
 * very last row — useful for prefetching data so users don't see a hitch.
 */
export const VirtualizedRowsLoadMoreWithThreshold: Story = {
  render: () => <LoadMoreDemo threshold={10} />,
};
