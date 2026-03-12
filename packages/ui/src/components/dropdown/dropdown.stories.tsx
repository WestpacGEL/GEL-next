import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { AndroidIcon, MoreVertIcon } from '../icon/index.js';
import { Button, DropdownHeading, Link, List, ListItem, RadioGroup } from '../index.js';

import { Dropdown } from './dropdown.component.js';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
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
      <p className="text-text-body">
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
 * > Swapping Dropdown icon usage example
 */
export const SwappingDropDownIcon = () => {
  return (
    <Dropdown text="primary" look="primary" dropDownIcon={MoreVertIcon}>
      <p className="text-text-body">
        Example dropdown
        <Link href="#" type="inline">
          content
        </Link>
        ...
      </p>
    </Dropdown>
  );
};

/**
 * > Icon only usage example
 */
export const IconOnly = () => {
  return (
    <Dropdown text={<MoreVertIcon />} look="unstyled">
      <p className="text-text-body">
        Example dropdown
        <Link href="#" type="inline">
          content
        </Link>
        ...
      </p>
    </Dropdown>
  );
};

/**
 * > Standard looks of button
 */
export const StandardLooks = () => (
  <div className="flex gap-2">
    {LOOKS.map(look => (
      <Dropdown key={look} look={look} text={look}>
        <p className="text-text-body">
          Example dropdown{' '}
          <Link href="#" type="inline">
            content
          </Link>
          ...
        </p>
      </Dropdown>
    ))}
  </div>
);

/**
 * > Soft looks of button
 */
export const SoftLooks = () => (
  <div className="flex gap-2">
    {LOOKS.map(look => (
      <Dropdown key={look} look={look} soft text={look}>
        <p className="text-text-body">
          Example dropdown{' '}
          <Link href="#" type="inline">
            content
          </Link>
          ...
        </p>
      </Dropdown>
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
        <h3 className="font-bold text-text-body">{size}</h3>
        <Dropdown size={size} text={size}>
          <p className="text-text-body">
            Example dropdown{' '}
            <Link href="#" type="inline">
              content
            </Link>
            ...
          </p>
        </Dropdown>
      </div>
    ))}
    <h3 className="font-bold text-text-body">Responsive</h3>
    <Dropdown
      size={{
        initial: 'small',
        md: 'large',
        lg: 'xlarge',
      }}
      text="responsive"
    >
      <p className="text-text-body">
        Example dropdown{' '}
        <Link href="#" type="inline">
          content
        </Link>
        ...
      </p>
    </Dropdown>
  </div>
);

/**
 * > Sizes of dropdown
 */
export const DropdownSizes = () => (
  <div>
    {DROPDOWNSIZE.map(size => (
      <div key={size}>
        <h3 className="font-bold text-text-body">{size}</h3>
        <Dropdown dropdownSize={size} text={size}>
          {size}
        </Dropdown>
      </div>
    ))}
    <h3 className="font-bold text-text-body">Responsive</h3>
    <Dropdown
      dropdownSize={{
        initial: 'large',
        md: 'small',
        lg: 'medium',
      }}
      text="Responsive"
    >
      Responive
    </Dropdown>
  </div>
);

/**
 * > Block usage example
 */
export const BlockDropdownButton = () => (
  <div>
    <h3 className="font-bold text-text-body">Block</h3>
    <Dropdown block={true} text="Block">
      Block
    </Dropdown>
    <h3 className="font-bold text-text-body">Responsive Block</h3>
    <Dropdown
      block={{
        initial: false,
        lg: true,
      }}
      text="Responsive Block"
    >
      Responive Block
    </Dropdown>
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
      <p className="text-text-body">
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
 * > With headings example
 */
export const DropdownWithHeadings: Story = {
  args: {
    text: 'Heading Dropdown',
    block: false,
    children: (
      <>
        <DropdownHeading>Dropdown heading #1</DropdownHeading>
        <p className="text-text-body">Example dropdown content...</p>
        <DropdownHeading>Dropdown heading #2</DropdownHeading>
        <p className="text-text-body">Example dropdown content...</p>
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
      <p className="text-text-body">
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
 * > With headings and content example
 */
export const DropdownWithHeadingsAndContent = () => (
  <div className="flex gap-4">
    <Dropdown text="Products" look="primary">
      <DropdownHeading>Credit cards</DropdownHeading>
      <List type="link" spacing="large">
        <ListItem href="#">Rewards</ListItem>
        <ListItem href="#">Low rate</ListItem>
      </List>
      <DropdownHeading>Bank accounts</DropdownHeading>
      <List type="link" spacing="large">
        <ListItem href="#">Savings</ListItem>
        <ListItem href="#">Transaction</ListItem>
      </List>
    </Dropdown>
    <Dropdown text="Credit cards" look="primary">
      <List type="link" spacing="large">
        <ListItem href="#">Rewards</ListItem>
        <ListItem href="#">Low rate</ListItem>
      </List>
    </Dropdown>
  </div>
);

/**
 * > RadioGroup
 */
export const RadioGroupExample = () => {
  return (
    <div>
      <Dropdown text="Default test">
        <RadioGroup
          radios={[
            { value: 'Option 1', label: 'Option 1' },
            { value: 'Option 2', label: 'Option 2' },
            { value: 'Option 3', label: 'Option 3' },
          ]}
        />
      </Dropdown>
      <Button>Test</Button>
    </div>
  );
};

/*
 * > Button fixed to the bottom of the viewport so the dropdown must flip upward.
 */
export const DropdownAtBottomFlipsUp: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ position: 'fixed', bottom: 8, left: '50%', transform: 'translateX(-50%)' }}>
      <Dropdown text="Flips up" open shouldFlip look="primary">
        <List type="link" spacing="medium">
          {Array.from({ length: 10 }).map((_, i) => (
            <ListItem key={i} href="#">
              Menu item {i + 1}
            </ListItem>
          ))}
        </List>
        <p className="mt-2 text-sm text-neutral-600">
          There is no space below the button so the popover should appear above.
        </p>
      </Dropdown>
    </div>
  ),
};
