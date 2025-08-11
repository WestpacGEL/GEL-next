import { type Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Switch } from '../../components/switch/switch.component.js';
import { ALL_THEMES } from '../../tailwind/themes/index.js';

const meta: Meta = {
  title: 'Foundation/New Tokens',
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn, { globals: { theme } }) => {
      const dataThemeEl = document.getElementsByTagName('html')[0];
      const [checked, setChecked] = useState(false);
      const toggledTheme = theme.includes('LIGHT') ? theme.split('-')[0] + '-DARK' : theme.split('-')[0] + '-LIGHT';
      return (
        <div>
          <Switch
            label="Toggle opposite mode"
            checked={checked}
            onChange={isSelected => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              dataThemeEl.setAttribute('data-theme', isSelected ? toggledTheme.toLowerCase() : theme.toLowerCase());
              setChecked(isSelected);
            }}
            className="pl-2"
          />
          <div className="bg-screen-background-white p-2">
            <p className="font-bold text-text-warning">
              NOTE: These tokens are not final and this is for example purposes
            </p>
            <p className="font-bold text-text-warning">
              NOTE: When toggling the hex value displayed will not change, you need to change theme at the top to change
              the displayed hex value.
            </p>
          </div>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

// NOTE: Although unused this needs to be here so all colors load correctly

const LOAD_COLORS = {
  colors: [
    'bg-screen-background-white',
    'bg-screen-background-faint',
    'bg-screen-background-pale',
    'bg-surface-muted',
    'bg-surface-muted-vivid',
    'bg-surface-muted-strong',
    'bg-surface-muted-mild',
    'bg-surface-muted-soft',
    'bg-surface-muted-pale',
    'bg-surface-muted-faint',
    'bg-surface-white-soft',
    'bg-surface-white-pale',
    'bg-surface-white-faint',
    'bg-surface-mono',
    'bg-surface-primary',
    'bg-surface-primary-faint',
    'bg-surface-hero',
    'bg-surface-hero-faint',
    'bg-surface-pop',
    'bg-surface-pop-faint',
    'bg-surface-holler',
    'bg-surface-holler-faint',
    'bg-surface-sing',
    'bg-surface-sing-faint',
    'bg-surface-dance',
    'bg-surface-dance-faint',
    'bg-surface-success',
    'bg-surface-success-faint',
    'bg-surface-info',
    'bg-surface-info-faint',
    'bg-surface-warning',
    'bg-surface-warning-faint',
    'bg-surface-danger',
    'bg-surface-danger-faint',
    'bg-surface-system-error',
    'bg-surface-system-error-dark',
    'bg-text-body',
    'bg-text-heading',
    'bg-text-muted',
    'bg-text-primary',
    'bg-text-hero',
    'bg-text-holler',
    'bg-text-link',
    'bg-text-success',
    'bg-text-info',
    'bg-text-warning',
    'bg-text-danger',
    'bg-text-system-error',
    'bg-text-mono',
    'bg-border-muted',
    'bg-border-muted-strong',
    'bg-border-muted-mild',
    'bg-border-muted-soft',
    'bg-border-hero',
    'bg-border-primary',
    'bg-border-pop',
    'bg-border-holler',
    'bg-border-sing',
    'bg-border-dance',
    'bg-border-success',
    'bg-border-success-mild',
    'bg-border-info',
    'bg-border-info-mild',
    'bg-border-warning',
    'bg-border-warning-mild',
    'bg-border-danger',
    'bg-border-danger-mild',
    'bg-border-reversed',
    'bg-border-focus',
    'bg-data-a-solid',
    'bg-data-a-tint',
    'bg-data-a-opacity',
    'bg-data-b-solid',
    'bg-data-b-tint',
    'bg-data-b-opacity',
    'bg-data-c-solid',
    'bg-data-c-tint',
    'bg-data-c-opacity',
    'bg-data-d-solid',
    'bg-data-d-tint',
    'bg-data-d-opacity',
    'bg-data-e-solid',
    'bg-data-e-tint',
    'bg-data-e-opacity',
    'bg-data-f-solid',
    'bg-data-f-tint',
    'bg-data-f-opacity',
    'bg-pictogram-base',
    'bg-pictogram-accent',
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Examples for all colors that change with brand
 */
export const ScreenColors: Story = {
  render: (args, { globals: { theme } }) => {
    const currThemeToken = theme ? theme : 'WBC';
    const currColors = ALL_THEMES.find(brand => brand.code === currThemeToken)?.colors;
    const screenColors = Object.keys(currColors as object).filter(color => color.includes('screen-'));

    if (theme.includes('LIGHT') || theme.includes('DARK')) {
      return (
        <>
          <div className="bg-screen-background-white p-2">
            <p className="font-bold text-text-body">All colors used in this example are using new color tokens</p>
          </div>
          <div className="flex flex-wrap bg-screen-background-white">
            {screenColors.map(color => (
              <div className="w-[33%] min-w-[200px] max-w-[300px] p-2" key={color}>
                <div className={`bg-${color} h-[80px] border border-b-0 border-border-muted-soft`} />
                <div className="divide-y divide-border-muted-soft border border-border-muted-soft p-2">
                  <div className="pb-2 font-bold text-text-body">{color}</div>
                  <div className="typography-body-10 py-2 font-light text-text-body">{`Tailwind eg: bg-${color}`}</div>
                  {/* Below comments to get rid of type nightmare when trying to get hex value */}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <div className="typography-body-10 pt-2 font-light text-text-body">{currColors[color]}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    } else {
      return (
        <div>
          <p className="pb-2 font-bold text-text-body">
            This story only works with the new themes, please change to one of the new themes with the theme switcher
          </p>
        </div>
      );
    }
  },
};

/**
 * Examples for all colors that change with brand
 */
export const SurfaceColors: Story = {
  render: (args, { globals: { theme } }) => {
    const currThemeToken = theme ? theme : 'WBC';
    const currColors = ALL_THEMES.find(brand => brand.code === currThemeToken)?.colors;
    const surfaceColors = Object.keys(currColors as object).filter(color => color.includes('surface-'));

    if (theme.includes('LIGHT') || theme.includes('DARK')) {
      return (
        <>
          <div className="bg-screen-background-white p-2">
            <p className="font-bold text-text-body">All colors used in this example are using new color tokens</p>
          </div>
          <div className="flex flex-wrap bg-screen-background-white">
            {surfaceColors.map(color => (
              <div className="w-[33%] min-w-[200px] max-w-[300px] p-2" key={color}>
                <div className={`bg-${color} h-[80px] border border-b-0 border-border-muted-soft`} />
                <div className="divide-y divide-border-muted-soft border border-border-muted-soft p-2">
                  <div className="pb-2 font-bold text-text-body">{color}</div>
                  <div className="typography-body-10 py-2 font-light text-text-body">{`Tailwind eg: bg-${color}`}</div>
                  {/* Below comments to get rid of type nightmare when trying to get hex value */}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <div className="typography-body-10 pt-2 font-light text-text-body">{currColors[color]}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    } else {
      return (
        <div>
          <p className="pb-2 font-bold text-text-body">
            This story only works with the new themes, please change to one of the new themes with the theme switcher
          </p>
        </div>
      );
    }
  },
};

/**
 * Examples for all colors that change with brand
 */
export const TextColors: Story = {
  render: (args, { globals: { theme } }) => {
    const currThemeToken = theme ? theme : 'WBC';
    const currColors = ALL_THEMES.find(brand => brand.code === currThemeToken)?.colors;
    const textColors = Object.keys(currColors as object).filter(color => color.includes('text-'));

    if (theme.includes('LIGHT') || theme.includes('DARK')) {
      return (
        <>
          <div className="bg-screen-background-white p-2">
            <p className="font-bold text-text-body">All colors used in this example are using new color tokens</p>
          </div>
          <div className="flex flex-wrap bg-screen-background-white">
            {textColors.map(color => (
              <div className="w-[33%] min-w-[200px] max-w-[300px] p-2" key={color}>
                <div className={`bg-${color} h-[80px] border border-b-0 border-border-muted-soft`} />
                <div className="divide-y divide-border-muted-soft border border-border-muted-soft p-2">
                  <div className="pb-2 font-bold text-text-body">{color}</div>
                  <div className="typography-body-10 py-2 font-light text-text-body">{`Tailwind eg: text-${color}`}</div>
                  {/* Below comments to get rid of type nightmare when trying to get hex value */}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <div className="typography-body-10 pt-2 font-light text-text-body">{currColors[color]}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    } else {
      return (
        <div>
          <p className="pb-2 font-bold text-text-body">
            This story only works with the new themes, please change to one of the new themes with the theme switcher
          </p>
        </div>
      );
    }
  },
};

/**
 * Examples for all colors that change with brand
 */
export const BorderColors: Story = {
  render: (args, { globals: { theme } }) => {
    const currThemeToken = theme ? theme : 'WBC';
    const currColors = ALL_THEMES.find(brand => brand.code === currThemeToken)?.colors;
    const borderColors = Object.keys(currColors as object).filter(color => color.includes('border-'));

    if (theme.includes('LIGHT') || theme.includes('DARK')) {
      return (
        <>
          <div className="bg-screen-background-white p-2">
            <p className="font-bold text-text-body">All colors used in this example are using new color tokens</p>
          </div>
          <div className="flex flex-wrap bg-screen-background-white">
            {borderColors.map(color => (
              <div className="w-[33%] min-w-[200px] max-w-[300px] p-2" key={color}>
                <div className={`bg-${color} h-[80px] border border-b-0 border-border-muted-soft`} />
                <div className="divide-y divide-border-muted-soft border border-border-muted-soft p-2">
                  <div className="pb-2 font-bold text-text-body">{color}</div>
                  <div className="typography-body-10 py-2 font-light text-text-body">{`Tailwind eg: border-${color}`}</div>
                  {/* Below comments to get rid of type nightmare when trying to get hex value */}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <div className="typography-body-10 pt-2 font-light text-text-body">{currColors[color]}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    } else {
      return (
        <div>
          <p className="pb-2 font-bold text-text-body">
            This story only works with the new themes, please change to one of the new themes with the theme switcher
          </p>
        </div>
      );
    }
  },
};

/**
 * Examples for all colors that change with brand
 */
export const DataColors: Story = {
  render: (args, { globals: { theme } }) => {
    const currThemeToken = theme ? theme : 'WBC';
    const currColors = ALL_THEMES.find(brand => brand.code === currThemeToken)?.colors;
    const dataColors = Object.keys(currColors as object).filter(color => color.includes('data-'));

    if (theme.includes('LIGHT') || theme.includes('DARK')) {
      return (
        <>
          <div className="bg-screen-background-white p-2">
            <p className="font-bold text-text-body">All colors used in this example are using new color tokens</p>
          </div>
          <div className="flex flex-wrap bg-screen-background-white">
            {dataColors.map(color => (
              <div className="w-[33%] min-w-[200px] max-w-[300px] p-2" key={color}>
                <div className={`bg-${color} h-[80px] border border-b-0 border-border-muted-soft`} />
                <div className="divide-y divide-border-muted-soft border border-border-muted-soft p-2">
                  <div className="pb-2 font-bold text-text-body">{color}</div>
                  <div className="typography-body-10 py-2 font-light text-text-body">{`Tailwind eg: bg-${color}`}</div>
                  {/* Below comments to get rid of type nightmare when trying to get hex value */}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <div className="typography-body-10 pt-2 font-light text-text-body">{currColors[color]}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    } else {
      return (
        <div>
          <p className="pb-2 font-bold text-text-body">
            This story only works with the new themes, please change to one of the new themes with the theme switcher
          </p>
        </div>
      );
    }
  },
};
