import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { ArrowRightIcon, InfoIcon, TickCircleIcon } from '../icon/index.js';
import { Badge, Button, Circle } from '../index.js';
import { GiftPictogram } from '../pictogram/index.js';

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
    badge: {
      description: 'Renders an element on the top right corner',
      type: { name: 'string' },
    },
    badgeZIndex: {
      description: 'zIndex for badge',
      type: { name: 'number' },
    },
    before: {
      description: 'Renders an element on the left',
      type: { name: 'string' },
    },
    body: {
      description: 'Injects the FlexiCell.Body inside of the children',
      type: { name: 'boolean' },
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

export const CreditCard: Story = {
  args: {
    tag: 'a',
    href: '#',
    withBorder: true,
    body: true,
    after: (
      <FlexiCell.Adornment align="top">
        <FlexiCell.Label tag="h3">$9,999.99</FlexiCell.Label>
        <FlexiCell.Hint>avail $9,999.99</FlexiCell.Hint>
      </FlexiCell.Adornment>
    ),
    children: (
      <>
        <FlexiCell.Label tag="h3">Credit card</FlexiCell.Label>
        <FlexiCell.Hint>Card ending in 1234</FlexiCell.Hint>
      </>
    ),
  },
};

export const Account: Story = {
  args: {
    tag: 'a',
    href: '#',
    withBorder: true,
    body: true,
    after: (
      <FlexiCell.Adornment align="top">
        <FlexiCell.Label tag="h3">$9,999.99</FlexiCell.Label>
      </FlexiCell.Adornment>
    ),
    children: (
      <>
        <FlexiCell.Label tag="h3">Account</FlexiCell.Label>
        <FlexiCell.Hint>032-123 12345678</FlexiCell.Hint>
      </>
    ),
  },
};

export const Payee: Story = {
  args: {
    tag: 'a',
    href: '#',
    withBorder: true,
    body: true,
    before: (
      <Circle className="bg-primary text-white" aria-label="Bruce">
        B
      </Circle>
    ),
    after: (
      <FlexiCell.Adornment align="center">
        <FlexiCell.Hint className="text-muted">Fri 5 Aug</FlexiCell.Hint>
      </FlexiCell.Adornment>
    ),
    children: (
      <>
        <h3 className="typography-body-8 font-normal">Payee</h3>
        <small className="text-muted">Payee details</small>
      </>
    ),
  },
};

export const PayeeWithInfo: Story = {
  args: {
    withBorder: true,
    body: true,
    before: (
      <Circle className="bg-muted text-white" aria-label="Walter White">
        WW
      </Circle>
    ),
    after: (
      <FlexiCell.Adornment align="center">
        <Button look="link" href="/somewhere" iconBefore={InfoIcon} aria-label="more info" />
      </FlexiCell.Adornment>
    ),
    children: (
      <a href="#" className="group text-[inherit] decoration-[inherit] focus:focus-outline">
        <h3 className="typography-body-8 font-normal">Payee</h3>
        <small className="text-muted">Payee details</small>
      </a>
    ),
  },
};

export const FlagPayee: Story = {
  args: {
    withBorder: true,
    body: true,
    before: <div>Flag</div>,
    after: (
      <FlexiCell.Adornment align="center">
        <Button look="link" href="/somewhere" iconBefore={InfoIcon} aria-label="more info" />
      </FlexiCell.Adornment>
    ),
    children: (
      <a href="#" className="group text-[inherit] decoration-[inherit] focus:focus-outline">
        <h3 className="typography-body-8 font-normal">Payee</h3>
        <small className="text-muted">Payee details</small>
      </a>
    ),
  },
};

export const ListItemWithFlag: Story = {
  args: {
    tag: 'a',
    href: '#',
    withBorder: true,
    body: true,
    before: <div>Flag</div>,
    children: <h3 className="typography-body-8 font-normal">List item</h3>,
  },
};

export const ListItem: Story = {
  args: {
    tag: 'a',
    href: '#',
    withBorder: true,
    body: true,
    children: <h3 className="typography-body-8 font-normal">List item</h3>,
  },
};

export const WestpacSpecialProduct: Story = {
  args: {
    tag: 'a',
    href: '#',
    withBorder: true,
    body: true,
    after: (
      <FlexiCell.Adornment align="top">
        <ArrowRightIcon color="link" aria-hidden="true" />
      </FlexiCell.Adornment>
    ),
    children: (
      <>
        <GiftPictogram mode="duo" className="h-[50px] w-[50px]" aria-hidden="true" />
        <h3 className="typography-body-8 font-normal">Westpac specials and product offers</h3>
        <FlexiCell.Hint>Discounts and cashback from select merchants & product offers from Westpac</FlexiCell.Hint>
      </>
    ),
  },
};

export const FlexiCellWithImage: Story = {
  args: {
    tag: 'a',
    href: '#',
    withBorder: true,
    body: true,
    children: (
      <>
        <img
          src="https://images.unsplash.com/photo-1657299170950-87e5b0eaf77c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
          alt=""
          className="mb-2 block w-full"
        />
        <FlexiCell.Label className="mb-[0.5rem]">MYER</FlexiCell.Label>
        <h3 className="typography-body-8 font-normal">Westpac specials and product offers</h3>
      </>
    ),
  },
};

export const StickyFooterExample: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex flex-col gap-2 lg:flex-row">
        {[
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quae possimus, nam nobis cumque ullam et harum, magni quam distinctio, corporis sunt saepe maxime quod. Sapiente voluptatibus sint dicta tenetur.',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quae possimus, nam nobis cumque ullam et harum, magni quam distinctio, corporis sunt saepe.',
          'Lorem ipsum dolor sit amet',
        ].map(title => (
          <FlexiCell
            withBorder
            key={title}
            badge={
              <Badge className="block" color="primary">
                Badge
              </Badge>
            }
          >
            <FlexiCell.Body>
              <img
                src="https://images.unsplash.com/photo-1657299170950-87e5b0eaf77c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                alt=""
                className="mb-2 block w-full"
              />
              <FlexiCell.Label className="mb-[0.5rem]">MYER</FlexiCell.Label>
              <h3 className="typography-body-8 font-normal">{title}</h3>
            </FlexiCell.Body>
            <FlexiCell.Footer>
              <Button size="small" soft>
                Share
              </Button>
            </FlexiCell.Footer>
          </FlexiCell>
        ))}
      </div>
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
// WIP
export const AccountList: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex flex-col gap-2">
        {MOCK_ACCOUNTS.map(({ title, id, accounts }) => (
          <div key={id} className="flex flex-col gap-3">
            <h3 className="m-0 font-normal">{title}</h3>
            <div className="flex flex-col gap-2">
              {accounts.map(({ name, amount, number }) => (
                <FlexiCell
                  tag="a"
                  href="#"
                  body
                  withBorder
                  key={name}
                  after={
                    <FlexiCell.Adornment align="top">
                      <FlexiCell.Label className="font-semibold" tag="h4">
                        {amount}
                      </FlexiCell.Label>
                      <FlexiCell.Hint>available</FlexiCell.Hint>
                    </FlexiCell.Adornment>
                  }
                >
                  <FlexiCell.Label className="font-normal" tag="h4">
                    {name}
                  </FlexiCell.Label>
                  <FlexiCell.Hint>{number}</FlexiCell.Hint>
                </FlexiCell>
              ))}
            </div>
          </div>
        ))}
      </div>
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

export const PayeeList: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex flex-col gap-2">
        {MOCK_PAYEES.map(({ title, id, payees }) => (
          <div key={id} className="flex flex-col gap-3">
            <h3 className="m-0 border-b border-border pb-1 font-normal">{title}</h3>
            <div className="flex flex-col gap-3">
              {payees.map(({ name, initials, paidAt, number }) => {
                return (
                  <FlexiCell
                    {...(paidAt ? { href: '#', tag: 'a' } : { tag: 'div' })}
                    key={name}
                    className="group"
                    body
                    before={
                      <FlexiCell.Adornment align="top">
                        <FlexiCell.Circle className="bg-muted text-white" aria-hidden="true">
                          {initials}
                        </FlexiCell.Circle>
                      </FlexiCell.Adornment>
                    }
                    after={
                      <FlexiCell.Adornment align="center">
                        {paidAt ? (
                          <FlexiCell.Hint tag="h4">{paidAt}</FlexiCell.Hint>
                        ) : (
                          <FlexiCell.Button tag="a" href="/somewhere" iconBefore={InfoIcon} aria-label="more info" />
                        )}
                      </FlexiCell.Adornment>
                    }
                  >
                    {paidAt ? (
                      <>
                        <FlexiCell.Label className="font-medium" tag="h4">
                          {name}
                        </FlexiCell.Label>
                        <FlexiCell.Hint>{number}</FlexiCell.Hint>
                      </>
                    ) : (
                      <a href="#" className="text-[inherit] decoration-[inherit] focus:focus-outline">
                        <FlexiCell.Label className="font-medium" tag="h4">
                          {name}
                        </FlexiCell.Label>
                        <FlexiCell.Hint>{number}</FlexiCell.Hint>
                      </a>
                    )}
                  </FlexiCell>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

const MOCK_COUNTRIES = [
  {
    title: 'Popular',
    id: 'popular',
    payees: [
      {
        code: 'IN',
        name: 'India',
      },
      {
        code: 'UK',
        name: 'United Kingdom',
      },
      {
        code: 'USA',
        name: 'United States',
      },
    ],
  },
  {
    title: 'A',
    id: 'a',
    payees: [
      {
        code: 'AI',
        name: 'Ascension Islands',
      },
      {
        code: 'AN',
        name: 'Andorra',
      },
      {
        code: 'UA',
        name: 'United Arab Emirates',
      },
      {
        code: 'AF',
        name: 'Afghanistan',
      },
    ],
  },
];

export const CountryList: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex flex-col gap-2">
        {MOCK_COUNTRIES.map(({ title, id, payees }) => (
          <div key={id} className="flex flex-col gap-3">
            <h3 className="m-0 border-b border-b-border pb-1 font-normal">{title}</h3>
            <div className="flex flex-col gap-3">
              {payees.map(({ name }) => {
                return (
                  <FlexiCell
                    tag="a"
                    href="#"
                    withBorder
                    body
                    key={name}
                    before={
                      <FlexiCell.Adornment align="top">
                        <svg
                          width="30"
                          height="24"
                          viewBox="0 0 640 480"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path d="M0 0H640V480H0V0Z" fill="white" />
                          <path d="M0 0H213.3V480H0V0Z" fill="#002654" />
                          <path d="M426.7 0H640V480H426.7V0Z" fill="#CE1126" />
                        </svg>
                      </FlexiCell.Adornment>
                    }
                  >
                    <FlexiCell.Label className="font-medium" tag="span">
                      {name}
                    </FlexiCell.Label>
                  </FlexiCell>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const ForeignCurrencyList: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex flex-col gap-2">
        {MOCK_PAYEES.map(({ title, id, payees }) => (
          <div key={id} className="flex flex-col gap-3">
            <h3 className="m-0 border-b border-b-border pb-1 font-normal">{title}</h3>
            <div className="flex flex-col gap-3">
              {payees.map(({ name, paidAt, number }) => {
                return (
                  <FlexiCell
                    {...(paidAt ? { href: '#', tag: 'a' } : { tag: 'div' })}
                    body
                    className="group"
                    key={name}
                    before={
                      <FlexiCell.Adornment align="top">
                        <svg
                          width="30"
                          height="24"
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
                        {paidAt ? (
                          <FlexiCell.Hint tag="h4">{paidAt}</FlexiCell.Hint>
                        ) : (
                          <FlexiCell.Button href="/somewhere" iconBefore={InfoIcon} aria-label="more info" />
                        )}
                      </FlexiCell.Adornment>
                    }
                  >
                    {paidAt ? (
                      <>
                        <FlexiCell.Label className="font-medium" tag="h4">
                          {name}
                        </FlexiCell.Label>
                        <FlexiCell.Hint>{number}</FlexiCell.Hint>
                      </>
                    ) : (
                      <a href="#" className="text-[inherit] decoration-[inherit] focus:focus-outline">
                        <FlexiCell.Label className="font-medium" tag="h4">
                          {name}
                        </FlexiCell.Label>
                        <FlexiCell.Hint>{number}</FlexiCell.Hint>
                      </a>
                    )}
                  </FlexiCell>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

const MOCK_PROMOS = [
  {
    title: 'Get 50% Off on All Products',
    subtitle: 'Limited time offer! Save big on our entire range of products.',
    stars: true,
  },
  {
    title: 'Exclusive Membership Benefits',
    subtitle: 'Unlock premium features and discounts with our membership program.',
    stars: false,
  },
  {
    title: 'New Arrival Alert!',
    subtitle: 'Discover the latest arrivals and stay ahead of the trend.',
    stars: false,
  },
  {
    title: 'Weekend Special Sale',
    subtitle: "Don't miss out on our weekend sale with massive discounts!",
    stars: false,
  },
];

export const PromotilesHorizontalList: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex flex-col gap-2">
        {MOCK_PROMOS.map(({ title, subtitle, stars }) => {
          return (
            <FlexiCell
              tag="a"
              href="#"
              key={title}
              withBorder
              body
              before={
                <FlexiCell.Adornment align="center">
                  <Circle className="h-[70px] w-[70px]">Target</Circle>
                </FlexiCell.Adornment>
              }
              badge={
                <Badge className="block" color="hero" aria-hidden={stars ?? 'true'}>
                  {stars ? '✭' : 'Corner flag'}
                </Badge>
              }
            >
              <small>MYER</small>
              <FlexiCell.Label className="font-medium" tag="h4">
                {title}
              </FlexiCell.Label>
              <FlexiCell.Hint>{subtitle}</FlexiCell.Hint>
              <div className="mt-2 flex gap-2">
                <Badge color="primary">Badge1</Badge>
                <Badge color="primary">Badge2</Badge>
              </div>
            </FlexiCell>
          );
        })}
      </div>
    );
  },
};

export const PromotilesVerticalList: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          {MOCK_PROMOS.map(({ title, subtitle }) => (
            <FlexiCell
              withBorder
              key={title}
              className="group"
              badge={
                <Badge className="block" color="hero">
                  Badge
                </Badge>
              }
            >
              <FlexiCell.Body tag="a" href="#" className="text-[inherit] decoration-[inherit] focus:focus-outline">
                <img
                  src="https://images.unsplash.com/photo-1657299170950-87e5b0eaf77c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                  alt=""
                  className="block h-[63px] w-full object-cover"
                />
                <small>MYER</small>
                <FlexiCell.Label className="font-medium" tag="h4">
                  {title}
                </FlexiCell.Label>
                <FlexiCell.Hint>{subtitle}</FlexiCell.Hint>
              </FlexiCell.Body>
              <FlexiCell.Footer>
                <div className="mt-2 flex gap-2">
                  <a href="#" className="focus:focus-outline">
                    <Badge color="primary">Badge1</Badge>
                  </a>
                  <a href="#" className="focus:focus-outline">
                    <Badge color="primary">Badge2</Badge>
                  </a>
                </div>
              </FlexiCell.Footer>
            </FlexiCell>
          ))}
        </div>
      </div>
    );
  },
};

const MOCK_PRODUCTS = [
  {
    title: 'This is talking about the bonus.',
    subtitle: 'This is more about the bonus and all the other exciting things about this.',
  },
  {
    title: 'This is a longer heading talking all about the bonus this one wraps.',
    subtitle: 'This is more about the bonus',
  },
  {
    title: 'This is talking about the bonus.',
    subtitle: 'This is more about the bonus and all the other exciting things about this.',
  },
];

export const ProductTiles: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex flex-col gap-2">
        {MOCK_PRODUCTS.map(({ title, subtitle }) => (
          <FlexiCell tag="a" href="#" withBorder withArrow body key={title} after={<TickCircleIcon color="success" />}>
            <div className="flex flex-col gap-2 md:flex-row">
              <GiftPictogram mode="duo" className="h-[24px] w-[24px]" aria-hidden="true" />
              <div className="flex flex-col gap-1">
                <FlexiCell.Label className="font-medium" tag="h4">
                  {title}
                </FlexiCell.Label>
                <FlexiCell.Hint>{subtitle}</FlexiCell.Hint>
              </div>
            </div>
          </FlexiCell>
        ))}
      </div>
    );
  },
};
