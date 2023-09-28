import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Selector } from './selector.component.js';

const meta: Meta<typeof Selector> = {
  title: 'Example/Selector',
  component: Selector,
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
export const DefaultStory = () => {
  return (
    <Selector type="checkbox">
      {[
        { key: 'A', disabled: false },
        { key: 'B', disabled: false },
        { key: 'C', disabled: false },
        { key: 'D', disabled: true },
      ].map(({ key, disabled }) => (
        <Selector.Checkbox key={key} body value={key} isDisabled={disabled}>
          <Selector.Label>Something {key}</Selector.Label>
          <Selector.Hint>Something {key}</Selector.Hint>
        </Selector.Checkbox>
      ))}
    </Selector>
  );
};

/**
 * > Radio usage example
 */
export const RadioStory = () => {
  return (
    <Selector type="radio">
      {[
        { key: 'A', disabled: false },
        { key: 'B', disabled: false },
        { key: 'C', disabled: false },
        { key: 'D', disabled: true },
      ].map(({ key, disabled }) => (
        <Selector.Radio key={key} body value={key} isDisabled={disabled}>
          <Selector.Label>Something {key}</Selector.Label>
          <Selector.Hint>Something {key}</Selector.Hint>
        </Selector.Radio>
      ))}
    </Selector>
  );
};
