import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ brand: _, ...rest }, { globals: { theme } }) => {
    const brand = theme ? theme.toLowerCase() : 'wbc';
    return (
      <>
        <Footer brand={brand === 'btfg' ? 'wbc' : brand} hideLogo {...rest}>
          <div>
            <SecurityIcon
              size={{ initial: 'small', md: 'medium' }}
              className="float-left shrink-0 max-md:mr-1 md:mr-2"
              color="muted"
            />
            <p className="text-muted">
              Our site and your transactions are secure. You can read our{' '}
              <Link href="#" type="inline">
                security information
              </Link>
              . © 2023 Westpac Banking Corporation ABN 33 007 457 141 AFSL and Australian credit licence 233714.
            </p>
          </div>
        </Footer>
      </>
    );
  },
};
