import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { ArrowRightIcon, BpayIcon, GiftIcon, InfoIcon, MapPinIcon, PadlockIcon, TickIcon } from '../icon/index.js';
import { Badge, ErrorMessage } from '../index.js';
import { VisaBlueSymbol } from '../symbol/index.js';

import { FlexiCellAdornment } from './components/flexi-cell-adornment/flexi-cell-adornment.component.js';
import { FlexiCellButton } from './components/flexi-cell-button/flexi-cell-button.component.js';
import { FlexiCellCircle } from './components/flexi-cell-circle/flexi-cell-circle.component.js';
import { FlexiCellFooter } from './components/flexi-cell-footer/flexi-cell-footer.component.js';
import { FlexiCellHint } from './components/flexi-cell-hint/flexi-cell-hint.component.js';
import { FlexiCellLabel } from './components/flexi-cell-label/flexi-cell-label.component.js';
import { FlexiCell } from './flexi-cell.component.js';

const meta: Meta<typeof FlexiCell> = {
  title: 'Components/FlexiCell/Patterns',
  component: FlexiCell,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  argTypes: {
    after: {
      description: 'Renders an element on the right',
      type: { name: 'string' },
    },
    before: {
      description: 'Renders an element on the left',
      type: { name: 'string' },
    },
    children: {
      description: 'The middle content of FlexiCell',
      type: { name: 'string' },
    },
    href: {
      description: 'href in case it is an "a" tag',
      type: { name: 'string' },
    },
    /**
     * The native tag that flexicell will be rendered
     */
    // tag?: keyof JSX.IntrinsicElements;
    withArrow: {
      description: 'Adds an arrow on top right',
      type: { name: 'boolean' },
    },
    withBorder: {
      description: 'Adds a border radius and a border',
      type: { name: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<unknown>;

const responsiveString = ' (Responsive)';

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    tag: 'a',
    href: '#',
    withBorder: true,
    body: true,
    after: 'after',
    before: 'before',
    children: (
      <>
        <FlexiCellLabel tag="h3">Label</FlexiCellLabel>
        <FlexiCellHint>Hint</FlexiCellHint>
      </>
    ),
  },
};

const MOCK_ACCOUNTS = [
  {
    title: 'Cash',
    id: 'cash',
    accounts: [
      {
        name: 'Westpac Choice',
        amount: '$1,234.99',
        number: '732-123 746587',
      },
      {
        name: 'Offset account for loan',
        amount: '$20,000.00',
        number: '732-123 123456',
      },
    ],
  },
  {
    title: 'Foreign currency',
    id: 'foreign-currency',
    accounts: [
      {
        name: 'US Dollar Currency Account',
        amount: '$3,957.57',
        number: '123-456 1234567',
      },
      {
        name: 'British pound Currency Account',
        amount: '$9,999,999,999.99',
        number: '123-456 1234567',
      },
    ],
  },
  {
    title: 'Credit cards',
    id: 'credit-cards',
    accounts: [
      {
        name: 'Altitude Black World Mastercard',
        amount: '-$3,957.57',
        number: 'Card ending in 1234',
      },
    ],
  },
];

/**
 * > Example of how an account list could be made
 */
export const AccountLists: Story = {
  args: {},
  render: () => {
    return (
      <>
        {MOCK_ACCOUNTS.map(({ title, id, accounts }) => (
          <div key={id}>
            <h3 className="mb-3 font-normal">{title}</h3>
            {accounts.map(({ name, amount, number }) => (
              <FlexiCell
                tag="a"
                href="#"
                withBorder
                key={name}
                after={
                  <FlexiCellAdornment>
                    <FlexiCellLabel className="font-semibold" rightLabel tag="h4">
                      {amount}
                    </FlexiCellLabel>
                    <FlexiCellHint>available $9,999</FlexiCellHint>
                  </FlexiCellAdornment>
                }
                size={{ initial: 'default', sm: 'large' }}
              >
                <FlexiCellLabel className="font-normal" tag="h4">
                  {name}
                </FlexiCellLabel>
                <FlexiCellHint>{number}</FlexiCellHint>
              </FlexiCell>
            ))}
          </div>
        ))}
      </>
    );
  },
};
AccountLists.storyName = 'Account lists';

const MOCK_FOREIGNPAYEES = [
  {
    title: 'Recently Paid',
    id: 'recently-paid',
    payees: [
      {
        name: 'Andrew Jones',
        paidAt: 'Fri 5 Aug',
        number: '10964567891',
        bank: 'BANK OF ANTARCTICA, ANTARCTICA',
        code: 'NFBKAS33XXX',
      },
      {
        name: 'Joss Wight',
        paidAt: 'Mon 1 Aug',
        number: '10964567892',
        bank: 'LLOYDS OF LONDON, DEVON',
        code: 'NFBKAS33XXX',
      },
    ],
  },
  {
    title: 'A',
    id: 'a',
    payees: [
      {
        name: 'American Apparel',
        number: '10964567894',
        bank: 'BANK OF AMERICA, NEW YORK',
        code: 'NFBKAS33XXX',
        paidAt: undefined,
      },
      {
        initials: 'AC',
        name: 'Alfred Prince',
        number: '10964567895',
        bank: 'BANK OF AMERICA, NEW YORK',
        code: 'NFBKAS33XXX',
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
        paidAt: undefined,
      },
    ],
  },
];

/**
 * > Example of how a foreign currency payee list could be made
 */
export const ForeignCurrencyPayeeList: Story = {
  args: {},
  render: () => {
    return (
      <>
        {MOCK_FOREIGNPAYEES.map(({ title, id, payees }) => (
          <div key={id}>
            <h3 className="mb-3 border-b-[1px] border-border pb-1 font-normal">{title}</h3>
            {payees.map(({ name, number, paidAt, bank, code }) =>
              paidAt ? (
                <FlexiCell
                  tag="a"
                  href="#"
                  key={name}
                  before={
                    <FlexiCellAdornment>
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
      </>
    );
  },
};

ForeignCurrencyPayeeList.storyName = 'Foreign currency payee list';

/**
 * > Examples of list items
 */
export const ListItems: Story = {
  args: {},
  render: () => {
    return (
      <>
        <FlexiCell tag="a" href="#" withBorder>
          <FlexiCellLabel tag="h3">List Item</FlexiCellLabel>
        </FlexiCell>
        <FlexiCell
          before={
            <FlexiCellAdornment>
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
            </FlexiCellAdornment>
          }
          tag="a"
          href="#"
          withBorder
        >
          <FlexiCellLabel tag="h3">List Item With Flag</FlexiCellLabel>
        </FlexiCell>
        <FlexiCell
          before={
            <FlexiCellAdornment>
              <svg
                className="max-sm:h-4 max-sm:w-4 sm:h-6 sm:w-6"
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
          tag="a"
          href="#"
          withBorder
          size={{ initial: 'default', sm: 'large' }}
        >
          <FlexiCellLabel className="max-sm:mt-0.5 sm:mt-1" tag="h3">
            Responsive List Item With Responsive Flag
          </FlexiCellLabel>
        </FlexiCell>
      </>
    );
  },
};
ListItems.storyName = 'List items';

const MOCK_PAYEES = [
  {
    title: 'Recently Paid',
    id: 'recently-paid',
    payees: [
      {
        initials: 'AJ',
        name: 'Andrew Jones',
        paidAt: 'Fri 5 Aug',
        number: '123-986 463846',
        bpay: false,
      },
      {
        initials: 'JW',
        name: 'Joss Wight',
        paidAt: 'Mon 1 Aug',
        number: '098-567 465352',
        bpay: false,
      },
    ],
  },
  {
    title: 'A',
    id: 'a',
    payees: [
      {
        initials: 'AO',
        name: 'Active OOSH',
        number: '857-434 856383',
        paidAt: undefined,
        bpay: true,
      },
      {
        initials: 'AC',
        name: 'Alice Cartwright',
        number: '950-456 345363',
        paidAt: undefined,
        bpay: false,
      },
    ],
  },
  {
    title: 'B',
    id: 'b',
    payees: [
      {
        initials: 'BN',
        name: 'Active OOSH',
        number: '123-986 463846',
        paidAt: undefined,
        bpay: true,
      },
      {
        initials: 'BN',
        name: 'Benjamin North',
        number: '098-123 745362',
        paidAt: undefined,
        bpay: false,
      },
    ],
  },
];

/**
 * > Example of how a payee list could be made
 */
export const PayeeList: Story = {
  args: {},
  render: () => {
    return (
      <>
        {MOCK_PAYEES.map(({ title, id, payees }) => (
          <div key={id}>
            <h3 className="mb-3 border-b-[1px] border-border pb-1 font-normal">{title}</h3>
            {payees.map(({ name, initials, bpay, number, paidAt }) =>
              paidAt ? (
                <FlexiCell
                  tag="a"
                  href="#"
                  key={name}
                  before={
                    bpay ? (
                      <BpayIcon color="hero" />
                    ) : (
                      <FlexiCellCircle className="bg-muted text-white max-sm:h-5 max-sm:w-5 sm:h-6 sm:w-6">
                        {initials}
                      </FlexiCellCircle>
                    )
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
                  <FlexiCellHint>{number}</FlexiCellHint>
                </FlexiCell>
              ) : (
                <FlexiCell
                  href="#"
                  dualAction
                  key={name}
                  before={
                    bpay ? (
                      <BpayIcon color="hero" />
                    ) : (
                      <FlexiCellCircle className="bg-muted text-white max-sm:h-5 max-sm:w-5 sm:h-6 sm:w-6">
                        {initials}
                      </FlexiCellCircle>
                    )
                  }
                  after={<FlexiCellButton icon={() => <InfoIcon look="outlined" />} />}
                >
                  <FlexiCellLabel tag="h4">{name}</FlexiCellLabel>
                  <FlexiCellHint>{number}</FlexiCellHint>
                </FlexiCell>
              ),
            )}
          </div>
        ))}
      </>
    );
  },
};
PayeeList.storyName = 'Payee list';

/**
 * > Status tiles
 *
 * This tile has a responsive content layout:
 *
 * - 0px - XXpx: Symbol is stacked above labels, tile padding 12px
 * - XXpx +: Symbol is inline to the left of the labels tile padding 18px
 *
 * Change the preview size of this screen to demonstrate.
 */
export const StatusTiles = () => {
  const title = 'Step title';
  const subtitle = 'Description of the step.';

  return (
    <>
      <FlexiCell
        tag="a"
        href="#"
        withBorder
        before={
          <FlexiCellAdornment className="max-sm:hidden">
            <PadlockIcon look="outlined" color="hero" />
          </FlexiCellAdornment>
        }
        after={
          <>
            <Badge className="h-fit w-fit" color="success">
              Completed
            </Badge>
            <TickIcon color="success" />
          </>
        }
        size={{ initial: 'default', sm: 'large' }}
      >
        <PadlockIcon className="mb-1 sm:hidden" look="outlined" color="hero" />
        <FlexiCellLabel className="text-hero" tag="h4">
          {title}
        </FlexiCellLabel>
        <FlexiCellHint>{subtitle}</FlexiCellHint>
        <Badge className="h-fit w-fit" color="faint" soft>
          Est. Time or Steps x of y
        </Badge>
      </FlexiCell>
      <FlexiCell
        tag="a"
        href="#"
        withBorder
        before={
          <FlexiCellAdornment className="max-sm:hidden">
            <PadlockIcon look="outlined" color="hero" />
          </FlexiCellAdornment>
        }
        after={
          <>
            <Badge className="h-fit w-fit" color="faint" soft>
              In-progress
            </Badge>
            <ArrowRightIcon color="primary" />
          </>
        }
        size={{ initial: 'default', sm: 'large' }}
      >
        <PadlockIcon className="mb-1 sm:hidden" look="outlined" color="hero" />
        <FlexiCellLabel className="text-hero" tag="h4">
          {title}
        </FlexiCellLabel>
        <FlexiCellHint>{subtitle}</FlexiCellHint>
        <Badge className="h-fit w-fit" color="faint" soft>
          Est. Time or Steps x of y
        </Badge>
      </FlexiCell>
      <FlexiCell
        tag="a"
        href="#"
        withBorder
        before={
          <FlexiCellAdornment className="max-sm:hidden">
            <PadlockIcon look="outlined" color="hero" />
          </FlexiCellAdornment>
        }
        after={
          <>
            <Badge className="h-fit w-fit" color="faint" soft>
              In-progress
            </Badge>
            <ArrowRightIcon color="primary" />
          </>
        }
        size={{ initial: 'default', sm: 'large' }}
      >
        <PadlockIcon className="mb-1 sm:hidden" look="outlined" color="hero" />
        <FlexiCellLabel className="text-hero" tag="h4">
          {title}
        </FlexiCellLabel>
        <FlexiCellHint>{subtitle}</FlexiCellHint>
        <ErrorMessage message="Error message" className="!mb-0" />
        <Badge className="h-fit w-fit" color="faint" soft>
          Est. Time or Steps x of y
        </Badge>
      </FlexiCell>
      <FlexiCell
        tag="a"
        href="#"
        withBorder
        before={
          <FlexiCellAdornment className="max-sm:hidden">
            <PadlockIcon look="outlined" color="hero" />
          </FlexiCellAdornment>
        }
        after={
          <>
            <Badge className="h-fit w-fit" color="faint" soft>
              Locked
            </Badge>
            <PadlockIcon look="outlined" color="hero" />
          </>
        }
        size={{ initial: 'default', sm: 'large' }}
      >
        <PadlockIcon className="mb-1 sm:hidden" look="outlined" color="hero" />
        <FlexiCellLabel className="text-hero" tag="h4">
          {title}
        </FlexiCellLabel>
        <FlexiCellHint>{subtitle}</FlexiCellHint>
        <Badge className="h-fit w-fit" color="faint" soft>
          Est. Time or Steps x of y
        </Badge>
      </FlexiCell>
    </>
  );
};
StatusTiles.storyName = 'Status tiles';
