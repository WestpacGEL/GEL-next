import { Key } from '@react-types/shared';
import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { FIXED_WIDTHS } from '../../constants/input-widths.js';

import { Autocomplete } from './autocomplete.component.js';
import { AutocompleteItem } from './components/autocomplete-item/autocomplete-item.component.js';

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => {
      /**
       * NOTE:
       * Needed to change displayName here so subcomponent shows correct name in code view
       * Could not change it on the component as Item from react-stately is used in three components
       * and one displayName would overwrite the others
       */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      AutocompleteItem.displayName = 'AutocompleteItem';

      return (
        <div className="h-30">
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    'aria-label': 'Animals',
    children: [
      <AutocompleteItem key="red panda">Red Panda</AutocompleteItem>,
      <AutocompleteItem key="cat">Cat</AutocompleteItem>,
      <AutocompleteItem key="dog">Dog</AutocompleteItem>,
      <AutocompleteItem key="aardvark">Aardvark</AutocompleteItem>,
      <AutocompleteItem key="kangaroo">Kangaroo</AutocompleteItem>,
      <AutocompleteItem key="snake">Snake</AutocompleteItem>,
    ],
  },
};

/**
 * > Controlled usage example
 */
export const Controlled = () => {
  const [selectedKey, setSelectedKey] = useState<Key | null>();
  const handleSelectionChange = (key: Key | null) => {
    setSelectedKey(key);
  };
  return (
    <Autocomplete onSelectionChange={handleSelectionChange} selectedKey={selectedKey} aria-label="Animals">
      <AutocompleteItem key="red panda">Red Panda</AutocompleteItem>
      <AutocompleteItem key="cat">Cat</AutocompleteItem>
      <AutocompleteItem key="dog">Dog</AutocompleteItem>
      <AutocompleteItem key="aardvark">Aardvark</AutocompleteItem>
      <AutocompleteItem key="kangaroo">Kangaroo</AutocompleteItem>
      <AutocompleteItem key="snake">Snake</AutocompleteItem>
    </Autocomplete>
  );
};

/**
 * > Disabled usage example
 */
export const Disabled: Story = {
  args: {
    isDisabled: true,
    'aria-label': 'Disable example',
    children: [
      <AutocompleteItem key="red panda">Red Panda</AutocompleteItem>,
      <AutocompleteItem key="cat">Cat</AutocompleteItem>,
      <AutocompleteItem key="dog">Dog</AutocompleteItem>,
      <AutocompleteItem key="aardvark">Aardvark</AutocompleteItem>,
      <AutocompleteItem key="kangaroo">Kangaroo</AutocompleteItem>,
      <AutocompleteItem key="snake">Snake</AutocompleteItem>,
    ],
  },
};

/**
 * > Invalid usage example
 */
export const Invalid: Story = {
  args: {
    invalid: true,
    'aria-label': 'Invalid example',
    children: [
      <AutocompleteItem key="red panda">Red Panda</AutocompleteItem>,
      <AutocompleteItem key="cat">Cat</AutocompleteItem>,
      <AutocompleteItem key="dog">Dog</AutocompleteItem>,
      <AutocompleteItem key="aardvark">Aardvark</AutocompleteItem>,
      <AutocompleteItem key="kangaroo">Kangaroo</AutocompleteItem>,
      <AutocompleteItem key="snake">Snake</AutocompleteItem>,
    ],
  },
};

/**
 * > Sizes example
 */
export const Sizes: Story = {
  args: {},
  render: () => {
    return (
      <>
        {(['small', 'medium', 'large', 'xlarge'] as const).map(size => (
          <div className="py-2" key={size}>
            <Autocomplete label={size} size={size} aria-label={`size ${size}`}>
              <AutocompleteItem key="red panda">Red Panda</AutocompleteItem>
              <AutocompleteItem key="cat">Cat</AutocompleteItem>
              <AutocompleteItem key="dog">Dog</AutocompleteItem>
              <AutocompleteItem key="aardvark">Aardvark</AutocompleteItem>
              <AutocompleteItem key="kangaroo">Kangaroo</AutocompleteItem>
              <AutocompleteItem key="snake">Snake</AutocompleteItem>
            </Autocomplete>
          </div>
        ))}
      </>
    );
  },
};

/**
 * > Footer example
 */
