import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { VisibilityIcon } from '../icon/index.js';
import { Button, Input, Select } from '../index.js';

import { InputGroup } from './input-group.component.js';

const meta: Meta<typeof InputGroup> = {
  title: 'Components/InputGroup/Sizes',
  component: InputGroup,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Input field with different sizes
 */
export const InputGroupWithDifferentSizes: Story = {
  args: {},
  render: () => {
    return (
      <>
        {(['small', 'medium', 'large', 'xlarge'] as const).map(size => (
          <div key={size} className="border-b border-b-border py-3">
            <h3 className="typography-body-7 mb-4 font-bold">Size: {size}</h3>
            <InputGroup
              size={size}
              label="Text"
              hint="I am a hint"
              supportingText="I am supporting text"
              before="$AUD"
              after="Text"
            >
              <Input />
            </InputGroup>

            <InputGroup
              size={size}
              label="Icon"
              hint="I am a hint"
              supportingText="I am supporting text"
              before={{ icon: props => <VisibilityIcon {...props} color="muted" /> }}
              after={{ icon: props => <VisibilityIcon {...props} color="muted" /> }}
            >
              <Input />
            </InputGroup>

            <InputGroup
              size={size}
              label="Icon Button"
              hint="I am a hint"
              supportingText="I am supporting text"
              before={{
                element: (
                  <Button size={size} look="link" iconAfter={() => <VisibilityIcon size="small" color="muted" />} />
                ),
                inset: true,
              }}
              after={{
                element: (
                  <Button size={size} look="link" iconAfter={() => <VisibilityIcon size="small" color="muted" />} />
                ),
                inset: true,
              }}
            >
              <Input />
            </InputGroup>

            <InputGroup
              size={size}
              label="Button"
              hint="I am a hint"
              supportingText="I am supporting text"
              before={<Button size={size}>Check</Button>}
              after={<Button size={size}>Check</Button>}
            >
              <Input />
            </InputGroup>

            <InputGroup
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
            </InputGroup>
          </div>
        ))}
      </>
    );
  },
};
