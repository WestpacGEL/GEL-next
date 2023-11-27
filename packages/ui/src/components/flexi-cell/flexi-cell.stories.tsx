import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { BpayIcon, GiftIcon, InfoIcon, MapPinIcon, PadlockIcon, SuccessIcon, WarningIcon } from '../icon/index.js';
import { Badge } from '../index.js';
import { VisaBlueSymbol } from '../symbol/index.js';

import { FlexiCell } from './flexi-cell.component.js';

const meta: Meta<typeof FlexiCell> = {
  title: 'Components/FlexiCell',
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
        <FlexiCell.Label tag="h3">Label</FlexiCell.Label>
        <FlexiCell.Hint>Hint</FlexiCell.Hint>
      </>
    ),
  },
};

/**
 * > Example for credit card display
 */
export const CreditCard: Story = {
  args: {},
  render: () => {
    return (
      <>
        <FlexiCell
          after={
            <FlexiCell.Adornment align="top">
              <FlexiCell.Label tag="h3" rightLabel>
                $9,999.99
              </FlexiCell.Label>
              <FlexiCell.Hint>avail $9,999.99</FlexiCell.Hint>
            </FlexiCell.Adornment>
          }
          href="#"
          tag="a"
          withBorder
        >
          <FlexiCell.Label tag="h3">Credit card Base Styles</FlexiCell.Label>
          <FlexiCell.Hint>Card ending in 1234</FlexiCell.Hint>
        </FlexiCell>
        <FlexiCell
          after={
            <FlexiCell.Adornment align="top">
              <FlexiCell.Label tag="h3" rightLabel>
                $9,999.99
              </FlexiCell.Label>
              <FlexiCell.Hint>avail $9,999.99</FlexiCell.Hint>
            </FlexiCell.Adornment>
          }
          href="#"
          tag="a"
          withBorder
          size={{ initial: 'default', sm: 'large' }}
        >
          <FlexiCell.Label tag="h3">Responsive Credit card Base Styles</FlexiCell.Label>
          <FlexiCell.Hint>Card ending in 1234</FlexiCell.Hint>
        </FlexiCell>
        <FlexiCell
          after={
            <FlexiCell.Adornment align="top">
              <FlexiCell.Label tag="h3" className="font-medium" rightLabel>
                $9,999.99
              </FlexiCell.Label>
              <FlexiCell.Hint>avail $9,999.99</FlexiCell.Hint>
            </FlexiCell.Adornment>
          }
          href="#"
          tag="a"
          withBorder
        >
          <FlexiCell.Label className="font-normal" tag="h3">
            Credit card different styles
          </FlexiCell.Label>
          <FlexiCell.Hint>Card ending in 1234</FlexiCell.Hint>
        </FlexiCell>
        <FlexiCell
          after={
            <FlexiCell.Adornment align="top">
              <FlexiCell.Label tag="h3" rightLabel>
                $9,999.99
              </FlexiCell.Label>
              <FlexiCell.Hint>avail $9,999.99</FlexiCell.Hint>
            </FlexiCell.Adornment>
          }
          href="#"
          tag="a"
          withBorder
        >
          <FlexiCell.Label tag="h3">Wrapping Credit CardCredit CardCredit CardCredit Card</FlexiCell.Label>
          <FlexiCell.Hint>
            Wrapping Card ending in 1234Card ending in 1234Card ending in 1234Card ending in 1234Card ending in 1234
          </FlexiCell.Hint>
        </FlexiCell>
        <FlexiCell
          after={
            <FlexiCell.Adornment align="top">
              <FlexiCell.Label tag="h3" rightLabel>
                $9,999.99
              </FlexiCell.Label>
              <FlexiCell.Hint>avail $9,999.99</FlexiCell.Hint>
            </FlexiCell.Adornment>
          }
          href="#"
          tag="a"
          withBorder
        >
          <FlexiCell.Label tag="h3" truncateText>
            Truncating Credit CardCredit CardCredit CardCredit Card
          </FlexiCell.Label>
          <FlexiCell.Hint truncateText>
            Truncating Card ending in 1234Card ending in 1234Card ending in 1234Card ending in 1234Card ending in 1234
          </FlexiCell.Hint>
        </FlexiCell>
      </>
    );
  },
};

