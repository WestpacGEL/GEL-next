import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Key } from 'react-aria';

import { Field } from '../field/field.component.js';

import { ButtonGroup } from './button-group.component.js';
import { ButtonGroupButton } from './components/button-group-button/button-group-button.component.js';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  argTypes: {
    isDisabled: {
      description: 'Controls whether all radio options are disabled or not',
      type: { name: 'boolean' },
    },
    size: {
      description:
        'Controls size of buttons, can use any size the regular GEL Next Button components use or responsive sizing',
    },
  },
  args: {
    isDisabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const LOOKS = ['primary', 'hero'] as const;
const SIZES = ['small', 'medium', 'large', 'xlarge'] as const;
const ITEMS = [
  { text: 'Option 1', id: '1' },
  { text: 'Option 2', id: '2' },
  { text: 'Option 3', id: '3' },
];

/**
 * > Default usage example
 */
export const Default = () => {
  return (
    <ButtonGroup>
      {ITEMS.map(({ id, text }) => (
        <ButtonGroupButton id={id} key={id}>
          {text}
        </ButtonGroupButton>
      ))}
    </ButtonGroup>
  );
};

/**
 * Button group looks
 */
export const Colors = () => (
  <div className="flex flex-col gap-2">
    {LOOKS.map(look => (
      <ButtonGroup key={look} look={look}>
        {ITEMS.map(({ id, text }) => (
          <ButtonGroupButton id={id} key={id}>
            {text}
          </ButtonGroupButton>
        ))}
      </ButtonGroup>
    ))}
  </div>
);

/**
 * Button group sizes
 */
export const Sizes = () => (
  <div className="flex flex-col gap-2">
    {SIZES.map(size => (
      <Field key={size} label={<h3 className="font-bold">{size}</h3>}>
        <ButtonGroup key={size} size={size}>
          {ITEMS.map(({ id, text }) => (
            <ButtonGroupButton id={id} key={id}>
              {text}
            </ButtonGroupButton>
          ))}
        </ButtonGroup>
      </Field>
    ))}
  </div>
);

/**
 * Button group responsive sizing
 */
export const ResponsiveSize = () => {
  return (
    <ButtonGroup
      size={{
        initial: 'small',
        md: 'large',
        lg: 'xlarge',
      }}
    >
      {ITEMS.map(({ id, text }) => (
        <ButtonGroupButton id={id} key={id}>
          {text}
        </ButtonGroupButton>
      ))}
    </ButtonGroup>
  );
};

/**
 * Button group block
 */
export const Block = () => (
  <div className="flex flex-col gap-2">
    {SIZES.map(size => (
      <Field key={size} label={<h3 className="font-bold">{size}</h3>}>
        <ButtonGroup size={size} block>
          {ITEMS.map(({ id, text }) => (
            <ButtonGroupButton id={id} key={id}>
              {text}
            </ButtonGroupButton>
          ))}
        </ButtonGroup>
      </Field>
    ))}
  </div>
);

/**
 * Disabled button group
 */
export const Disabled = () => {
  return (
    <ButtonGroup isDisabled>
      {ITEMS.map(({ id, text }) => (
        <ButtonGroupButton id={id} key={id}>
          {text}
        </ButtonGroupButton>
      ))}
    </ButtonGroup>
  );
};

/**
 * SingleSelectionState button group
 */
export const SingleSelectionState = () => {
  const [selectedKey, setSelectedKey] = useState<Key>();
  return (
    <ButtonGroup onSelectionChange={value => setSelectedKey(value)} selectedKeys={selectedKey}>
      {ITEMS.map(({ id, text }) => (
        <ButtonGroupButton id={id} key={id}>
          {text}
        </ButtonGroupButton>
      ))}
    </ButtonGroup>
  );
};

/**
 * Default selection SingleSelectionState button group
 */
export const DefaultSelectedSingleSelectionState = () => {
  const [selectedKey, setSelectedKey] = useState<Key>('1');
  return (
    <ButtonGroup onSelectionChange={value => setSelectedKey(value)} selectedKeys={selectedKey}>
      {ITEMS.map(({ id, text }) => (
        <ButtonGroupButton id={id} key={id}>
          {text}
        </ButtonGroupButton>
      ))}
    </ButtonGroup>
  );
};

/**
 * MultipleSelectionState button group
 */
export const MultipleSelectionState = () => {
  const [selectedKeys, setSelectedKeys] = useState<Iterable<Key>>();
  return (
    <ButtonGroup
      selectionMode="multiple"
      onSelectionChange={value => setSelectedKeys(value)}
      selectedKeys={selectedKeys}
    >
      {ITEMS.map(({ id, text }) => (
        <ButtonGroupButton id={id} key={id}>
          {text}
        </ButtonGroupButton>
      ))}
    </ButtonGroup>
  );
};

/**
 * Default selection MultipleSelectionState button group
 */
export const DefaultSelectionMultipleSelectionState = () => {
  const [selectedKeys, setSelectedKeys] = useState<Iterable<Key>>(['1', '2']);
  return (
    <ButtonGroup
      selectionMode="multiple"
      onSelectionChange={value => setSelectedKeys(value)}
      selectedKeys={selectedKeys}
    >
      {ITEMS.map(({ id, text }) => (
        <ButtonGroupButton id={id} key={id}>
          {text}
        </ButtonGroupButton>
      ))}
    </ButtonGroup>
  );
};
