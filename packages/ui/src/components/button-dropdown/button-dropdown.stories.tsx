import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { AndroidIcon, MoreVertIcon } from '../icon/index.js';
import { ButtonDropdownHeading, Link, List, ListItem } from '../index.js';

import { ButtonDropdown } from './button-dropdown.component.js';

const meta: Meta<typeof ButtonDropdown> = {
  title: 'Components/ButtonDropdown',
  component: ButtonDropdown,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

const LOOKS = ['primary', 'hero', 'faint', 'link'] as const;
const SIZES = ['small', 'medium', 'large', 'xlarge'] as const;
const DROPDOWNSIZE = ['small', 'medium', 'large'] as const;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    text: 'Default Dropdown',
    children: (
      <p>
        Example dropdown{' '}
        <Link href="#" type="inline">
          content
        </Link>
        ...
      </p>
    ),
  },
};

/**
 * > Default usage example
 */
export const SwappingDropDownIcon = () => {
  return (
    <ButtonDropdown text="primary" look="primary" dropDownIcon={MoreVertIcon}>
      <p>
        Example dropdown{' '}
        <Link href="#" type="inline">
          content
        </Link>
        ...
      </p>
    </ButtonDropdown>
  );
};

/**
 * > Default usage example
 */
export const IconOnly = () => {
  return (
    <ButtonDropdown text={<MoreVertIcon />} look="unstyled">
      <p>
        Example dropdown{' '}
        <Link href="#" type="inline">
          content
        </Link>
        ...
      </p>
    </ButtonDropdown>
  );
};

/**
 * > Standard looks of button
 */
export const StandardLooks = () => (
  <div className="flex gap-2">
    {LOOKS.map(look => (
      <ButtonDropdown key={look} look={look} text={look}>
        <p>
          Example dropdown{' '}
          <Link href="#" type="inline">
            content
          </Link>
          ...
        </p>
      </ButtonDropdown>
    ))}
  </div>
);

/**
 * > Soft looks of button
 */
export const SoftLooks = () => (
  <div className="flex gap-2">
    {LOOKS.map(look => (
      <ButtonDropdown key={look} look={look} soft text={look}>
        <p>
          Example dropdown{' '}
          <Link href="#" type="inline">
            content
          </Link>
          ...
        </p>
      </ButtonDropdown>
    ))}
  </div>
);

/**
 * > Sizes of buttons
 */
export const ButtonSizes = () => (
  <div>
    {SIZES.map(size => (
      <div key={size}>
        <h3 className="font-bold">{size}</h3>
        <ButtonDropdown size={size} text={size}>
          <p>
            Example dropdown{' '}
            <Link href="#" type="inline">
              content
            </Link>
            ...
          </p>
        </ButtonDropdown>
      </div>
    ))}
    <h3 className="font-bold">Responsive</h3>
    <ButtonDropdown
      size={{
        initial: 'small',
        md: 'large',
        lg: 'xlarge',
      }}
      text="responsive"
    >
      <p>
        Example dropdown{' '}
        <Link href="#" type="inline">
          content
        </Link>
        ...
      </p>
    </ButtonDropdown>
  </div>
);

/**
 * > Sizes of dropdown
 */
export const DropdownSizes = () => (
  <div>
    {DROPDOWNSIZE.map(size => (
      <>
        <h3 className="font-bold">{size}</h3>
        <ButtonDropdown dropdownSize={size} text={size}>
          {size}
        </ButtonDropdown>
      </>
    ))}
    <h3 className="font-bold">Responsive</h3>
    <ButtonDropdown
      dropdownSize={{
        initial: 'large',
        md: 'small',
        lg: 'medium',
      }}
      text="Responsive"
    >
      Responive
    </ButtonDropdown>
  </div>
);

/**
 * > Block usage example
 */
export const BlockDropdownButton = () => (
  <div>
    <h3 className="font-bold">Block</h3>
    <ButtonDropdown block={true} text="Block">
      Block
    </ButtonDropdown>
    <h3 className="font-bold">Responsive Block</h3>
    <ButtonDropdown
      block={{
        initial: false,
        lg: true,
      }}
      text="Responsive Block"
    >
      Responive Block
    </ButtonDropdown>
  </div>
);

/**
 * > Icon usage example
 */
export const DropdownButtonWithIcons: Story = {
  args: {
    iconBefore: AndroidIcon,
    text: 'Icon Dropdown',
    children: (
      <p>
        Example dropdown
        <Link href="#" type="inline">
          content
        </Link>
        ...
      </p>
    ),
  },
};

/**
 * > With headings example
 */
export const DropdownWithHeadings: Story = {
  args: {
    text: 'Heading Dropdown',
    block: false,
    children: (
      <>
        <ButtonDropdownHeading>Dropdown heading #1</ButtonDropdownHeading>
        Example dropdown content...
        <ButtonDropdownHeading>Dropdown heading #2</ButtonDropdownHeading>
        Example dropdown content...
      </>
    ),
  },
};

/**
 * > Open by default
 * NOTE: This element has a visual bug on the Storybook Docs page when page loaded but doesn't in dev docs/canvas view
 */
export const Open: Story = {
  args: {
    open: true,
    text: 'Default Dropdown',
    children: (
      <p>
        Example dropdown
        <Link href="#" type="inline">
          content
        </Link>
        ...
      </p>
    ),
  },
};

/**
 * > With headings and content example
 */
export const DropdownWithHeadingsAndContent = () => (
  <div className="flex gap-4">
    <ButtonDropdown text="Products" look="primary">
      <ButtonDropdownHeading>Credit cards</ButtonDropdownHeading>
      <List type="link" spacing="large">
        <ListItem href="#">Rewards</ListItem>
        <ListItem href="#">Low rate</ListItem>
      </List>
      <ButtonDropdownHeading>Bank accounts</ButtonDropdownHeading>
      <List type="link" spacing="large">
        <ListItem href="#">Savings</ListItem>
        <ListItem href="#">Transaction</ListItem>
      </List>
    </ButtonDropdown>
    <ButtonDropdown text="Credit cards" look="primary">
      <List type="link" spacing="large">
        <ListItem href="#">Rewards</ListItem>
        <ListItem href="#">Low rate</ListItem>
      </List>
    </ButtonDropdown>
  </div>
);

/**
 * > Button fixed to the bottom of the viewport so the dropdown must flip upward.
 */
export const DropdownAtBottomFlipsUp: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ position: 'fixed', bottom: 8, left: '50%', transform: 'translateX(-50%)' }}>
      <ButtonDropdown text="Flips up" open shouldFlip look="primary">
        <List type="link" spacing="medium">
          {Array.from({ length: 10 }).map((_, i) => (
            <ListItem key={i} href="#">
              Menu item {i + 1}
            </ListItem>
          ))}
        </List>
        <p className="text-neutral-600 mt-2 text-sm">
          There is no space below the button so the popover should appear above.
        </p>
      </ButtonDropdown>
    </div>
  ),
};