/**
 * > Example for payee details, includes how to customise icon passed to button and Adornment leftGraphic
 */
export const PayeeDetails: Story = {
  args: {},
  render: () => {
    return (
      <>
        <FlexiCell
          after={
            <FlexiCell.Adornment align="center">
              <FlexiCell.Label tag="h3" rightLabel>
                Fri 5 Aug
              </FlexiCell.Label>
            </FlexiCell.Adornment>
          }
          before={
            <FlexiCell.Adornment>
              <BpayIcon color="hero" />
            </FlexiCell.Adornment>
          }
          tag="a"
          href="#"
        >
          <FlexiCell.Label tag="h3"> Default With Icon</FlexiCell.Label>
          <FlexiCell.Hint>Payee Details</FlexiCell.Hint>
        </FlexiCell>
        <FlexiCell
          after={
            <FlexiCell.Adornment align="center">
              <FlexiCell.Button icon={() => <InfoIcon color="muted" look="outlined" />} />
            </FlexiCell.Adornment>
          }
          before={
            <FlexiCell.Circle className="bg-muted text-white" aria-label="Walter White">
              WW
            </FlexiCell.Circle>
          }
          dualAction
          href="#"
        >
          <FlexiCell.Label tag="h3">With Circle and Info Button</FlexiCell.Label>
          <FlexiCell.Hint>Payee Details</FlexiCell.Hint>
        </FlexiCell>
        <FlexiCell
          after={
            <FlexiCell.Adornment align="center">
              <FlexiCell.Label tag="h3" rightLabel>
                Fri 5 Aug
              </FlexiCell.Label>
            </FlexiCell.Adornment>
          }
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
          tag="a"
          href="#"
        >
          <FlexiCell.Label tag="h3">With Flag</FlexiCell.Label>
          <FlexiCell.Hint>Payee Details</FlexiCell.Hint>
        </FlexiCell>
        <FlexiCell
          after={
            <FlexiCell.Adornment align="center">
              <FlexiCell.Label tag="h3" rightLabel>
                Fri 5 Aug
              </FlexiCell.Label>
            </FlexiCell.Adornment>
          }
          before={
            <FlexiCell.Adornment>
              <BpayIcon color="hero" className="max-sm:h-4 max-sm:w-4 sm:h-6 sm:w-6" />
            </FlexiCell.Adornment>
          }
          tag="a"
          href="#"
          size={{ initial: 'default', sm: 'large' }}
        >
          <FlexiCell.Label tag="h3"> Responsive With Resposive Icon</FlexiCell.Label>
          <FlexiCell.Hint>Payee Details</FlexiCell.Hint>
        </FlexiCell>
      </>
    );
  },
};

/**
 * > Examples of list items
 */
