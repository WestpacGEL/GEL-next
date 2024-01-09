/* eslint-disable no-console */
import { type Meta, type StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';

import { InfoIcon } from '../icon/index.js';
import { FlexiCell } from '../index.js';

import { FilterButtonsProps } from './components/index.js';
import { Filter } from './filter.component.js';

function StoryFilter({ filterButtons }: FilterButtonsProps) {
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

const FILTERS = [
  {
    id: 'ALL',
    text: 'All',
  },
  {
    id: 'USA',
    text: 'United States',
  },
  {
    id: 'BRL',
    text: 'Brazil',
  },
];

const responsiveString = ' (Responsive)';

type Payee = {
  bank: string;
  code: string;
  countryCode: string;
  name: string;
  number: string;
  paidAt?: string;
};

type ForeignPayee = {
  id: string;
  payees: Payee[];
  title: string;
};

const MOCK_FOREIGN_PAYEES: ForeignPayee[] = [
  {
    title: 'A',
    id: 'a',
    payees: [
      {
        name: 'American Apparel',
        number: '10964567894',
        bank: 'BANK OF AMERICA, NEW YORK',
        code: 'NFBKAS33XXX',
        countryCode: 'USA',
        paidAt: undefined,
      },
      {
        name: 'Alfred Prince',
        number: '10964567895',
        bank: 'BANK OF AMERICA, NEW YORK',
        code: 'NFBKAS33XXX',
        countryCode: 'USA',
        paidAt: undefined,
      },
    ],
  },
  {
    title: 'B',
    id: 'b',
    payees: [
      {
        name: 'Bruno de Souza',
        number: '10364567894',
        bank: 'BANK OF BRAZIL, SÃO PAULO',
        code: 'BRLAS33XXX',
        countryCode: 'BRL',
        paidAt: undefined,
      },
    ],
  },
  {
    title: 'H',
    id: 'h',
    payees: [
      {
        name: 'Havana Houseboats',
        number: '10964567896',
        bank: 'BANK OF CUBA, HAVANA',
        code: 'NFBKAS33XXX',
        countryCode: 'USA',
        paidAt: undefined,
      },
    ],
  },
];

/**
 * > Filter with contents inside
 */
export const FilterWithContent = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [searchValue, setSearchValue] = useState<string>('');

  const filteredAccounts = useMemo(() => {
    return MOCK_FOREIGN_PAYEES.map(({ payees, ...props }) => {
      return {
        payees: payees.filter(payee => {
          const payeeNameContainsSearch = payee.name.toUpperCase().indexOf(searchValue.toUpperCase()) !== -1;
          return selectedFilter === 'ALL'
            ? payeeNameContainsSearch
            : payeeNameContainsSearch && payee.countryCode === selectedFilter;
        }),
        ...props,
      };
    }).filter(({ payees }) => payees.length > 0);
  }, [searchValue, selectedFilter]);

  const resultsFound = useMemo(() => {
    return filteredAccounts.reduce((acc, accounts) => {
      return acc + accounts.payees.length;
    }, 0);
  }, [filteredAccounts]);

  return (
    <div className="flex flex-col gap-3">
      <Filter>
        <Filter.Input value={searchValue} onChange={({ target: { value } }) => setSearchValue(value)} />
        <Filter.Buttons
          filterButtons={FILTERS}
          selectedButton={selectedFilter}
          onClick={id => setSelectedFilter(id)}
          resultsFound={resultsFound}
        />
      </Filter>
      <div>
        {filteredAccounts.map(({ title, id, payees }) => (
          <div key={id}>
            <h3 className="mb-3 border-b-[1px] border-border pb-1 font-normal">{title}</h3>
            {payees.map(({ name, number, paidAt, bank, code }) =>
              paidAt ? (
                <FlexiCell
                  tag="a"
                  href="#"
                  key={name}
                  before={
                    <FlexiCell.Adornment>
                      <svg
                        className="max-sm:h-5 max-sm:w-5 sm:h-6 sm:w-6"
                        viewBox="0 0 640 480"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="French flag"
                      >
                        <path d="M0 0H640V480H0V0Z" fill="white" />
                        <path d="M0 0H213.3V480H0V0Z" fill="#002654" />
                        <path d="M426.7 0H640V480H426.7V0Z" fill="#CE1126" />
                      </svg>
                    </FlexiCell.Adornment>
                  }
                  after={
                    <FlexiCell.Adornment align="center">
                      <FlexiCell.Label rightLabel tag="h4">
                        {paidAt}
                      </FlexiCell.Label>
                    </FlexiCell.Adornment>
                  }
                  size={{ initial: 'default', sm: 'large' }}
                >
                  <FlexiCell.Label tag="h4">{name + responsiveString}</FlexiCell.Label>
                  <FlexiCell.Hint className="-mb-1">{number}</FlexiCell.Hint>
                  <FlexiCell.Hint className="-mb-1">{bank}</FlexiCell.Hint>
                  <FlexiCell.Hint>{code}</FlexiCell.Hint>
                </FlexiCell>
              ) : (
                <FlexiCell
                  href="#"
                  dualAction
                  key={name}
                  before={
                    <FlexiCell.Adornment>
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 640 480"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="French flag"
                      >
                        <path d="M0 0H640V480H0V0Z" fill="white" />
                        <path d="M0 0H213.3V480H0V0Z" fill="#002654" />
                        <path d="M426.7 0H640V480H426.7V0Z" fill="#CE1126" />
                      </svg>
                    </FlexiCell.Adornment>
                  }
                  after={<FlexiCell.Button icon={() => <InfoIcon look="outlined" />} />}
                >
                  <FlexiCell.Label tag="h4">{name}</FlexiCell.Label>
                  <FlexiCell.Hint className="-mb-1">{number}</FlexiCell.Hint>
                  <FlexiCell.Hint className="-mb-1">{bank}</FlexiCell.Hint>
                  <FlexiCell.Hint>{code}</FlexiCell.Hint>
                </FlexiCell>
              ),
            )}
          </div>
        ))}
        {!filteredAccounts.length && <h1>There is no match</h1>}
      </div>
    </div>
  );
};
