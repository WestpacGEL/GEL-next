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
      <p className="typography-body-9 font-bold">
        Showing the pagination component is disabled by default to give consumers more control over when to show it.
      </p>

      <AdvancedTable data={defaultDataSB} columns={columnsSB} />
    </>
  ),
};

export const WithPagination: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} showPagination />,
};
