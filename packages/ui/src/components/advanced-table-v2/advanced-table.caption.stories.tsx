import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { AdvancedTable } from './advanced-table.component.js';
import { makePersonData, personColumns } from './story-utils/index.js';

const data = makePersonData(30);

const columns = personColumns;

const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2/Caption',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * By default, the table does not render a caption. The table will still announce assign the caption to
 * screen reader users.
 */
export const NoCaption: Story = {
  name: 'No caption (relies on surrounding context)',
  render: () => <AdvancedTable caption="Employee dashboard" columns={columns} data={data} />,
};

/**
 * Add the `showCaption` to also show that same text visibly above the table.
 */
export const CaptionVisible: Story = {
  name: 'caption + showCaption',
  render: () => <AdvancedTable caption="People" columns={columns} data={data} showCaption />,
};

/**
 * If you are using a heading or block content to address the table, we can use the `aria-labelledby` prop to
 * target the labeling element. Tables should always be labeled with a caption (either with surrounding
 * context or by a heading).
 */
export const LabelledByExternalHeading: Story = {
  name: 'aria-labelledby (no caption)',
  render: () => (
    <div>
      <h2 className="mb-2 typography-body-7 font-bold" id="caption-story-heading">
        People
      </h2>
      <AdvancedTable aria-labelledby="caption-story-heading" columns={columns} data={data} />
    </div>
  ),
};
