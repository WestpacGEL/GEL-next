import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from './button.component.js';

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
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
    layout: 'center',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const DefaultStory: Story = {
  args: {
    children: 'Button text',
  },
};

/**
 * > Responsive size
 */
export const ResponsiveSizeStory: Story = {
  args: {
    children: 'Button text',
    size: {
      initial: 'small',
      md: 'large',
      lg: 'xlarge',
    },
  },
};

const COLORS = ['hero', 'primary', 'link', 'faint'];
const OUTLINE_COLORS = ['hero-soft', 'primary-soft', 'link-soft', 'faint-soft'];
const SIZES = ['small', 'medium', 'large', 'xlarge'];
/**
 * > Button sizes and colors
 */
export const ButtonSizeAndColors = () => {
  const [size, setSize] = useState('medium');
  return (
    <div className="flex flex-col gap-2">
      <div>
        {SIZES.map(sizeOption => (
          <Button
            key={sizeOption}
            onClick={() => setSize(sizeOption)}
            size="small"
            color={size === sizeOption ? 'hero' : 'hero-soft'}
          >
            {sizeOption}
          </Button>
        ))}
      </div>
      <hr />
      <div className="flex gap-2">
        {COLORS.map(color => (
          <Button className="transition-all" key={color} size={size as any} color={color as any}>
            Button {color}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        {OUTLINE_COLORS.map(color => (
          <Button className="transition-all" key={color} size={size as any} color={color as any}>
            Button {color}
          </Button>
        ))}
      </div>
    </div>
  );
};
