import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { VisibilityIcon } from '../icon/index.js';
import { Button, Input, Select } from '../index.js';

import { InputField } from './input-field.component.js';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField/Sizes',
  component: InputField,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Input field with different sizes
 */
export const InputFieldWithDifferentSizes: Story = {
  args: {},
  render: () => {
    return (
      <>
        {(['small', 'medium', 'large', 'xlarge'] as const).map(size => (
          <div key={size} className="border-b border-b-border py-3">
            <h3 className="typography-body-7 mb-4 font-bold">Size: {size}</h3>
            <InputField
              size={size}
              label="Text"
              hint="I am a hint"
              supportingText="I am supporting text"
              before="$AUD"
              after="Text"
            >
              <Input />
            </InputField>

            <InputField
              size={size}
              label="Icon"
              hint="I am a hint"
              supportingText="I am supporting text"
              before={{ icon: () => <VisibilityIcon color="muted" />, inset: true }}
              after={{ icon: () => <VisibilityIcon color="muted" />, inset: true }}
            >
              <Input />
            </InputField>

            <InputField
              size={size}
              label="Icon Button"
              hint="I am a hint"
              supportingText="I am supporting text"
              before={{
                element: <Button size={size} look="link" iconAfter={() => <VisibilityIcon color="muted" />} />,
                inset: true,
              }}
              after={{
                element: <Button size={size} look="link" iconAfter={() => <VisibilityIcon color="muted" />} />,
                inset: true,
              }}
            >
              <Input />
            </InputField>

            <InputField
              size={size}
              label="Button"
              hint="I am a hint"
              supportingText="I am supporting text"
              before={<Button>Check</Button>}
              after={<Button>Check</Button>}
            >
              <Input />
            </InputField>

            <InputField
              size={size}
              label="Select"
              hint="I am a hint"
              supportingText="I am supporting text"
              before={
                <Select>
                  <option value="Select">Select</option>
                </Select>
              }
              after={
                <Select>
                  <option value="Select">Select</option>
                </Select>
              }
            >
              <Input />
            </InputField>
          </div>
        ))}
      </>
    );
  },
};
