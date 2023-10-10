import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { AndroidIcon, AppleIcon } from '../icon/index.js';

import { ButtonDropdown } from './button-dropdown.component.js';

/**
 * ## NOTE: If you can't scroll on page click anywhere on page to close default open dropdown
 */
const meta: Meta<typeof ButtonDropdown> = {
  title: 'Components/ButtonDropdown',
  component: ButtonDropdown,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="p-3">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const LOOKS = ['primary', 'hero', 'faint'];
const SIZES = ['small', 'medium', 'large', 'xlarge'];
const DROPDOWNSIZE = ['small', 'medium', 'large'];

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    text: 'Default Dropdown',
    children: (
      <p>
        Example dropdown
        <a href="#" className="text-[blue] underline">
          content
        </a>
        ...
      </p>
    ),
  },
};

/**
 * > Standard looks of button
 */
export const StandardLooks = () => (
  <div className="flex gap-2">
    {LOOKS.map((look: any) => (
      <ButtonDropdown look={look} text={look}>
        <p>
          Example dropdown
          <a href="#" className="text-[blue] underline">
            content
          </a>
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
    {LOOKS.map((look: any) => (
      <ButtonDropdown look={look} soft text={look}>
        <p>
          Example dropdown
          <a href="#" className="text-[blue] underline">
            content
          </a>
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
    {SIZES.map((size: any) => (
      <>
        <h3 className="font-bold">{size}</h3>
        <ButtonDropdown size={size} text={size}>
          <p>
            Example dropdown
            <a href="#" className="text-[blue] underline">
              content
            </a>
            ...
          </p>
        </ButtonDropdown>
      </>
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
        Example dropdown
        <a href="#" className="text-[blue] underline">
          content
        </a>
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
    {DROPDOWNSIZE.map((size: any) => (
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
        <a href="#" className="text-[blue] underline">
          content
        </a>
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
        <ButtonDropdown.Heading>Dropdown heading #1</ButtonDropdown.Heading>
        Example dropdown content...
        <ButtonDropdown.Heading>Dropdown heading #2</ButtonDropdown.Heading>
        Example dropdown content...
      </>
    ),
  },
};

/**
 * > Open by default
 */
export const Open: Story = {
  args: {
    open: true,
    text: 'Default Dropdown',
    children: (
      <p>
        Example dropdown
        <a href="#" className="text-[blue] underline">
          content
        </a>
        ...
      </p>
    ),
  },
};
