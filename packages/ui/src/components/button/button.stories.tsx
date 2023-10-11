import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { ArrowLeftIcon, ArrowRightIcon, BurgerIcon } from '../icon/index.js';

import { Button } from './button.component.js';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div style={{ padding: '3rem' }}>
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

const LOOKS = ['primary', 'hero', 'faint', 'link'];
const SOFT_LOOKS = ['primary', 'hero', 'faint'];
const SIZES = ['small', 'medium', 'large', 'xlarge'];

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    children: 'Button text',
  },
};

/**
 * > Button looks
 */
export const Colors = () => (
  <div className="flex flex-col gap-2">
    <h3 className="font-bold">Default</h3>
    <div className="flex gap-2">
      {LOOKS.map((look: any) => (
        <Button look={look}>{look}</Button>
      ))}
    </div>
    <h3 className="font-bold">Soft</h3>
    <div className="flex gap-2">
      {SOFT_LOOKS.map((look: any) => (
        <Button look={look} soft>
          {look}
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
    {SIZES.map((size: any) => (
      <>
        <h3 className="font-bold">{size}</h3>
        <div className="flex gap-2">
          {LOOKS.map((look: any) => (
            <Button look={look} size={size}>
              {look}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          {SOFT_LOOKS.map((look: any) => (
            <Button look={look} size={size} soft>
              {look}
            </Button>
          ))}
        </div>
      </>
    ))}
  </div>
);

/**
 * > Block buttons
 */
export const Block = () => (
  <div className="flex flex-col gap-2">
    {SIZES.map((size: any) => (
      <>
        <h3 className="font-bold">{size}</h3>
        <div className="flex flex-col gap-2">
          {SOFT_LOOKS.map((look: any) => (
            <Button look={look} size={size} block>
              {look}
            </Button>
          ))}
        </div>
      </>
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
        {LOOKS.map((look: any) => (
          <Button look={look} iconBefore={BurgerIcon}>
            {look}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        {SOFT_LOOKS.map((look: any) => (
          <Button look={look} soft iconBefore={BurgerIcon}>
            {look}
          </Button>
        ))}
      </div>
      <h3 className="font-bold">Sizes</h3>
      <div>
        {SIZES.map((size: any) => (
          <Button size={size} iconBefore={BurgerIcon} className="mr-2">
            Button
          </Button>
        ))}
      </div>
      <div>
        {SIZES.map((size: any) => (
          <Button size={size} iconBefore={BurgerIcon} soft className="mr-2">
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
        {LOOKS.map((look: any) => (
          <Button look={look} iconAfter={BurgerIcon}>
            {look}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        {SOFT_LOOKS.map((look: any) => (
          <Button look={look} soft iconAfter={BurgerIcon}>
            {look}
          </Button>
        ))}
      </div>
      <h3 className="font-bold">Sizes</h3>
      <div>
        {SIZES.map((size: any) => (
          <Button size={size} iconAfter={BurgerIcon} className="mr-2">
            Button
          </Button>
        ))}
      </div>
      <div>
        {SIZES.map((size: any) => (
          <Button size={size} iconAfter={BurgerIcon} soft className="mr-2">
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
        {LOOKS.map((look: any) => (
          <Button look={look} iconAfter={BurgerIcon} />
        ))}
      </div>
      <div className="flex gap-2">
        {SOFT_LOOKS.map((look: any) => (
          <Button look={look} soft iconAfter={BurgerIcon} />
        ))}
      </div>
      <h3 className="font-bold">Sizes</h3>
      <div>
        {SIZES.map((size: any) => (
          <Button size={size} iconAfter={BurgerIcon} className="mr-2" />
        ))}
      </div>
      <div>
        {SIZES.map((size: any) => (
          <Button size={size} iconAfter={BurgerIcon} soft className="mr-2" />
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
    <Button
      size={{
        initial: 'small',
        md: 'large',
        lg: 'xlarge',
      }}
    >
      Responsive Button
    </Button>{' '}
    <Button
      iconAfter={BurgerIcon}
      size={{
        initial: 'small',
        md: 'large',
        lg: 'xlarge',
      }}
    >
      Responsive Button with icon
    </Button>{' '}
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
