import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { SelectorCheckboxGroup } from './selector-checkbox-group.component.js';

const meta: Meta<typeof SelectorCheckboxGroup> = {
  title: 'Example/SelectorCheckboxGroup',
  component: SelectorCheckboxGroup,
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
      <SelectorCheckboxGroup>
        {[
          { key: 'A', disabled: false },
          { key: 'B', disabled: false },
          { key: 'C', disabled: false },
          { key: 'D', disabled: true },
        ].map(({ key, disabled }) => (
          <SelectorCheckboxGroup.Option key={key} body value={key} isDisabled={disabled}>
            <SelectorCheckboxGroup.Option.Label>Something {key}</SelectorCheckboxGroup.Option.Label>
            <SelectorCheckboxGroup.Option.Hint>Something {key}</SelectorCheckboxGroup.Option.Hint>
          </SelectorCheckboxGroup.Option>
        ))}
      </SelectorCheckboxGroup>
    );
  },
};

/**
 * > Default usage example
 */
export const WithArrowStory: Story = {
  args: {},
  render: () => {
    return (
      <SelectorCheckboxGroup>
        {[
          { key: 'A', disabled: false },
          { key: 'B', disabled: false },
          { key: 'C', disabled: false },
          { key: 'D', disabled: true },
        ].map(({ key, disabled }) => (
          <SelectorCheckboxGroup.Option key={key} body value={key} isDisabled={disabled} checkIcon="arrow">
            <SelectorCheckboxGroup.Option.Label>Something {key}</SelectorCheckboxGroup.Option.Label>
            <SelectorCheckboxGroup.Option.Hint>Something {key}</SelectorCheckboxGroup.Option.Hint>
          </SelectorCheckboxGroup.Option>
        ))}
      </SelectorCheckboxGroup>
    );
  },
};
