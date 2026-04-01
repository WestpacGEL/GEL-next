import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { AdvancedTable } from './advanced-table.component.js';
import { columnsSB, defaultDataSB } from './story-utils/storyData.js';

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table/Pinning Columns',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<unknown>;

export const PinningColumns: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableColumnPinning />,
};
