import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { fn, expect } from 'storybook/test';

import { ArrowLeftIcon, ArrowRightIcon, BurgerIcon } from '../icon/index.js';

import { Button } from './button.component.js';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

const LOOKS = ['primary', 'hero', 'faint', 'link'] as const;
const SOFT_LOOKS = ['primary', 'hero', 'faint'] as const;
const SIZES = ['small', 'medium', 'large', 'xlarge'] as const;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    children: 'Button text',
    onClick: fn(),
  },
  play: async ({ canvas, userEvent }) => {
    const button = await canvas.findByRole('button', { name: 'Button text' });
    await expect(button).toBeInTheDocument();
  },
};

/**
 * > Button looks
 */
export const Colors = () => (
  <div className="flex flex-col gap-2">
    <h3 className="font-bold">Default</h3>
    <div className="flex gap-2">
      {LOOKS.map(look => (
        <Button key={look} look={look}>
          {look.charAt(0).toUpperCase() + look.slice(1)}
        </Button>
      ))}
    </div>
    <h3 className="font-bold">Soft</h3>
    <div className="flex gap-2">
      {SOFT_LOOKS.map(look => (
        <Button key={look} look={look} soft>
          {look.charAt(0).toUpperCase() + look.slice(1)}
        </Button>
      ))}
    </div>
  </div>
);

/**
 * > Button sizes
 */
export const Sizes = () => (
  <div className="flex flex-col gap-2">
    {SIZES.map(size => (
      <div className="flex flex-col gap-2" key={size}>
        <h3 className="font-bold">{size}</h3>
        <div className="flex gap-2">
          {LOOKS.map(look => (
            <Button key={look} look={look} size={size}>
              {look.charAt(0).toUpperCase() + look.slice(1)}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          {SOFT_LOOKS.map(look => (
            <Button key={look} look={look} size={size} soft>
              {look.charAt(0).toUpperCase() + look.slice(1)}
            </Button>
          ))}
        </div>
      </div>
    ))}
  </div>
);

/**
 * > Block buttons
 */
export const Block = () => (
  <div className="flex flex-col gap-2">
    {SIZES.map(size => (
      <div className="flex flex-col" key={size}>
        <h3 className="font-bold">{size}</h3>
        <div className="flex flex-col gap-2">
          {SOFT_LOOKS.map(look => (
            <Button key={look} look={look} size={size} block>
              {look.charAt(0).toUpperCase() + look.slice(1)}
            </Button>
          ))}
        </div>
      </div>
    ))}
  </div>
);

/**
 * > Buttons with icons
 */
export const Icons = () => (
  <div>
    <div className="mb-4 flex flex-col gap-2">
      <h2 className="typography-body-7 font-bold">Icon Before</h2>
      <h3 className="font-bold">Colors</h3>
      <div className="flex gap-2">
        {LOOKS.map(look => (
          <Button key={look} look={look} iconBefore={BurgerIcon}>
            {look.charAt(0).toUpperCase() + look.slice(1)}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        {SOFT_LOOKS.map(look => (
          <Button key={look} look={look} soft iconBefore={BurgerIcon}>
            {look.charAt(0).toUpperCase() + look.slice(1)}
          </Button>
        ))}
      </div>
      <h3 className="font-bold">Sizes</h3>
      <div>
        {SIZES.map(size => (
          <Button key={size} size={size} iconBefore={BurgerIcon} className="mr-2">
            Button
          </Button>
        ))}
      </div>
      <div>
        {SIZES.map(size => (
          <Button key={size} size={size} iconBefore={BurgerIcon} soft className="mr-2">
            Button
          </Button>
        ))}
      </div>
      <h3 className="font-bold">Block</h3>
      <div className="flex flex-col gap-2">
        <Button block iconBefore={ArrowLeftIcon}>
          Button
        </Button>
        <Button block justify iconBefore={ArrowLeftIcon}>
          Button
        </Button>
      </div>
    </div>

    <div className="mb-4 flex flex-col gap-2">
      <h2 className="typography-body-7 font-bold">Icon After</h2>
      <h3 className="font-bold">Colors</h3>
      <div className="flex gap-2">
        {LOOKS.map(look => (
          <Button key={look} look={look} iconAfter={BurgerIcon}>
            {look.charAt(0).toUpperCase() + look.slice(1)}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        {SOFT_LOOKS.map(look => (
          <Button key={look} look={look} soft iconAfter={BurgerIcon}>
            {look.charAt(0).toUpperCase() + look.slice(1)}
          </Button>
        ))}
      </div>
      <h3 className="font-bold">Sizes</h3>
      <div>
        {SIZES.map(size => (
          <Button key={size} size={size} iconAfter={BurgerIcon} className="mr-2">
            Button
          </Button>
        ))}
      </div>
      <div>
        {SIZES.map(size => (
          <Button key={size} size={size} iconAfter={BurgerIcon} soft className="mr-2">
            Button
          </Button>
        ))}
      </div>
      <h3 className="font-bold">Block</h3>
      <div className="flex flex-col gap-2">
        <Button block iconAfter={ArrowRightIcon}>
          Button
        </Button>
        <Button block justify iconAfter={ArrowRightIcon}>
          Button
        </Button>
      </div>
    </div>
    <div className="mb-4 flex flex-col gap-2">
      <h2 className="typography-body-7 font-bold">Icon Only</h2>
      <h3 className="font-bold">Colors</h3>
      <div className="flex gap-2">
        {LOOKS.map(look => (
          <Button key={look} look={look} iconAfter={BurgerIcon} />
        ))}
      </div>
      <div className="flex gap-2">
        {SOFT_LOOKS.map(look => (
          <Button key={look} look={look} soft iconAfter={BurgerIcon} />
        ))}
      </div>
      <h3 className="font-bold">Sizes</h3>
      <div>
        {SIZES.map(size => (
          <Button key={size} size={size} iconAfter={BurgerIcon} className="mr-2" />
        ))}
      </div>
      <div>
        {SIZES.map(size => (
          <Button key={size} size={size} iconAfter={BurgerIcon} soft className="mr-2" />
        ))}
      </div>
      <h3 className="font-bold">Block</h3>
      <div className="flex flex-col gap-2">
        <Button block iconAfter={BurgerIcon} />
      </div>
    </div>
  </div>
);

/**
 * > Responsive styles
 */
export const ResponsiveSize = () => (
  <div>
    <div className="py-2">
      <Button
        size={{
          initial: 'small',
          md: 'large',
          lg: 'xlarge',
        }}
      >
        Responsive Button
      </Button>
    </div>
    <Button
      iconAfter={BurgerIcon}
      size={{
        initial: 'small',
        md: 'large',
        lg: 'xlarge',
      }}
    >
      Responsive Button with icon
    </Button>
  </div>
);

/**
 * > As anchor tag
 */
export const AsLink: Story = {
  args: {
    children: 'Link button',
    tag: 'a',
    href: '#',
  },
};

/**
 * > Disabled look
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled button',
    disabled: true,
  },
};
