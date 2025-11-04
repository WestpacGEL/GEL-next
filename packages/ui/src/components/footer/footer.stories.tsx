import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { SecurityIcon } from '../icon/index.js';
import { Link } from '../index.js';

import { Footer } from './footer.component.js';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    brand: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const DefaultStory: Story = {
  // for underscored property

  render: ({ brand: _, ...rest }, { globals: { theme } }) => {
    const brand = theme ? theme.toLowerCase() : 'wbc';
    return (
      <Footer brand={brand === 'btfg' ? 'wbc' : brand} hideLogo {...rest}>
        <div className="relative">
          <div className="float-left flex-none">
            <SecurityIcon size="small" className="float-left mr-1 shrink-0" color="muted" />
          </div>
          <div className="flex">
            <p className="relative flex-1 text-text-muted">
              Our site and your transactions are secure. You can read our{' '}
              <Link href="#" type="inline">
                security information
              </Link>
              . © 2023 Westpac Banking Corporation ABN 33 007 457 141 AFSL and Australian credit licence 233714.
            </p>
          </div>
        </div>
      </Footer>
    );
  },
};
