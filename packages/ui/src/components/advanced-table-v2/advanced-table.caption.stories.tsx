import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { AdvancedTable } from './advanced-table.component.js';
import { makePersonData, personColumns } from './story-utils/index.js';

const data = makePersonData(10);

const columns = personColumns;

const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2/Caption',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

// No accessible name at all — fine when surrounding context (e.g. a page
// heading right above the table) already identifies it for every user.
export const NoCaption: Story = {
  name: 'No caption (relies on surrounding context)',
  render: () => <AdvancedTable data={data} columns={columns} />,
};

// `caption` renders a real <caption> inside the table, giving it an accessible
// name — but by default it's visually hidden (sr-only), so it only reaches
// screen reader users.
export const CaptionHiddenByDefault: Story = {
  name: 'caption (hidden visually by default)',
  render: () => <AdvancedTable data={data} columns={columns} caption="People" />,
};

// Add `showCaption` to also show that same text visibly above the table.
export const CaptionVisible: Story = {
  name: 'caption + showCaption',
  render: () => <AdvancedTable data={data} columns={columns} caption="People" showCaption />,
};

// `aria-labelledby` points at an element elsewhere on the page instead —
// useful when a heading you're already rendering (and want visible either
// way) should double as the table's accessible name, so it isn't duplicated
// inside the table via `caption`.
export const LabelledByExternalHeading: Story = {
  name: 'aria-labelledby (no caption)',
  render: () => (
    <div>
      <h2 id="caption-story-heading" className="mb-2 typography-body-7 font-bold">
        People
      </h2>
      <AdvancedTable data={data} columns={columns} aria-labelledby="caption-story-heading" />
    </div>
  ),
};
