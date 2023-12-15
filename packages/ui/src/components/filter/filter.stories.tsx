/* eslint-disable no-console */
import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ButtonsProps } from './components/index.js';
import { Filter } from './filter.component.js';

function StoryFilter({ filterButtons }: ButtonsProps) {
  const [selected, setSelected] = useState<string>('one');

  return (
    <Filter>
      <Filter.Input onChange={({ target: { value } }) => console.log(value)} />
      <Filter.Buttons
        filterButtons={filterButtons}
        selectedButton={selected}
        onClick={id => setSelected(id)}
        resultsFound={2}
      />
    </Filter>
  );
}

// Typing is not included with Meta as it doesn't work nicely with this component and all props are described anyway
const meta: Meta = {
  title: 'Components/Filter',
  component: StoryFilter,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    story => (
      <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '1rem', width: '320px' }}>{story()}</div>
    ),
  ],
  argTypes: {
    children: {
      description: '`Filter` Should contain `Filter.Input` and `Filter.Buttons` components',
      type: { name: 'other', value: 'ReactNode' },
    },
    filterButtons: {
      description:
        ' `Filter.Buttons` An array of FilterButtonProps that generate buttons for the filter \n\n- id: used to identify selected button and for key `string` \n\n- text: text on the button `string`',
    },
    onClick: {
      description: '`Filter.Buttons` Function that is called when a button on the filter is clicked',
      type: 'function',
    },
    onChange: {
      description: '`Filter.Input` Function that is called when the input is changed',
      type: 'function',
    },
    resultsFound: {
      description: '`Filter.Buttons` Needed for custom `aria-description`, number of results filter returns',
      type: 'number',
    },
    selectedButton: {
      description: '`Filter.Buttons` id of which button should be selected',
      type: 'string',
    },
  },
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Filter example
 */
export const Default: Story = {
  decorators: [
    story => (
      <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '1rem', width: '500px' }}>{story()}</div>
    ),
  ],
  args: {
    filterButtons: [
      {
        id: 'one',
        text: 'United States',
      },
      {
        id: 'two',
        text: 'All International',
      },
    ],
  },
};

/**
 * > Filter with enough buttons to exceed screen width example
 */
export const ContentExceedingScreenWidth: Story = {
  args: {
    filterButtons: [
      {
        id: 'one',
        text: 'All',
      },
      {
        id: 'two',
        text: 'Payees',
      },
      {
        id: 'three',
        text: 'PayID',
      },
      {
        id: 'four',
        text: 'Billers',
      },
      {
        id: 'five',
        text: 'International Payees',
      },
    ],
  },
};

/**
 * > Filter with a button with long content example
 */
export const LongContent: Story = {
  args: {
    filterButtons: [
      {
        id: 'one',
        text: 'This is a filter with long content',
      },
      {
        id: 'two',
        text: 'Payees',
      },
      {
        id: 'three',
        text: 'PayID',
      },
      {
        id: 'four',
        text: 'Billers',
      },
    ],
  },
};

/**
 * > Filter with a button with long content example
 */
export const SmallestBreakpoint: Story = {
  args: {
    filterButtons: [
      {
        id: 'one',
        text: 'All',
      },
      {
        id: 'two',
        text: 'Payees',
      },
      {
        id: 'three',
        text: 'PayID',
      },
      {
        id: 'four',
        text: 'Billers',
      },
      {
        id: 'five',
        text: 'International Payees',
      },
    ],
  },
};
