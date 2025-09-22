import { type Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { ALL_BRANDS } from '@westpac/style-config/tokens';
import { useState } from 'react';

// import WBC_TOKENS from '../../../w3c-tokens/wbc.json' with { type: 'json' };
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
          <div className="bg-background-white-black p-2">
            <p className="text-text-warning font-bold">
              NOTE: These tokens are not final and this is for example purposes
            </p>
            <p className="text-text-warning font-bold">
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
    'bg-background-white-black',
    'bg-background-faint',
    'bg-background-pale',
    'bg-surface-muted',
    'bg-surface-muted-vivid',
    'bg-surface-muted-strong',
    'bg-surface-muted-mild',
    'bg-surface-hover-primary',
    'bg-surface-hover-primary-faint',
    'bg-surface-active-primary-faint',
    'bg-surface-hover-hero-faint',
    'bg-surface-active-muted-pale',
    'bg-surface-hover-mono',
    'bg-surface-active-hero-faint',
    'bg-surface-hover-mono',
    'bg-surface-active-mono',
    'bg-surface-active-primary',
    'bg-surface-muted-soft',
    'bg-surface-muted-pale',
    'bg-surface-muted-faint',
    'bg-background-white-pale',
    'bg-background-white-faint',
    'bg-surface-mono',
    'bg-surface-primary',
    'bg-surface-primary-faint',
    'bg-surface-hero',
    'bg-surface-hover-hero',
    'bg-surface-active-hero',
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
    'bg-surface-data-a-solid',
    'bg-surface-data-a-tint',
    'bg-surface-data-a-opacity',
    'bg-surface-data-b-solid',
    'bg-surface-data-b-tint',
    'bg-surface-data-b-opacity',
    'bg-surface-data-c-solid',
    'bg-surface-data-c-tint',
    'bg-surface-data-c-opacity',
    'bg-surface-data-d-solid',
    'bg-surface-data-d-tint',
    'bg-surface-data-d-opacity',
    'bg-surface-data-e-solid',
    'bg-surface-data-e-tint',
    'bg-surface-data-e-opacity',
    'bg-data-a-solid/50',
    'bg-data-b-solid/60',
    'bg-data-c-solid/45',
    'bg-data-d-solid/50',
    'bg-data-e-solid/50',
    'bg-data-f-solid/45',
    'bg-data-a-solid/50',
    'bg-data-b-solid/60',
    'bg-data-c-solid/45',
    'bg-data-d-solid/50',
    'bg-data-e-solid/50',
    'bg-data-f-solid/45',
    'bg-surface-data-f-solid',
    'bg-surface-data-f-tint',
    'bg-surface-data-f-opacity',
    'bg-surface-pictogram-base',
    'bg-surface-pictogram-accent',
  ],
};

