import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { SelectorRadioGroup } from './selector-radio-group.component.js';

const meta: Meta<typeof SelectorRadioGroup> = {
  title: 'Example/SelectorRadioGroup',
  component: SelectorRadioGroup,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const DefaultStory: Story = {
  args: {},
  render: () => {
    return (
      <SelectorRadioGroup>
        {['A', 'B', 'C', 'D'].map(key => (
          <SelectorRadioGroup.Option key={key} body value={key}>
            <SelectorRadioGroup.Option.Label>Something {key}</SelectorRadioGroup.Option.Label>
            <SelectorRadioGroup.Option.Hint>Something {key}</SelectorRadioGroup.Option.Hint>
          </SelectorRadioGroup.Option>
        ))}
      </SelectorRadioGroup>
    );
  },
};

/**
 * > With Arrow usage example
 */
export const WithArrowStory: Story = {
  args: {},
  render: () => {
    return (
      <SelectorRadioGroup>
        {['A', 'B', 'C', 'D'].map(key => (
          <SelectorRadioGroup.Option key={key} body value={key} checkIcon="arrow">
            <SelectorRadioGroup.Option.Label>Something {key}</SelectorRadioGroup.Option.Label>
            <SelectorRadioGroup.Option.Hint>Something {key}</SelectorRadioGroup.Option.Hint>
          </SelectorRadioGroup.Option>
        ))}
      </SelectorRadioGroup>
    );
  },
};
