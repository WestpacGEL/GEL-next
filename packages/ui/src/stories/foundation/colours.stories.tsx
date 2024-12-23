import { type Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Field, Select } from '../../components/index.js';
import { BASE_COLORS, DATA_VIS_COLORS } from '../../tailwind/constants/colors.js';
import { BrandKey } from '../../tailwind/index.js';
import { ALL_THEMES } from '../../tailwind/themes/index.js';
import { generateColorTints } from '../../tailwind/utils/generate-color-tints.js';

const meta: Meta = {
  title: 'Foundation/Colours',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// NOTE: Although unused this needs to be here so all colors load correctly
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LOAD_COLORS = {
  background: [
    'bg-background',
    'bg-background-90',
    'bg-background-80',
    'bg-background-70',
    'bg-background-60',
    'bg-background-50',
    'bg-background-40',
    'bg-background-30',
    'bg-background-20',
    'bg-background-10',
    'bg-background-5',
  ],
  border: [
    'bg-border',
    'bg-border-90',
    'bg-border-80',
    'bg-border-70',
    'bg-border-60',
    'bg-border-50',
    'bg-border-40',
    'bg-border-30',
    'bg-border-20',
    'bg-border-10',
    'bg-border-5',
  ],
  borderDark: [
    'bg-borderDark',
    'bg-borderDark-90',
    'bg-borderDark-80',
    'bg-borderDark-70',
    'bg-borderDark-60',
    'bg-borderDark-50',
    'bg-borderDark-40',
    'bg-borderDark-30',
    'bg-borderDark-20',
    'bg-borderDark-10',
    'bg-borderDark-5',
  ],
  focus: [
    'bg-focus',
    'bg-focus-90',
    'bg-focus-80',
    'bg-focus-70',
    'bg-focus-60',
    'bg-focus-50',
    'bg-focus-40',
    'bg-focus-30',
    'bg-focus-20',
    'bg-focus-10',
    'bg-focus-5',
  ],
  heading: [
    'bg-heading',
    'bg-heading-90',
    'bg-heading-80',
    'bg-heading-70',
    'bg-heading-60',
    'bg-heading-50',
    'bg-heading-40',
    'bg-heading-30',
    'bg-heading-20',
    'bg-heading-10',
    'bg-heading-5',
  ],
  hero: [
    'bg-hero',
    'bg-hero-90',
    'bg-hero-80',
    'bg-hero-70',
    'bg-hero-60',
    'bg-hero-50',
    'bg-hero-40',
    'bg-hero-30',
    'bg-hero-20',
    'bg-hero-10',
    'bg-hero-5',
  ],
  light: [
    'bg-light',
    'bg-light-90',
    'bg-light-80',
    'bg-light-70',
    'bg-light-60',
    'bg-light-50',
    'bg-light-40',
    'bg-light-30',
    'bg-light-20',
    'bg-light-10',
    'bg-light-5',
  ],
  link: [
    'bg-link',
    'bg-link-90',
    'bg-link-80',
    'bg-link-70',
    'bg-link-60',
    'bg-link-50',
    'bg-link-40',
    'bg-link-30',
    'bg-link-20',
    'bg-link-10',
    'bg-link-5',
  ],
  muted: [
    'bg-muted',
    'bg-muted-90',
    'bg-muted-80',
    'bg-muted-70',
    'bg-muted-60',
    'bg-muted-50',
    'bg-muted-40',
    'bg-muted-30',
    'bg-muted-20',
    'bg-muted-10',
    'bg-muted-5',
  ],
  neutral: [
    'bg-neutral',
    'bg-neutral-90',
    'bg-neutral-80',
    'bg-neutral-70',
    'bg-neutral-60',
    'bg-neutral-50',
    'bg-neutral-40',
    'bg-neutral-30',
    'bg-neutral-20',
    'bg-neutral-10',
    'bg-neutral-5',
  ],
  pop: [
    'bg-pop',
    'bg-pop-90',
    'bg-pop-80',
    'bg-pop-70',
    'bg-pop-60',
    'bg-pop-50',
    'bg-pop-40',
    'bg-pop-30',
    'bg-pop-20',
    'bg-pop-10',
    'bg-pop-5',
  ],
  primary: [
    'bg-primary',
    'bg-primary-90',
    'bg-primary-80',
    'bg-primary-70',
    'bg-primary-60',
    'bg-primary-40',
    'bg-primary-50',
    'bg-primary-30',
    'bg-primary-20',
    'bg-primary-10',
    'bg-primary-5',
  ],
  text: [
    'bg-text',
    'bg-text-90',
    'bg-text-80',
    'bg-text-70',
    'bg-text-60',
    'bg-text-50',
    'bg-text-40',
    'bg-text-30',
    'bg-text-20',
    'bg-text-10',
    'bg-text-5',
  ],
  success: [
    'bg-success',
    'bg-success-90',
    'bg-success-80',
    'bg-success-70',
    'bg-success-60',
    'bg-success-50',
    'bg-success-40',
    'bg-success-30',
    'bg-success-20',
    'bg-success-10',
    'bg-success-5',
  ],
  info: [
    'bg-info',
    'bg-info-90',
    'bg-info-80',
    'bg-info-70',
    'bg-info-60',
    'bg-info-50',
    'bg-info-40',
    'bg-info-30',
    'bg-info-20',
    'bg-info-10',
    'bg-info-5',
  ],
  warning: [
    'bg-warning',
    'bg-warning-90',
    'bg-warning-80',
    'bg-warning-70',
    'bg-warning-60',
    'bg-warning-50',
    'bg-warning-40',
    'bg-warning-30',
    'bg-warning-20',
    'bg-warning-10',
    'bg-warning-5',
  ],
  danger: [
    'bg-danger',
    'bg-danger-90',
    'bg-danger-80',
    'bg-danger-70',
    'bg-danger-60',
    'bg-danger-50',
    'bg-danger-40',
    'bg-danger-30',
    'bg-danger-20',
    'bg-danger-10',
    'bg-danger-5',
  ],
  system: [
    'bg-system',
    'bg-system-90',
    'bg-system-80',
    'bg-system-70',
    'bg-system-60',
    'bg-system-50',
    'bg-system-40',
    'bg-system-30',
    'bg-system-20',
    'bg-system-10',
    'bg-system-5',
  ],
  'data-a-solid': ['bg-data-a-solid', 'bg-data-a-solid/30'],
  'data-a-tint': ['bg-data-a-tint'],
  'data-b-solid': ['bg-data-b-solid', 'bg-data-b-solid/30'],
  'data-b-tint': ['bg-data-b-tint'],
  'data-c-solid': ['bg-data-c-solid', 'bg-data-c-solid/30'],
  'data-c-tint': ['bg-data-c-tint'],
  'data-d-solid': ['bg-data-d-solid', 'bg-data-d-solid/30'],
  'data-d-tint': ['bg-data-d-tint'],
  'data-e-solid': ['bg-data-e-solid', 'bg-data-e-solid/30'],
  'data-e-tint': ['bg-data-e-tint'],
  'data-f-solid': ['bg-data-f-solid', 'bg-data-f-solid/30'],
  'data-f-tint': ['bg-data-f-tint'],
};

/**
 * Examples for all colors that change with brand
 */
export const BrandColors: Story = {
  render: (args, { globals: { theme } }) => {
    const currThemeToken = theme ? theme : 'WBC';
    const currColors = ALL_THEMES.find(brand => brand.code === currThemeToken)?.colors;
    const brandColors = [
      'background',
      'border',
      'borderDark',
      'heading',
      'hero',
      'light',
      'link',
      'muted',
      'neutral',
      'pop',
      'primary',
      'text',
      'focus',
    ];
    const TINTS = ['DEFAULT', 90, 80, 70, 60, 50, 40, 30, 20, 10, 5];
    // NOTE: Below is ignored as we need global theme value from render
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedTint, setSelectedTint] = useState('DEFAULT');
    const tintString = selectedTint !== 'DEFAULT' ? `-${selectedTint}` : '';

    return (
      <>
        <div className="p-2">
          <Field label="Select a tint:">
            <Select onChange={e => setSelectedTint(e.target.value)}>
              {TINTS.map(tint => (
                <option value={tint} key={tint}>
                  {tint}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <div className="flex flex-wrap">
          {brandColors.map(color => (
            <div className="w-[33%] min-w-[200px] max-w-[300px] p-2" key={color}>
              {/* NOTE: Below disable tailwind classname warning for string interpolation */}
              {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
              <div className={`bg-${color}${tintString} h-[80px]`} />
              <div className="divide-y divide-border border border-border p-2">
                <div className="pb-2 font-bold">{color}</div>
                <div className="typography-body-10 py-2 font-light">{`Tailwind eg: bg-${color}${tintString}`}</div>
                {/* Below comments to get rid of type nightmare when trying to get hex value */}
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <div className="typography-body-10 pt-2 font-light">{currColors[color][selectedTint]}</div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  },
};

/**
 * All reserved colors that do not change with brand
 */
export const ReservedColors = () => {
  const reservedColors = Object.keys(BASE_COLORS);
  const TINTS = ['DEFAULT', 90, 80, 70, 60, 50, 40, 30, 20, 10, 5];
  const [selectedTint, setSelectedTint] = useState('DEFAULT');
  const tintString = selectedTint !== 'DEFAULT' ? `-${selectedTint}` : '';
  const baseColorTints = generateColorTints(BASE_COLORS);
  return (
    <>
      <div className="p-2">
        <Field label="Select a tint:">
          <Select onChange={e => setSelectedTint(e.target.value)}>
            {TINTS.map(tint => (
              <option value={tint} key={tint}>
                {tint}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <div className="flex flex-wrap">
        {reservedColors.map(color => (
          <div className="w-[33%] min-w-[200px] max-w-[300px] p-2" key={color}>
            {/* NOTE: Below disable tailwind classname warning for string interpolation */}
            {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
            <div className={`bg-${color}${tintString} h-[80px]`} />
            <div className="divide-y divide-border border border-border p-2">
              <div className="pb-2 font-bold">{color}</div>
              <div className="typography-body-10 py-2 font-light">{`Tailwind eg: bg-${color}${tintString}`}</div>
              {/* Below comments to get rid of type nightmare when trying to get hex value */}
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <div className="typography-body-10 pt-2 font-light">{baseColorTints[color][selectedTint]}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

/**
 * Colors that are reserved but have no extra tints
 */
export const ReservedWithNoTints = () => (
  <div className="flex">
    <div className="w-[33%] min-w-[200px] max-w-[300px] p-2">
      <div className={`h-[80px] bg-black`} />
      <div className="divide-y divide-border border border-border p-2">
        <div className="pb-2 font-bold">black</div>
        <div className="typography-body-10 py-2 font-light">{`Tailwind eg: bg-black`}</div>
        <div className="typography-body-10 pt-2 font-light">#000</div>
      </div>
    </div>
    <div className="w-[33%] min-w-[200px] max-w-[300px] p-2">
      <div className={`h-[80px] border border-border bg-white`} />
      <div className="divide-y divide-border border border-border p-2">
        <div className="pb-2 font-bold">white</div>
        <div className="typography-body-10 py-2 font-light">{`Tailwind eg: bg-white`}</div>
        <div className="typography-body-10 pt-2 font-light">#FFF</div>
      </div>
    </div>
  </div>
);

/**
 * Examples for all data visualisation colors, name in brackets are what it could be referred to in Figma etc.
 */
export const DataVisualisationColors: Story = {
  render: (args, { globals: { theme } }) => {
    const currThemeToken: Exclude<BrandKey, 'btfg'> = theme ? theme.toLowerCase() : 'wbc';
    const dataVisSolidColors = [
      'data-a-solid',
      'data-b-solid',
      'data-c-solid',
      'data-d-solid',
      'data-e-solid',
      'data-f-solid',
    ];
    const dataVisTintColors = [
      'data-a-tint',
      'data-b-tint',
      'data-c-tint',
      'data-d-tint',
      'data-e-tint',
      'data-f-tint',
    ];

    return (
      <>
        <div className="flex flex-wrap">
          {dataVisSolidColors.map(color => (
            <div key={color} className="flex w-[16%] min-w-[100px] max-w-[300px] flex-col">
              <div className=" p-2" key={color}>
                {/* NOTE: Below disable tailwind classname warning for string interpolation */}
                {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
                <div className={`bg-${color} h-[80px]`} />
                <div className="divide-y divide-border border border-border p-2">
                  <div className="pb-2 font-bold">{color}</div>
                  <div className="typography-body-10 py-2 font-light">{`Tailwind eg: bg-${color}`}</div>
                  {/* Below comments to get rid of type nightmare when trying to get hex value */}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <div className="typography-body-10 pt-2 font-light">{DATA_VIS_COLORS[currThemeToken][color]}</div>
                </div>
              </div>
            </div>
          ))}
          {dataVisTintColors.map(color => (
            <div key={color} className="flex w-[16%] min-w-[100px] max-w-[300px] flex-col">
              <div className=" p-2" key={color}>
                {/* NOTE: Below disable tailwind classname warning for string interpolation */}
                {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
                <div className={`bg-${color} h-[80px]`} />
                <div className="divide-y divide-border border border-border p-2">
                  <div className="pb-2 font-bold">{color}</div>
                  <div className="typography-body-10 py-2 font-light">{`Tailwind eg: bg-${color}`}</div>
                  {/* Below comments to get rid of type nightmare when trying to get hex value */}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <div className="typography-body-10 pt-2 font-light">{DATA_VIS_COLORS[currThemeToken][color]}</div>
                </div>
              </div>
            </div>
          ))}
          {dataVisSolidColors.map(color => (
            <div key={color} className="flex w-[16%] min-w-[100px] max-w-[300px] flex-col">
              <div className=" p-2" key={`${color}/30`}>
                {/* NOTE: Below disable tailwind classname warning for string interpolation */}
                {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
                <div className={`bg-${color}/30 h-[80px]`} />
                <div className="divide-y divide-border border border-border p-2">
                  <div className="pb-2 font-bold">{`${color}/30`}</div>
                  <div className="typography-body-10 py-2 font-light">{`Tailwind eg: bg-${color}/30`}</div>
                  {/* Below comments to get rid of type nightmare when trying to get hex value */}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <div className="typography-body-10 pt-2 font-light">{DATA_VIS_COLORS[currThemeToken][color]}4D</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  },
};
