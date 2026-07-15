import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { AdvancedTable } from './advanced-table.component.js';
import { type AdvancedTablePaginationState } from './advanced-table.types.js';
import { makePersonData, personColumns } from './story-utils/index.js';

const data = makePersonData(25);

const columns = personColumns;

const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2/Pagination',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Pagination is on by default: the table shows one page of rows at a time with
 * pagination controls and a page-size selector. No prop is required.
 */
export const Default: Story = {
  render: () => <AdvancedTable data={data} columns={columns} caption="People" />,
};

/** `pageSizeOptions` configures the page sizes offered in the selector. */
export const CustomPageSizes: Story = {
  render: () => <AdvancedTable data={data} columns={columns} caption="People" pageSizeOptions={[8, 16, 24]} />,
};

/** `enablePagination={false}` renders every row at once, with no pagination controls. */
export const Disabled: Story = {
  render: () => <AdvancedTable data={data} columns={columns} caption="People" enablePagination={false} />,
};

function ControlledPaginationExample() {
  const [pagination, setPagination] = useState<AdvancedTablePaginationState>({ pageIndex: 0, pageSize: 10 });

  return (
    <>
      <p className="pb-2 typography-body-8">
        Parent owns pagination. Current page: {pagination.pageIndex + 1}, page size: {pagination.pageSize}
      </p>
      <AdvancedTable
        data={data}
        columns={columns}
        caption="Controlled pagination"
        pagination={pagination}
        onPaginationChange={setPagination}
      />
    </>
  );
}

/**
 * Controlled: the parent owns pagination state via the `pagination` /
 * `onPaginationChange` triple, so the current page and page size can be synced
 * with the URL or analytics.
 */
export const Controlled: Story = {
  render: () => <ControlledPaginationExample />,
};
