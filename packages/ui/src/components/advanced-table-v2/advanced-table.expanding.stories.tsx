import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { AdvancedTable } from './advanced-table.component.js';
import { type AdvancedTableExpandedState } from './advanced-table.types.js';
import { type AdvancedPerson, makePersonData, personColumns } from './story-utils/index.js';

// Two levels of subRows so nested expand/collapse and depth indentation both
// have something to demonstrate.
const treeData = makePersonData(5, 2);

const columns = personColumns;

const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2/Expanding',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Any row whose data includes a `subRows` array gets an expand control (no
 * `enableExpanding` flag — expansion is always available). Depth is
 * communicated with indentation on the same column as the expand control.
 */
export const Default: Story = {
  render: () => <AdvancedTable data={treeData} columns={columns} caption="People" rowKey="id" />,
};

/**
 * `renderDetailPanel` renders arbitrary content beneath an expanded row, as a
 * full-width cell inside a valid table row. Here it's used on flat (non-tree)
 * data, so every row expands into its own detail panel rather than revealing
 * children.
 */
export const WithDetailPanel: Story = {
  render: () => {
    const flatData = makePersonData(8);
    return (
      <AdvancedTable
        data={flatData}
        columns={columns}
        caption="People"
        rowKey="id"
        renderDetailPanel={(person: AdvancedPerson) => (
          <dl className="grid grid-cols-[max-content_1fr] gap-x-2 typography-body-9">
            <dt className="font-medium">Status</dt>
            <dd>{person.status}</dd>
            <dt className="font-medium">Visits</dt>
            <dd>{person.visits}</dd>
          </dl>
        )}
      />
    );
  },
};

/**
 * `getRowCanExpand` restricts which rows offer expansion — here, only rows
 * with an odd `age` can expand into their detail panel.
 */
export const RestrictedExpansion: Story = {
  render: () => {
    const flatData = makePersonData(8);
    return (
      <AdvancedTable
        data={flatData}
        columns={columns}
        caption="Only odd-age rows can expand"
        rowKey="id"
        renderDetailPanel={(person: AdvancedPerson) => <p className="typography-body-9">Status: {person.status}</p>}
        getRowCanExpand={(person: AdvancedPerson) => (person.age ?? 0) % 2 === 1}
      />
    );
  },
};

function ControlledExpansionExample() {
  const [expanded, setExpanded] = useState<AdvancedTableExpandedState>([]);

  let expandedSummary = 'none';
  if (expanded === true) {
    expandedSummary = 'all rows';
  } else if (expanded.length) {
    expandedSummary = expanded.join(', ');
  }

  return (
    <>
      <p className="pb-2 typography-body-8">Parent owns expansion. Expanded: {expandedSummary}</p>
      <AdvancedTable
        data={treeData}
        columns={columns}
        caption="Controlled expansion"
        rowKey="id"
        expanded={expanded}
        onExpandedChange={setExpanded}
      />
    </>
  );
}

/**
 * Controlled: the parent owns expansion state via the `expanded` /
 * `onExpandedChange` pair. `expanded` also accepts the literal `true` sentinel
 * (every row expanded) — grouping uses this as its own implicit default.
 */
export const Controlled: Story = {
  render: () => <ControlledExpansionExample />,
};

/**
 * Demonstrates indentation across multiple nesting levels (4 levels deep).
 * Each row at successive depths is indented consistently, allowing the expand
 * toggle and text alignment to be verified across the tree structure.
 */
export const DeeplyNested: Story = {
  render: () => {
    const deepData = makePersonData(3, 2, 2, 2);
    return <AdvancedTable data={deepData} columns={columns} caption="Deeply nested people" rowKey="id" />;
  },
};
