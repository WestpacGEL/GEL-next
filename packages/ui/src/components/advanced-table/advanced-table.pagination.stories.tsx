import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { AdvancedTable } from './advanced-table.component.js';
import { columnsSB, defaultDataSB } from './story-utils/storyData.js';

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table/Pagination',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<unknown>;

export const Default: Story = {
  render: () => (
    <>
      <p className="typography-body-9">
        The pagination component is disabled by default. To enable pagination, pass the <code>showPagination</code> prop
        into the <code>AdvancedTable</code> component.
      </p>

      <AdvancedTable data={defaultDataSB} columns={columnsSB} showPagination />
    </>
  ),
};

export const CustomPageSizeOptions: Story = {
  render: () => (
    <AdvancedTable
      data={defaultDataSB}
      columns={columnsSB}
      showPagination
      pageSizeOptions={[1, 15, 50, 100]}
      paginationProps={{ pageSize: 15 }}
    />
  ),
};

export const InitialPaginationProps: Story = {
  render: () => (
    <AdvancedTable
      data={defaultDataSB}
      columns={columnsSB}
      showPagination
      paginationProps={{ pageIndex: 2, pageSize: 5 }}
    />
  ),
};
