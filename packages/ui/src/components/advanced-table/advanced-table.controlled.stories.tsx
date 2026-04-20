import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Table } from '@tanstack/react-table';
import { useState } from 'react';

import { AdvancedTable } from './advanced-table.component.js';
import { AdvancedPerson } from './story-utils/fakerData.js';
import { columnsSB, defaultDataSB } from './story-utils/storyData.js';

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table/Controlled Table',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<unknown>;

export const ControlledTableInstanceExample = () => {
  const [table, setTable] = useState<Table<AdvancedPerson>>();
  // eslint-disable-next-line no-console
  console.log('table instance:', table);
  return (
    <>
      <p>TEST TEXT PLEASE REMOVE</p>
      <p className="typography-body-8">
        This is a way to access the Tanstack table instance to get access to various data from the table/control the
        table. You can check what controls are available on the table instance in the console.
      </p>
      <p className="font-bold">NOTE: Not all controlswill work as they may not be implemented as part of our table.</p>
      <AdvancedTable data={defaultDataSB} columns={columnsSB} onTableReady={setTable} showPagination />
    </>
  );
};