const colors = {
  background: [
    'bg-background-white-black',
    'bg-background-faint',
    'bg-background-pale',
    'bg-background-white-pale',
    'bg-background-white-faint',
  ],
  surface: [
    'bg-surface-mono',
    'bg-surface-muted-vivid',
    'bg-surface-muted',
    'bg-surface-muted-strong',
    'bg-surface-muted-mild',
    'bg-surface-muted-soft',
    'bg-surface-muted-pale',
    'bg-surface-muted-faint',
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
  ],
  text: [
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
  ],
  border: [
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
          <div className="bg-background-white-black p-2">
            <p className="text-text-body font-bold">All colors used in this example are using new color tokens</p>
          </div>
          <div className="bg-background-white-black flex flex-wrap">
            {screenColors.map(color => (
              <div className="w-[33%] max-w-[300px] min-w-[200px] p-2" key={color}>
                <div className={`bg-${color} border-border-muted-soft h-[80px] border border-b-0`} />
                <div className="divide-border-muted-soft border-border-muted-soft divide-y border p-2">
                  <div className="text-text-body pb-2 font-bold">{color}</div>
                  <div className="typography-body-10 text-text-body py-2 font-light">{`Tailwind eg: bg-${color}`}</div>
                  {/* Below comments to get rid of type nightmare when trying to get hex value */}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <div className="typography-body-10 text-text-body pt-2 font-light">{currColors[color]}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    } else {
      return (
        <div>
          <p className="text-text-body pb-2 font-bold">
            This story only works with the new themes, please change to one of the new themes with the theme switcher
          </p>
        </div>
      );
    }
  },
};

export const Surface = () => {
  // Replace with relevant brand?
  const surfaceColors = Object.keys(ALL_BRANDS.Tokens.Westpac['light-mode'].color.surface);
  // console.log(Object.keys(WBC_TOKENS.Tokens['light-mode'].color.surface));

  return (
    <>
      <div className="bg-background-white-black p-2">
        <p className="text-text-body font-bold">All colors used in this example are using new color tokens</p>
      </div>
      <div className="bg-background-white-black flex flex-wrap">
        {surfaceColors.map(color => (
          <div className="w-[33%] max-w-[300px] min-w-[200px] p-2" key={color}>
            <div className={`bg-${color} border-border-muted-soft h-[80px] border border-b-0`} />
            <div className="divide-border-muted-soft border-border-muted-soft divide-y border p-2">
              <div className="text-text-body pb-2 font-bold">{color}</div>
              <div className="typography-body-10 text-text-body py-2 font-light">{`Tailwind class: ${color}`}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
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
          <div className="bg-background-white-black p-2">
            <p className="text-text-body font-bold">All colors used in this example are using new color tokens</p>
          </div>
          <div className="bg-background-white-black flex flex-wrap">
            {surfaceColors.map(color => (
              <div className="w-[33%] max-w-[300px] min-w-[200px] p-2" key={color}>
                <div className={`bg-${color} border-border-muted-soft h-[80px] border border-b-0`} />
                <div className="divide-border-muted-soft border-border-muted-soft divide-y border p-2">
                  <div className="text-text-body pb-2 font-bold">{color}</div>
                  <div className="typography-body-10 text-text-body py-2 font-light">{`Tailwind eg: bg-${color}`}</div>
                  {/* Below comments to get rid of type nightmare when trying to get hex value */}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <div className="typography-body-10 text-text-body pt-2 font-light">{currColors[color]}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    } else {
      return (
        <div>
          <p className="text-text-body pb-2 font-bold">
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
          <div className="bg-background-white-black p-2">
            <p className="text-text-body font-bold">All colors used in this example are using new color tokens</p>
          </div>
          <div className="bg-background-white-black flex flex-wrap">
            {textColors.map(color => (
              <div className="w-[33%] max-w-[300px] min-w-[200px] p-2" key={color}>
                <div className={`bg-${color} border-border-muted-soft h-[80px] border border-b-0`} />
                <div className="divide-border-muted-soft border-border-muted-soft divide-y border p-2">
                  <div className="text-text-body pb-2 font-bold">{color}</div>
                  <div className="typography-body-10 text-text-body py-2 font-light">{`Tailwind eg: text-${color}`}</div>
                  {/* Below comments to get rid of type nightmare when trying to get hex value */}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <div className="typography-body-10 text-text-body pt-2 font-light">{currColors[color]}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    } else {
      return (
        <div>
          <p className="text-text-body pb-2 font-bold">
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
          <div className="bg-background-white-black p-2">
            <p className="text-text-body font-bold">All colors used in this example are using new color tokens</p>
          </div>
          <div className="bg-background-white-black flex flex-wrap">
            {borderColors.map(color => (
              <div className="w-[33%] max-w-[300px] min-w-[200px] p-2" key={color}>
                <div className={`bg-${color} border-border-muted-soft h-[80px] border border-b-0`} />
                <div className="divide-border-muted-soft border-border-muted-soft divide-y border p-2">
                  <div className="text-text-body pb-2 font-bold">{color}</div>
                  <div className="typography-body-10 text-text-body py-2 font-light">{`Tailwind eg: border-${color}`}</div>
                  {/* Below comments to get rid of type nightmare when trying to get hex value */}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <div className="typography-body-10 text-text-body pt-2 font-light">{currColors[color]}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    } else {
      return (
        <div>
          <p className="text-text-body pb-2 font-bold">
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
          <div className="bg-background-white-black p-2">
            <p className="text-text-body font-bold">All colors used in this example are using new color tokens</p>
          </div>
          <div className="bg-background-white-black flex flex-wrap">
            {dataColors.map(color => {
              /* Below comments to get rid of type nightmare when trying to get hex value */
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              /* @ts-ignore */
              const currentColor = currColors[color];
              if (currentColor.indexOf('rgba') !== -1) {
                const opacity = +currentColor.replace('rgba(', '').replace(')', '').split(',').at(-1) * 100;
                const className = `bg-${color.replace('-opacity', '')}-solid/${opacity}`;

                return (
                  <div className="w-[33%] max-w-[300px] min-w-[200px] p-2" key={color}>
                    <div className={`${className} border-border-muted-soft h-[80px] border border-b-0`} />
                    <div className="divide-border-muted-soft border-border-muted-soft divide-y border p-2">
                      <div className="text-text-body pb-2 font-bold">{color}</div>
                      <div className="typography-body-10 text-text-body py-2 font-light">{`Tailwind eg: ${className}`}</div>

                      <div className="typography-body-10 text-text-body pt-2 font-light">{currentColor}</div>
                    </div>
                  </div>
                );
              }
              return (
                <div className="w-[33%] max-w-[300px] min-w-[200px] p-2" key={color}>
                  <div className={`bg-${color} border-border-muted-soft h-[80px] border border-b-0`} />
                  <div className="divide-border-muted-soft border-border-muted-soft divide-y border p-2">
                    <div className="text-text-body pb-2 font-bold">{color}</div>
                    <div className="typography-body-10 text-text-body py-2 font-light">{`Tailwind eg: bg-${color}`}</div>

                    <div className="typography-body-10 text-text-body pt-2 font-light">{currentColor}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
    } else {
      return (
        <div>
          <p className="text-text-body pb-2 font-bold">
            This story only works with the new themes, please change to one of the new themes with the theme switcher
          </p>
        </div>
      );
    }
  },
};
