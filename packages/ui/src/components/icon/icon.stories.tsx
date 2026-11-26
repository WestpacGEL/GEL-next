/* eslint-disable no-console */
import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { expect, waitFor, within } from 'storybook/test';

import { Icon } from './icon.component.js';

import * as AllIcons from './index.js';
import { AlertIcon } from './index.js';

const SEMANTIC_COLORS = [
  'body',
  'heading',
  'muted',
  'primary',
  'hero',
  'holler',
  'link',
  'success',
  'info',
  'warning',
  'danger',
  'system-error',
  'mono',
  'reversed',
] as const;

const COMPATIBILITY_COLORS = [
  'muted-vivid',
  'muted-strong',
  'muted-mild',
  'muted-soft',
  'muted-pale',
  'muted-faint',
  'white-pale',
  'white-faint',
  'primary-faint',
  'hero-faint',
  'pop',
  'pop-faint',
  'holler-faint',
  'success-faint',
  'info-faint',
  'warning-faint',
  'danger-faint',
  'system-error-dark',
] as const;

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
      description: 'Semantic icon role, or a retained compatibility colour. Omit to inherit colour.',
      type: {
        name: 'enum',
        value: [...SEMANTIC_COLORS, ...COMPATIBILITY_COLORS],
      },
    },
    look: {
      description: 'Icon look variation. Defaults to filled',
      type: { name: 'enum', value: ['filled', 'outlined'] },
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
 * > All supported colours, including retained surface/background compatibility values.
 */
export const AllColorsExample: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex flex-wrap gap-2">
        {[...SEMANTIC_COLORS, ...COMPATIBILITY_COLORS].map(color => (
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
 * > Semantic icon colours follow the toolbar's selected brand and light/dark mode.
 * > Mono and reversed samples use a hero backdrop so white icons remain visible.
 */
export const SemanticColors: Story = {
  render: () => (
    <section aria-label="Semantic icon colours" className="bg-background-white p-3 text-text-body">
      <h2 className="mb-3 typography-body-7 font-bold">Semantic icon colours</h2>
      <div className="grid grid-cols-2 gap-2">
        {SEMANTIC_COLORS.map(color => (
          <div key={color} className="border border-border-muted-soft p-2">
            <p className="mb-1 typography-body-11">{color}</p>
            <div
              className={color === 'mono' || color === 'reversed' ? 'flex gap-2 bg-surface-hero p-1' : 'flex gap-2 p-1'}
            >
              <AlertIcon color={color} size="large" aria-label={`${color} filled`} />
              <AlertIcon color={color} look="outlined" size="large" aria-label={`${color} outlined`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  ),
  play: async ({ canvasElement }) => {
    const section = within(canvasElement).getByRole('region', { name: 'Semantic icon colours' });
    // Resolve the token independently of the Icon mapping, using real browser CSS.
    const reference = document.createElement('span');
    section.appendChild(reference);
    try {
      for (const color of SEMANTIC_COLORS) {
        await expect(getComputedStyle(section).getPropertyValue(`--icon-${color}`).trim()).not.toBe('');
        reference.style.color = `var(--icon-${color})`;
        for (const look of ['filled', 'outlined']) {
          const icon = within(section).getByRole('img', { name: `${color} ${look}` });
          await waitFor(() => expect(getComputedStyle(icon).color).toBe(getComputedStyle(reference).color));
        }
      }
    } finally {
      reference.remove();
    }
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
