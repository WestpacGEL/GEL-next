import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import { Icon } from './icon.component.js';

import * as AllIcons from './index.js';

const AllIconsExample = (props: AllIcons.IconProps) => {
  const [search, setSearch] = useState('');
  const filteredIcons = useMemo(() => {
    return Object.entries(AllIcons).reduce((acc: { Icon: any; key: string }[], [iconName, Icon]) => {
      if (iconName.toUpperCase().indexOf(search.toUpperCase()) === -1) {
        return acc;
      }
      return [...acc, { key: iconName, Icon }];
    }, []);
  }, [search]);

  const handleOnChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  }, []);

  const handleOnClick = useCallback(
    async (key: string) => {
      try {
        await navigator.clipboard.writeText(`<${key} className="${props.className}" />`);
        console.log('Content copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    },
    [props.className],
  );

  return (
    <div className="flex flex-col gap-2">
      <input
        className="rounded-sm border border-border px-3 py-2"
        onChange={handleOnChange}
        placeholder="e.g: Accessibiliy"
      />
      <div className="flex flex-row flex-wrap justify-center gap-2">
        {filteredIcons.map(({ key, Icon }) => (
          <button
            onClick={() => handleOnClick(key)}
            className="flex h-15 w-23 flex-col items-center justify-center gap-2 border border-border"
            key={key}
          >
            <Icon {...props} />
            <span className="whitespace-pre-wrap text-xs">{`<${key} />`}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const meta: Meta<typeof Icon> = {
  title: 'Example/Icon',
  component: AllIconsExample,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div style={{ padding: '3rem' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    className: {
      description: 'Classname',
      type: { name: 'string' },
      defaultValue: 'text-primary icon-size-large',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const DefaultStory: Story = {
  args: {},
};

/**
 * > With primary color example
 */
export const WithPrimaryColorStory: Story = {
  args: {
    className: 'text-primary',
  },
};

/**
 * > With large size example
 */
export const WithDifferentSizeStory: Story = {
  args: {
    className: 'icon-size-large',
  },
};

/**
 * > With responsive sizes example
 */
export const WithResponsiveSizeStory: Story = {
  args: {
    className: 'icon-size-small md:icon-size-large',
  },
};
