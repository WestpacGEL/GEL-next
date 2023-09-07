import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Breadcrumb } from './breadcrumb.component.js';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Example/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="p-2">
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

/**
 * > Default usage example
 */
export const DefaultStory: Story = {
  args: {
    children: [
      <Breadcrumb.Item tag="button" onClick={() => alert('Folder 1')}>
        Button item
      </Breadcrumb.Item>,
      <Breadcrumb.Item tag="a" href="#test">
        Anchor item
      </Breadcrumb.Item>,
      <Breadcrumb.Item tag="span">Span item</Breadcrumb.Item>,
      <Breadcrumb.Item tag="span" isDisabled>
        Span and disabled
      </Breadcrumb.Item>,
      <Breadcrumb.Item tag="a" isDisabled href="#lol">
        anchor and disabled
      </Breadcrumb.Item>,
      <Breadcrumb.Item tag="a" href="#loko">
        Last item
      </Breadcrumb.Item>,
    ],
  },
};