export const ListItems: Story = {
  args: {},
  render: () => {
    return (
      <>
        <FlexiCell tag="a" href="#" withBorder>
          <FlexiCell.Label tag="h3">List Item</FlexiCell.Label>
        </FlexiCell>
        <FlexiCell
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
          tag="a"
          href="#"
          withBorder
        >
          <FlexiCell.Label tag="h3">List Item With Flag</FlexiCell.Label>
        </FlexiCell>
        <FlexiCell
          before={
            <FlexiCell.Adornment>
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
            </FlexiCell.Adornment>
          }
          tag="a"
          href="#"
          withBorder
          size={{ initial: 'default', sm: 'large' }}
        >
          <FlexiCell.Label className="max-sm:mt-0.5 sm:mt-1" tag="h3">
            Responsive List Item With Responsive Flag
          </FlexiCell.Label>
        </FlexiCell>
      </>
    );
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
                  <FlexiCell.Adornment>
                    <FlexiCell.Label className="font-semibold" rightLabel tag="h4">
                      {amount}
                    </FlexiCell.Label>
                    <FlexiCell.Hint>available $9,999</FlexiCell.Hint>
                  </FlexiCell.Adornment>
                }
                size={{ initial: 'default', sm: 'large' }}
              >
                <FlexiCell.Label className="font-normal" tag="h4">
                  {name}
                </FlexiCell.Label>
                <FlexiCell.Hint>{number}</FlexiCell.Hint>
              </FlexiCell>
            ))}
          </div>
        ))}
      </>
    );
  },
};

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
      },
      {
        initials: 'JW',
        name: 'Joss Wight',
        paidAt: 'Mon 1 Aug',
        number: '098-567 465352',
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
      },
      {
        initials: 'AC',
        name: 'Alice Cartwright',
        number: '950-456 345363',
        paidAt: undefined,
      },
    ],
  },
  {
    title: 'B',
    id: 'b',
    payees: [
      {
        initials: 'BN',
        name: 'Benjamin North',
        number: '098-123 745362',
        paidAt: undefined,
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
            {payees.map(({ name, initials, number, paidAt }) =>
              paidAt ? (
                <FlexiCell
                  tag="a"
                  href="#"
                  key={name}
                  before={
                    <FlexiCell.Circle className="bg-muted text-white max-sm:h-5 max-sm:w-5 sm:h-6 sm:w-6">
                      {initials}
                    </FlexiCell.Circle>
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
                  <FlexiCell.Hint>{number}</FlexiCell.Hint>
                </FlexiCell>
              ) : (
                <FlexiCell
                  href="#"
                  dualAction
                  key={name}
                  before={<FlexiCell.Circle className="bg-muted text-white">{initials}</FlexiCell.Circle>}
                  after={<FlexiCell.Button icon={() => <InfoIcon look="outlined" />} />}
                >
                  <FlexiCell.Label tag="h4">{name}</FlexiCell.Label>
                  <FlexiCell.Hint>{number}</FlexiCell.Hint>
                </FlexiCell>
              ),
            )}
          </div>
        ))}
      </>
    );
  },
};

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
export const ForeinCurrencyPayeeList: Story = {
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
      </>
    );
  },
};

const ICON_LIST = [
  (props: { className?: string }) => <GiftIcon className={props.className} look="outlined" color="hero" />,
  (props: { className?: string }) => <PadlockIcon className={props.className} look="outlined" color="hero" />,
  (props: { className?: string }) => <MapPinIcon className={props.className} look="outlined" color="hero" />,
];

/**
 * > Example of how product tiles could be made
 */
export const ProductTiles: Story = {
  args: {},
  render: () => {
    const title = 'Westpac specials and product offers';
    const subtitle = 'Discounts and cashback from select merchants & products offers from Westpac';
    return (
      <>
        {ICON_LIST.map(Icon => (
          <FlexiCell
            tag="a"
            href="#"
            withBorder
            withArrow
            key={title}
            before={
              <FlexiCell.Adornment className="max-sm:hidden">
                <Icon />
              </FlexiCell.Adornment>
            }
            size={{ initial: 'default', sm: 'large' }}
          >
            <Icon className="sm:hidden" />
            <FlexiCell.Label className="text-hero" tag="h4">
              {title}
            </FlexiCell.Label>
            <FlexiCell.Hint>{subtitle}</FlexiCell.Hint>
          </FlexiCell>
        ))}
      </>
    );
  },
};

/**
 * > Example of product tiles with the extra icon could be made
 */
export const ProductTilesWithExtraIcon: Story = {
  args: {},
  render: () => {
    const title = 'Westpac specials and product offers';
    const subtitle = 'Discounts and cashback from select merchants & products offers from Westpac';
    return (
      <>
        <FlexiCell
          tag="a"
          href="#"
          withBorder
          withArrow
          key={title}
          before={
            <FlexiCell.Adornment className="max-sm:hidden">
              <GiftIcon look="outlined" color="hero" />
            </FlexiCell.Adornment>
          }
          after={
            <Badge className="h-fit w-fit" color="success">
              Completed
            </Badge>
          }
        >
          <GiftIcon className="sm:hidden" look="outlined" color="hero" />
          <FlexiCell.Label className="text-hero" tag="h4">
            {title}
          </FlexiCell.Label>
          <FlexiCell.Hint>{subtitle}</FlexiCell.Hint>
        </FlexiCell>
        <FlexiCell
          tag="a"
          href="#"
          withBorder
          withArrow
          key={title}
          before={
            <FlexiCell.Adornment className="max-sm:hidden">
              <PadlockIcon look="outlined" color="hero" />
            </FlexiCell.Adornment>
          }
          after={
            <Badge className="h-fit w-fit" color="success">
              Completed
            </Badge>
          }
          size={{ initial: 'default', sm: 'large' }}
        >
          <PadlockIcon className="sm:hidden" look="outlined" color="hero" />
          <FlexiCell.Label className="text-hero" tag="h4">
            {title + responsiveString}
          </FlexiCell.Label>
          <FlexiCell.Hint>{subtitle}</FlexiCell.Hint>
        </FlexiCell>
      </>
    );
  },
};

