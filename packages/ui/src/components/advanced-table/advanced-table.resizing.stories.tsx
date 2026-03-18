import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { AdvancedTable } from './advanced-table.component.js';
import { columnsSB, defaultDataSB } from './story-utils/storyData.js';

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table/Resizing',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<unknown>;

export const DefaultStyle: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableResizing />,
};

export const ExtraCellPadding: Story = {
  render: () => <AdvancedTable extraCellPadding data={defaultDataSB} columns={columnsSB} enableResizing />,
};

export const Bordered: Story = {
  render: () => <AdvancedTable bordered data={defaultDataSB} columns={columnsSB} enableResizing />,
};
