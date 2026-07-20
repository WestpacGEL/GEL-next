import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { AdvancedTable } from './advanced-table.component.js';
import { type AdvancedTableExpandedState } from './advanced-table.types.js';
import { type AdvancedPerson, makePersonData, personColumns } from './story-utils/index.js';

const treeData = makePersonData(20, 2);
const controlledTreeData = makePersonData(20, 4, 2);

const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2/Expanding',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Any row whose data includes a `subRows` array gets an expand control (no flag required).
 * Depth is communicated with indentation on the same column as the expand control.
 */
export const Default: Story = {
  render: () => <AdvancedTable caption="People" columns={personColumns} data={treeData} rowKey="id" />,
};

/**
 * `renderDetailPanel` renders arbitrary content beneath an expanded row, as a
 * full-width cell inside a valid table row. The prop passes the row data into the component.
 */
export const WithDetailPanel: Story = {
  render: () => {
    const flatData = makePersonData(8);
    return (
      <AdvancedTable
        caption="People"
        columns={personColumns}
        data={flatData}
        renderDetailPanel={(person: AdvancedPerson) => (
          <div>
            <p>You can access the data available to the related row:</p>
            <pre>{JSON.stringify(person, null, 2)}</pre>
          </div>
        )}
        rowKey="id"
      />
    );
  },
};

/**
 * `getRowCanExpand` restricts which rows offer expansion. Be wary when using this function, as it can hide what rows have nested data.
 */
export const RestrictedExpansion: Story = {
  render: () => {
    const flatData = makePersonData(8);
    return (
      <AdvancedTable
        caption="Only odd-age rows can expand"
        columns={personColumns}
        data={flatData}
        getRowCanExpand={(person: AdvancedPerson) => (person.age ?? 0) % 2 === 1}
        renderDetailPanel={(person: AdvancedPerson) => <p className="typography-body-9">Status: {person.status}</p>}
        rowKey="id"
      />
    );
  },
};

/**
 * Controlled: the parent owns expansion state via the `expanded` /
 * `onExpandedChange` pair. `expanded` also accepts `true` to expand every row.
 */
export const Controlled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expanded, setExpanded] = useState<AdvancedTableExpandedState>([]);

    let expandedSummary = 'none';
    if (expanded === true) {
      expandedSummary = 'all rows';
    } else if (expanded.length) {
      expandedSummary = expanded.join(', ');
    }

    return (
      <>
        <p className="pb-2 typography-body-8">Parent owns expansion. Expanded row IDs: {expandedSummary}</p>
        <AdvancedTable
          caption="Controlled expansion"
          columns={personColumns}
          data={controlledTreeData}
          expanded={expanded}
          onExpandedChange={setExpanded}
          rowKey="id"
        />
      </>
    );
  },
};