const MOCK_PROMOS = [
  {
    title: 'This is talking about the bonus',
    subtitle: 'This is more about the bonus and all the other exciting things about this.',
    stars: true,
  },
  {
    title: 'This is a longer heading talking all about the bonus this one wraps',
    subtitle: 'This is more about the bonus',
    stars: false,
  },
  {
    title: 'This is talking about the bonus',
    subtitle: 'This is more about the bonus and all the other exciting things about this.',
    stars: false,
  },
];

/**
 * > Example of horizontal promo tiles
 */
export const PromotilesHorizontalList: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex flex-col">
        {MOCK_PROMOS.map(({ title, subtitle, stars }) => (
          <FlexiCell
            tag="a"
            href="#"
            key={title}
            withBorder
            before={
              <FlexiCell.Adornment align="center">
                <FlexiCell.Circle className="h-[70px] w-[70px] border border-border bg-white">
                  <VisaBlueSymbol />
                </FlexiCell.Circle>
              </FlexiCell.Adornment>
            }
            topBadge={({ className }) => (
              <Badge className={className + ' leading-normal'} aria-hidden={stars ?? 'true'}>
                {stars ? '✭' : 'Corner flag'}
              </Badge>
            )}
          >
            <FlexiCell.Label className="text-[12px] font-normal text-muted" tag="p">
              MYER
            </FlexiCell.Label>
            <FlexiCell.Label className="text-hero" tag="h4">
              {title}
            </FlexiCell.Label>
            <FlexiCell.Hint>{subtitle}</FlexiCell.Hint>
            <FlexiCell.Footer>
              <Badge color="primary">Badge 1</Badge>
              <Badge color="faint">Badge 2</Badge>
            </FlexiCell.Footer>
          </FlexiCell>
        ))}
      </div>
    );
  },
};

const MOCK_VERTICAL_PROMOS = [
  {
    title: 'About the bonus',
    subtitle:
      'The bonus and all the other exciting things. This will truncate if it gets too long with some extra text to make it a bit longer.',
  },
  {
    title: 'Short heading',
    subtitle: 'This is more about the bonus.',
  },
  {
    title: 'This is a longer heading talking all about the bonus this one wraps',
    subtitle: 'This is more about the bonus',
  },
];

/**
 * > Example of vertical promo tiles
 */
export const PromotilesVerticalList: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex gap-3">
        {MOCK_VERTICAL_PROMOS.map(({ title, subtitle }) => (
          <FlexiCell
            className="max-sm:h-[255px] max-sm:min-w-[214px] sm:h-[277px] sm:min-w-[298px] sm:max-w-[298px]"
            href="#"
            tag="a"
            withBorder
            topBadge={({ className }) => <Badge className={className + ' leading-normal'}>Corner flag</Badge>}
          >
            <FlexiCell.Adornment className="mb-1">
              <img
                src="https://images.unsplash.com/photo-1657299170950-87e5b0eaf77c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                alt=""
                className="h-10.5 w-full object-cover"
              />
            </FlexiCell.Adornment>

            <FlexiCell.Label className="text-[12px] font-normal text-muted" tag="p">
              MYER
            </FlexiCell.Label>
            <FlexiCell.Label className="text-hero" tag="h4">
              {title}
            </FlexiCell.Label>
            <FlexiCell.Hint className="line-clamp-3 max-sm:h-10 sm:h-10.5">{subtitle}</FlexiCell.Hint>
            <FlexiCell.Footer className="absolute max-sm:bottom-2 max-sm:left-2 sm:bottom-3 sm:left-3">
              <Badge color="primary">Badge 1</Badge>
              <Badge color="faint">Badge 2</Badge>
            </FlexiCell.Footer>
          </FlexiCell>
        ))}
      </div>
    );
  },
};
