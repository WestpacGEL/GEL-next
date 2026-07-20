/* eslint-disable react-hooks/rules-of-hooks */
import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../button/index.js';

import { AdvancedTable } from './advanced-table.component.js';
import { makePersonData, personColumns } from './story-utils/index.js';

const data = makePersonData(10);

const columns = personColumns;

const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2/Loading',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * `loading` with no data yet shows a centered indicator in place of the empty state.
 */
export const Loading: Story = {
  render: () => <AdvancedTable caption="People" columns={columns} data={[]} loading />,
};

/**
 * `loading` with rows already present (e.g. a background refetch) dims the whole
 * table with an overlay while the existing rows stay visible underneath.
 */
export const LoadingWithData: Story = {
  render: () => <AdvancedTable caption="People" columns={columns} data={data} loading />,
};

/**
 * `loadingStateProps` customizes the icon, title, and description shown while loading,
 * mirroring `emptyState`'s customization shape.
 */
export const CustomLoadingState: Story = {
  render: () => (
    <AdvancedTable
      caption="People"
      columns={columns}
      data={[]}
      loading
      loadingStateProps={{ title: 'Fetching people…', description: 'This should only take a moment.' }}
    />
  ),
};

/**
 * The consumer owns `loading` entirely: a button simulates fetching, showing the
 * no-data loading row on first load and the dimmed overlay on every refetch after.
 */
export const Controlled: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState<typeof data>([]);

    const refetch = () => {
      setLoading(true);
      setRows([]);
      setTimeout(() => {
        setRows(data);
        setLoading(false);
      }, 1500);
    };

    return (
      <>
        <Button className="mb-4" onClick={refetch}>
          {rows.length ? 'Refetch' : 'Load people'}
        </Button>
        <AdvancedTable caption="People" columns={columns} data={rows} loading={loading} />
      </>
    );
  },
};
