/* eslint-disable no-console */
import { type Meta, type StoryFn, type StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';

import { FlexiCellAdornment } from '../flexi-cell/components/flexi-cell-adornment/flexi-cell-adornment.component.js';
import { FlexiCellButton } from '../flexi-cell/components/flexi-cell-button/flexi-cell-button.component.js';
import { FlexiCellHint } from '../flexi-cell/components/flexi-cell-hint/flexi-cell-hint.component.js';
import { FlexiCellLabel } from '../flexi-cell/components/flexi-cell-label/flexi-cell-label.component.js';
import { InfoIcon } from '../icon/index.js';
import { FlexiCell } from '../index.js';

import { FilterButtons, FilterButtonsProps, FilterInput } from './components/index.js';
import { Filter } from './filter.component.js';

function StoryFilter({ filterButtons }: FilterButtonsProps) {
  const [selected, setSelected] = useState<string>('one');

  return (
    <Filter>
      <FilterInput onChange={({ target: { value } }) => console.log(value)} />
      <FilterButtons filterButtons={filterButtons} selectedButton={selected} onClick={id => setSelected(id)} />
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
    (Story: StoryFn) => (
      <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '1rem', width: '50%' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    children: {
      description: '`Filter` Should contain `FilterInput` and `FilterButtons` components',
      /* TODO: change to more appropriate type for children argument */
      type: 'string',
    },
    filterButtons: {
      description:
        ' `FilterButtons` An array of FilterButtonProps that generate buttons for the filter \n\n- id: used to identify selected button and for key `string` \n\n- text: text on the button `string`',
    },
    onClick: {
      description: '`FilterButtons` Function that is called when a button on the filter is clicked',
      type: 'function',
    },
    onChange: {
      description: '`FilterInput` Function that is called when the input is changed',
      type: 'function',
    },
    selectedButton: {
      description: '`FilterButtons` id of which button should be selected',
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
    (Story: StoryFn) => (
      <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '1rem', width: '100%' }}>
        <Story />
      </div>
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
        text: 'International Transfers',
      },
      {
        id: 'six',
        text: 'Recipients',
      },
      {
        id: 'seven',
        text: 'Transfers',
      },
      {
        id: 'eight',
        text: 'Deposits',
      },
      {
        id: 'nine',
        text: 'Withdrawls',
      },
      {
        id: 'ten',
        text: 'Invoices',
      },
      {
        id: 'eleven',
        text: 'Loans',
      },
      {
        id: 'twelve',
        text: 'Interest',
      },
      {
        id: 'thirteen',
        text: 'Debit',
      },
      {
        id: 'fourteen',
        text: 'Credit Card',
      },
      {
        id: 'fifteen',
        text: 'Investment',
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

/**
 * > Filter with no search box example
 */
export const NoSearchBox = () => {
  const [selected, setSelectedFilter] = useState<string>('one');

  const filterButtons = [
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
  ];

  return (
    <Filter>
      <FilterButtons filterButtons={filterButtons} selectedButton={selected} onClick={id => setSelectedFilter(id)} />
    </Filter>
  );
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

  return (
    <div className="flex flex-col gap-3">
      <Filter>
        <FilterInput value={searchValue} onChange={({ target: { value } }) => setSearchValue(value)} />
        <FilterButtons filterButtons={FILTERS} selectedButton={selectedFilter} onClick={id => setSelectedFilter(id)} />
      </Filter>
      <div>
        {filteredAccounts.map(({ title, id, payees }) => (
          <div key={id}>
            <h3 className="mb-3 border-b border-border-muted-soft pb-1 font-normal text-text-body">{title}</h3>
            {payees.map(({ name, number, paidAt, bank, code }) =>
              paidAt ? (
                <FlexiCell
                  tag="a"
                  href="#"
                  key={name}
                  before={
                    <FlexiCellAdornment>
                      <svg
                        className="max-sm:size-5 sm:size-6"
                        viewBox="0 0 640 480"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="French flag"
                      >
                        <path d="M0 0H640V480H0V0Z" fill="white" />
                        <path d="M0 0H213.3V480H0V0Z" fill="#002654" />
                        <path d="M426.7 0H640V480H426.7V0Z" fill="#CE1126" />
                      </svg>
                    </FlexiCellAdornment>
                  }
                  after={
                    <FlexiCellAdornment align="center">
                      <FlexiCellLabel rightLabel tag="h4">
                        {paidAt}
                      </FlexiCellLabel>
                    </FlexiCellAdornment>
                  }
                  size={{ initial: 'default', sm: 'large' }}
                >
                  <FlexiCellLabel tag="h4">{name + responsiveString}</FlexiCellLabel>
                  <FlexiCellHint className="-mb-1">{number}</FlexiCellHint>
                  <FlexiCellHint className="-mb-1">{bank}</FlexiCellHint>
                  <FlexiCellHint>{code}</FlexiCellHint>
                </FlexiCell>
              ) : (
                <FlexiCell
                  href="#"
                  dualAction
                  key={name}
                  before={
                    <FlexiCellAdornment>
                      <svg
                        className="size-4"
                        viewBox="0 0 640 480"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="French flag"
                      >
                        <path d="M0 0H640V480H0V0Z" fill="white" />
                        <path d="M0 0H213.3V480H0V0Z" fill="#002654" />
                        <path d="M426.7 0H640V480H426.7V0Z" fill="#CE1126" />
                      </svg>
                    </FlexiCellAdornment>
                  }
                  after={<FlexiCellButton icon={() => <InfoIcon look="outlined" />} />}
                >
                  <FlexiCellLabel tag="h4">{name}</FlexiCellLabel>
                  <FlexiCellHint className="-mb-1">{number}</FlexiCellHint>
                  <FlexiCellHint className="-mb-1">{bank}</FlexiCellHint>
                  <FlexiCellHint>{code}</FlexiCellHint>
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
