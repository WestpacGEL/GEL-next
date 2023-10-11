import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Collapsible } from './collapsible.component.js';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="typography-body-10 p-3">
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

const SIZES = ['small', 'medium', 'large', 'xlarge'];

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
  <div className="typography-body-10 p-3">
    {SIZES.map((size: any) => (
      <div className="mb-2" key={size}>
        <h2 className="typography-body-8 mb-1 font-bold">{size}</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur illum quidem neque quod impedit,
          praesentium maiores unde perspiciatis accusantium non, quae debitis ut aliquid numquam ipsa hic tempora
          deleniti deserunt!
        </p>

        <Collapsible text="Toggle collapsible" size={size}>
          <p>
            Hello vivamus sagittis lacus vel augue laoreet rutrum faucibus. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Nesciunt laboriosam, mollitia magnam ad magni consequuntur hic et quos optio corrupti
            praesentium veniam aspernatur minima aperiam ut quas, possimus non architecto. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Aut animi velit in? Suscipit nostrum itaque voluptatibus dolorem qui soluta
            nobis modi officia incidunt eos dolores atque, unde error delectus officiis.
          </p>
        </Collapsible>

        <p>
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
  <div className="typography-body-10 p-3">
    {SIZES.map((size: any) => (
      <div className="mb-2" key={size}>
        <h2 className="typography-body-8 mb-1 font-bold">{size}</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur illum quidem neque quod impedit,
          praesentium maiores unde perspiciatis accusantium non, quae debitis ut aliquid numquam ipsa hic tempora
          deleniti deserunt!
        </p>

        <Collapsible text="Toggle collapsible" size={size} open>
          <p>
            Hello vivamus sagittis lacus vel augue laoreet rutrum faucibus. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Nesciunt laboriosam, mollitia magnam ad magni consequuntur hic et quos optio corrupti
            praesentium veniam aspernatur minima aperiam ut quas, possimus non architecto. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Aut animi velit in? Suscipit nostrum itaque voluptatibus dolorem qui soluta
            nobis modi officia incidunt eos dolores atque, unde error delectus officiis.
          </p>
        </Collapsible>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur illum quidem neque quod impedit,
          praesentium maiores unde perspiciatis accusantium non, quae debitis ut aliquid numquam ipsa hic tempora
          deleniti deserunt!
        </p>
      </div>
    ))}
  </div>
);
