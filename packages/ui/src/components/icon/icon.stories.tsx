/* eslint-disable no-console */
import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import { Icon } from './icon.component.js';

import * as AllIcons from './index.js';
import { AlertIcon } from './index.js';

const AllIconsExample = (props: AllIcons.IconProps) => {
  const [search, setSearch] = useState('');
  const filteredIcons = useMemo(() => {
    return Object.entries(AllIcons).reduce((acc: { Icon: typeof Icon; key: string }[], [iconName, Icon]) => {
      if (iconName.toUpperCase().indexOf(search.toUpperCase()) === -1) {
        return acc;
      }
      return [...acc, { key: iconName, Icon }];
    }, []);
  }, [search]);

  const handleOnChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  }, []);

  const handleOnClick = useCallback(async (key: string) => {
    try {
      await navigator.clipboard.writeText(`<${key} />`);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <input
        className="rounded-sm border border-border-muted-soft px-3 py-2"
        onChange={handleOnChange}
        placeholder="e.g: Accessibiliy"
      />
      <div className="flex flex-row flex-wrap justify-center gap-2">
        {filteredIcons.map(({ key, Icon }) => (
          <button
            onClick={() => void handleOnClick(key)}
            className="flex h-15 w-23 flex-col items-center justify-center gap-2 border border-border-muted-soft"
            key={key}
          >
            <Icon {...props} />
            <span className="text-xs whitespace-pre-wrap">{`<${key} />`}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const meta: Meta<typeof Icon> = {
  title: 'Foundation/Icons',
  component: AllIconsExample,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  argTypes: {
    children: {
      description: 'Children',
      type: { name: 'string' },
    },
    copyrightYear: {
      description: 'CopyrightYear',
      type: { name: 'string' },
    },
    size: {
      description: 'size',
      type: { name: 'enum', value: ['xsmall', 'small', 'medium', 'large', 'xlarge'] },
    },
    color: {
      description: 'color',
      type: {
        name: 'enum',
        value: [
          'success',
          'info',
          'warning',
          'danger',
          'system',
          'white',
          'black',
          'background',
          'border',
          'borderDark',
          'focus',
          'heading',
          'hero',
          'light',
          'link',
          'muted',
          'neutral',
          'pop',
          'primary',
          'text',
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {},
};

/**
 * > With primary color example
 */
export const Primary: Story = {
  args: {
    color: 'primary',
  },
};

/**
 * > With primary color example
 */
export const AllColorsExample: Story = {
  args: {},
  render: () => {
    const ALL_COLORS = [
      'muted',
      'muted-vivid',
      'muted-strong',
      'muted-mild',
      'muted-soft',
      'muted-pale',
      'muted-faint',
      'white-pale',
      'white-faint',
      'mono',
      'primary',
      'primary-faint',
      'hero',
      'hero-faint',
      'pop',
      'pop-faint',
      'holler',
      'holler-faint',
      'sing',
      'sing-faint',
      'dance',
      'dance-faint',
      'success',
      'success-faint',
      'info',
      'info-faint',
      'warning',
      'warning-faint',
      'danger',
      'danger-faint',
      'system-error',
      'system-error-dark',
    ] as const;

    return (
      <div className="flex flex-wrap gap-2">
        {ALL_COLORS.map(color => (
          <div key={color} className="flex flex-col items-center">
            <AlertIcon key={color} color={color} />
            <p>{color}</p>
          </div>
        ))}
      </div>
    );
  },
};

/**
 * > With large size example
 */
export const Size: Story = {
  args: {
    size: 'xlarge',
  },
};

/**
 * > With outlined look example
 */
export const Outlined: Story = {
  args: {
    look: 'outlined',
  },
};
