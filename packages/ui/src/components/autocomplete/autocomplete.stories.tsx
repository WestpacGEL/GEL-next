import { Key } from '@react-types/shared';
import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';
import { useFilter } from 'react-aria';
import { useComboBoxState } from 'react-stately';

import { FIXED_WIDTHS } from '../../constants/input-widths.js';
import { Circle } from '../circle/circle.component.js';

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
 * > Async collections that automatically open when results arrive
 */
export const AsyncDynamicCollections = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<{ id: string; name: string }[]>([]);

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { contains } = useFilter({ sensitivity: 'base' });

  const children = (item: { id: string; name: string }) => <AutocompleteItem>{item.name}</AutocompleteItem>;
  const sharedProps = {
    items,
    label: 'Choose an animal',
    onInputChange: (val: string) => {
      void fetchAnimals(val);
    },
  };

  const state = useComboBoxState({
    defaultFilter: contains,
    ...sharedProps,
    menuTrigger: 'manual', // allow manual open
    children,
  });

  useEffect(() => {
    if (items.length > 0) {
      state.open(null, 'manual'); // 👈 force open
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const fetchAnimals = async (query: string) => {
    // fake async fetch
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setItems(
      ['Red Panda', 'Cat', 'Dog', 'Aardvark', 'Kangaroo', 'Snake']
        .filter(name => name.toLowerCase().includes(query.toLowerCase()))
        .map(name => ({ id: name.toLowerCase().replace(/\s+/g, '-'), name })),
    );
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <Autocomplete comboBoxState={state} loadingState={loading} {...sharedProps}>
        {children}
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

/**
 * > Custom item example
 */
export const UsingCustomItems: Story = {
  args: {
    'aria-label': 'Custom Items',
    children: [
      <AutocompleteItem key="BSB" textValue="Business Name">
        <div className="flex flex-col">
          <h3 className="typography-body-9 font-medium">Business Name</h3>
          <p>12 345 678 910</p>
        </div>
      </AutocompleteItem>,
      <AutocompleteItem key="staff" textValue="Staff Name">
        <div className="flex items-center gap-2">
          <Circle className="size-5 bg-muted text-white">SN</Circle>
          <div className="flex flex-col ">
            <h3 className="typography-body-9">Staff Name</h3>
            <p className="typography-body-10 text-borderDark group-hover:text-white group-[.is-focused]:text-white">
              Staff role, staff business area
            </p>
          </div>
        </div>
      </AutocompleteItem>,
    ],
  },
};
