import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { Collapsible } from './collapsible.component.js';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

const SIZES = ['small', 'medium', 'large', 'xlarge'] as const;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    text: 'Toggle collapsible',
    children:
      'Hello vivamus sagittis lacus vel augue laoreet rutrum faucibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt laboriosam, mollitia magnam ad magni consequuntur hic et quos optio corrupti praesentium veniam aspernatur minima aperiam ut quas, possimus non architecto. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut animi velit in? Suscipit nostrum itaque voluptatibus dolorem qui soluta nobis modi officia incidunt eos dolores atque, unde error delectus officiis.',
  },
};

/**
 * > Examples of sizes of collapsible button
 */
export const Sizes = () => (
  <div>
    {SIZES.map(size => (
      <div className="mb-2" key={size}>
        <h2 className="mb-1 typography-body-8 font-bold text-text-body">{size}</h2>
        <p className="text-text-body">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur illum quidem neque quod impedit,
          praesentium maiores unde perspiciatis accusantium non, quae debitis ut aliquid numquam ipsa hic tempora
          deleniti deserunt!
        </p>

        <Collapsible text="Toggle collapsible" size={size}>
          <p className="text-text-body">
            Hello vivamus sagittis lacus vel augue laoreet rutrum faucibus. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Nesciunt laboriosam, mollitia magnam ad magni consequuntur hic et quos optio corrupti
            praesentium veniam aspernatur minima aperiam ut quas, possimus non architecto. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Aut animi velit in? Suscipit nostrum itaque voluptatibus dolorem qui soluta
            nobis modi officia incidunt eos dolores atque, unde error delectus officiis.
          </p>
        </Collapsible>

        <p className="text-text-body">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur illum quidem neque quod impedit,
          praesentium maiores unde perspiciatis accusantium non, quae debitis ut aliquid numquam ipsa hic tempora
          deleniti deserunt!
        </p>
      </div>
    ))}
  </div>
);

/**
 * > Setting the default of collapsible to open
 */
export const Open = () => (
  <div>
    {SIZES.map(size => (
      <div className="mb-2" key={size}>
        <h2 className="mb-1 typography-body-8 font-bold text-text-body">{size}</h2>
        <p className="text-text-body">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur illum quidem neque quod impedit,
          praesentium maiores unde perspiciatis accusantium non, quae debitis ut aliquid numquam ipsa hic tempora
          deleniti deserunt!
        </p>

        <Collapsible text="Toggle collapsible" size={size} open>
          <p className="text-text-body">
            Hello vivamus sagittis lacus vel augue laoreet rutrum faucibus. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Nesciunt laboriosam, mollitia magnam ad magni consequuntur hic et quos optio corrupti
            praesentium veniam aspernatur minima aperiam ut quas, possimus non architecto. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Aut animi velit in? Suscipit nostrum itaque voluptatibus dolorem qui soluta
            nobis modi officia incidunt eos dolores atque, unde error delectus officiis.
          </p>
        </Collapsible>

        <p className="text-text-body">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur illum quidem neque quod impedit,
          praesentium maiores unde perspiciatis accusantium non, quae debitis ut aliquid numquam ipsa hic tempora
          deleniti deserunt!
        </p>
      </div>
    ))}
  </div>
);
