import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Row } from '@tanstack/react-table';

import { AdvancedTable } from './advanced-table.component.js';
import { AdvancedColumnProps } from './advanced-table.types.js';
import { AdvancedPerson } from './story-utils/fakerData.js';
import { columnsSB, defaultDataSB } from './story-utils/storyData.js';

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table/Detail Panel',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<unknown>;

const detailPanelData = defaultDataSB.slice(0, 5);

const guarantorColumns: AdvancedColumnProps<AdvancedPerson>[] = [
  { key: 'firstName', title: 'Guarantor' },
  { key: 'status', title: 'Commercial benefit' },
  { key: 'lastName', title: 'Facility' },
];

type VariedPerson = AdvancedPerson & {
  detailType?: 'summary' | 'instructions' | 'contact';
};

const variedData: VariedPerson[] = [
  { ...defaultDataSB[0], detailType: 'summary' },
  { ...defaultDataSB[1], detailType: 'instructions' },
  { ...defaultDataSB[2] }, // no detail panel
  { ...defaultDataSB[3], detailType: 'contact' },
  { ...defaultDataSB[4], detailType: 'summary' },
];

const variedColumns: AdvancedColumnProps<VariedPerson>[] = [
  { key: 'firstName', title: 'First Name' },
  { key: 'lastName', title: 'Last Name' },
  { key: 'status', title: 'Status' },
  { key: 'age', title: 'Age' },
];

function VariedDetailPanel({ row }: { row: Row<VariedPerson> }) {
  const { detailType } = row.original;

  switch (detailType) {
    case 'summary':
      return (
        <div className="flex flex-col gap-2 py-2">
          <p className="typography-body-8 font-bold">Profile Summary</p>
          <p className="typography-body-9">
            {row.original.firstName} {row.original.lastName} has made {row.original.visits} visits with a profile
            completion of {row.original.progress}%. Current status: {row.original.status}.
          </p>
        </div>
      );
    case 'instructions':
      return (
        <div className="flex flex-col gap-2 py-2">
          <p className="typography-body-8 font-bold">Action Required</p>
          <ul className="list-disc pl-6 typography-body-9">
            <li>Verify the identity of {row.original.firstName};</li>
            <li>Confirm all documentation has been received and reviewed; and</li>
            <li>Update the status accordingly.</li>
          </ul>
        </div>
      );
    case 'contact':
      return (
        <div className="flex flex-col gap-2 py-2">
          <p className="typography-body-8 font-bold">Contact Information</p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 typography-body-9">
            <dt className="font-bold">Name:</dt>
            <dd>
              {row.original.firstName} {row.original.lastName}
            </dd>
            <dt className="font-bold">Age:</dt>
            <dd>{row.original.age}</dd>
            <dt className="font-bold">Status:</dt>
            <dd>{row.original.status}</dd>
          </dl>
        </div>
      );
    default:
      return null;
  }
}

export const DetailPanel: Story = {
  render: () => (
    <AdvancedTable
      data={detailPanelData}
      columns={columnsSB}
      renderDetailPanel={row => (
        <div className="flex flex-col gap-2 py-2">
          <p className="typography-body-8 font-bold">
            Additional details for {row.original.firstName} {row.original.lastName}
          </p>
          <ul className="list-disc pl-6 typography-body-9">
            <li>Age: {row.original.age}</li>
            <li>Total visits: {row.original.visits}</li>
            <li>Profile progress: {row.original.progress}%</li>
            <li>Status: {row.original.status}</li>
          </ul>
          <p className="typography-body-9">
            This content is rendered independently of the table columns and can contain any arbitrary content such as
            forms, additional data, or instructions.
          </p>
        </div>
      )}
    />
  ),
};

export const DetailPanelBordered: Story = {
  render: () => (
    <AdvancedTable
      data={detailPanelData}
      columns={guarantorColumns}
      bordered
      renderDetailPanel={row => (
        <div className="flex flex-col gap-2 py-2">
          <p className="typography-body-9 font-bold">Where commercial benefit is not implied, you must:</p>
          <ul className="list-disc pl-6 typography-body-9">
            <li>Obtain a commercial benefit statement;</li>
            <li>
              Review the commercial benefit statement from the guarantor to ensure there is adequate commercial benefit;
              and
            </li>
            <li>Ensure the commercial benefit statement has been imaged under the deal.</li>
          </ul>
          <p className="typography-body-9 font-bold">
            Please detail what commercial benefit the guarantor ({row.original.firstName}) is receiving.
          </p>
        </div>
      )}
    />
  ),
};

export const DetailPanelVariedContent: Story = {
  render: () => (
    <AdvancedTable
      data={variedData}
      columns={variedColumns}
      getRowCanExpand={row => !!row.original.detailType}
      renderDetailPanel={row => <VariedDetailPanel row={row} />}
    />
  ),
};

export const DetailPanelWithSorting: Story = {
  render: () => (
    <AdvancedTable
      data={detailPanelData}
      columns={columnsSB}
      enableSorting
      renderDetailPanel={row => (
        <div className="py-2">
          <p className="typography-body-9">
            Detail panel for <strong>{row.original.firstName}</strong> — sorting is enabled on columns above.
          </p>
        </div>
      )}
    />
  ),
};

export const DetailPanelWithSelection: Story = {
  render: () => (
    <AdvancedTable
      data={detailPanelData}
      columns={columnsSB}
      enableRowSelection
      renderDetailPanel={row => (
        <div className="py-2">
          <p className="typography-body-9">
            Detail panel for <strong>{row.original.firstName}</strong> — row selection is enabled.
          </p>
        </div>
      )}
    />
  ),
};

export const DetailPanelSelectiveRows: Story = {
  render: () => (
    <AdvancedTable
      data={detailPanelData}
      columns={columnsSB}
      renderDetailPanel={row => (
        <div className="py-2">
          <p className="typography-body-9">
            Detail panel for <strong>{row.original.firstName}</strong>.
          </p>
        </div>
      )}
      getRowCanExpand={row => row.index % 2 === 0}
    />
  ),
};

export const DetailPanelWithRowPinning: Story = {
  render: () => (
    <AdvancedTable
      data={detailPanelData}
      columns={columnsSB}
      enableRowPinning
      showPagination
      renderDetailPanel={row => (
        <div className="py-2">
          <p className="typography-body-9">
            Detail panel for <strong>{row.original.firstName}</strong> — try pinning this row.
          </p>
        </div>
      )}
    />
  ),
};

export const DetailPanelWithPagination: Story = {
  render: () => (
    <AdvancedTable
      data={defaultDataSB.slice(0, 25)}
      columns={columnsSB}
      showPagination
      renderDetailPanel={row => (
        <div className="py-2">
          <p className="typography-body-9">
            Expanded content for <strong>{row.original.firstName}</strong>.
          </p>
        </div>
      )}
    />
  ),
};
