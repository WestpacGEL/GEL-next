import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { columnsSB, defaultDataSB } from './story-utils/storyData.js';

import { AdvancedTable } from './index.js';

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicTable: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} showPagination />,
};