export const Footer: Story = {
  args: {},
  render: () => {
    return (
      <div className="py-2">
        <Autocomplete label="With footer" footer={<h3>Footer</h3>}>
          <AutocompleteItem key="red panda">Red Panda</AutocompleteItem>
          <AutocompleteItem key="cat">Cat</AutocompleteItem>
          <AutocompleteItem key="dog">Dog</AutocompleteItem>
          <AutocompleteItem key="aardvark">Aardvark</AutocompleteItem>
          <AutocompleteItem key="kangaroo">Kangaroo</AutocompleteItem>
          <AutocompleteItem key="snake">Snake</AutocompleteItem>
          <AutocompleteItem key="elephant">Elephant</AutocompleteItem>
          <AutocompleteItem key="giraffe">Giraffe</AutocompleteItem>
          <AutocompleteItem key="lion">Lion</AutocompleteItem>
          <AutocompleteItem key="tiger">Tiger</AutocompleteItem>
          <AutocompleteItem key="penguin">Penguin</AutocompleteItem>
          <AutocompleteItem key="octopus">Octopus</AutocompleteItem>
          <AutocompleteItem key="cheetah">Cheetah</AutocompleteItem>
          <AutocompleteItem key="polar bear">Polar Bear</AutocompleteItem>
          <AutocompleteItem key="koala">Koala</AutocompleteItem>
          <AutocompleteItem key="dolphin">Dolphin</AutocompleteItem>
          <AutocompleteItem key="flamingo">Flamingo</AutocompleteItem>
          <AutocompleteItem key="elephant seal">Elephant Seal</AutocompleteItem>
          <AutocompleteItem key="orca">Orca</AutocompleteItem>
        </Autocomplete>
      </div>
    );
  },
};

/**
 * Error message and label
 */
export const ErrorMessageAndLabel: Story = {
  args: {
    label: 'Are you an existing customer?',
    errorMessage: 'This is an inline error message',
    hintMessage: 'Hint: choose from one of the following options',
    noOptionsMessage: 'No options',
    invalid: true,
    children: [
      <AutocompleteItem key="Option 1">Option 1</AutocompleteItem>,
      <AutocompleteItem key="Option 2">Option 2</AutocompleteItem>,
      <AutocompleteItem key="Option 3">Option 3</AutocompleteItem>,
    ],
  },
};

/**
 * > Fixed widths usage example
 */
export const FixedWidths = () => {
  return (
    <div className="flex flex-col gap-2">
      {FIXED_WIDTHS.map(width => (
        <Autocomplete key={width} label={`Fixed width: ${width.toString()}`} width={width}>
          <AutocompleteItem key="red panda">Red Panda</AutocompleteItem>
          <AutocompleteItem key="cat">Cat</AutocompleteItem>
          <AutocompleteItem key="dog">Dog</AutocompleteItem>
          <AutocompleteItem key="aardvark">Aardvark</AutocompleteItem>
          <AutocompleteItem key="kangaroo">Kangaroo</AutocompleteItem>
          <AutocompleteItem key="snake">Snake</AutocompleteItem>
        </Autocomplete>
      ))}
    </div>
  );
};

/**
 * > Dynamic collections example
 */
export const DynamicCollections = () => {
  const options = [
    { id: 'red panda', name: 'Red Panda' },
    { id: 'cat', name: 'Cat' },
    { id: 'dog', name: 'Dog' },
    { id: 'aardvark', name: 'Aardvark' },
    { id: 'kangaroo', name: 'Kangaroo' },
    { id: 'snake', name: 'Snake' },
  ];
  return (
    <div className="flex flex-col gap-2">
      <Autocomplete aria-label="Animals" defaultItems={options}>
        {item => <AutocompleteItem>{item.name}</AutocompleteItem>}
      </Autocomplete>
    </div>
  );
};

/**
 * > Dynamic collections with Async call
 */
export const AsyncDynamicCollections = () => {
  // For example purposes async call is made on focus of input rather than when page loads
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<{ id: string; name: string }[]>([]);
  const getCollection = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setItems([
      { id: 'red panda', name: 'Red Panda' },
      { id: 'cat', name: 'Cat' },
      { id: 'dog', name: 'Dog' },
      { id: 'aardvark', name: 'Aardvark' },
      { id: 'kangaroo', name: 'Kangaroo' },
      { id: 'snake', name: 'Snake' },
    ]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <Autocomplete items={items} onFocus={() => void getCollection()} loadingState={loading}>
        {item => <AutocompleteItem>{item.name}</AutocompleteItem>}
      </Autocomplete>
    </div>
  );
};

/**
 * > Passing external ref
 */
export const TestPassingRefAndFocus = () => {
  const autocompleteRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-2">
      <Autocomplete ref={autocompleteRef}>
        <AutocompleteItem key="red panda">Red Panda</AutocompleteItem>
        <AutocompleteItem key="cat">Cat</AutocompleteItem>
        <AutocompleteItem key="dog">Dog</AutocompleteItem>
        <AutocompleteItem key="aardvark">Aardvark</AutocompleteItem>
        <AutocompleteItem key="kangaroo">Kangaroo</AutocompleteItem>
        <AutocompleteItem key="snake">Snake</AutocompleteItem>
      </Autocomplete>
      <button onClick={() => autocompleteRef.current?.focus()}>Test focus</button>
    </div>
  );
};
