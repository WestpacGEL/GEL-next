import { type Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Field } from '../../components/field/index.js';
import { Select } from '../../components/index.js';
import { BASE_COLORS } from '../../tailwind/constants/colors.js';
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
    ];
    const TINTS = ['DEFAULT', 90, 80, 70, 60, 50, 40, 30, 20, 10, 5];
    const [selectedTint, setSelectedTint] = useState('DEFAULT');
    const tintString = selectedTint !== 'DEFAULT' ? `-${selectedTint}` : '';

    return (
      <>
        <div className="p-2">
          <Field label="Select a tint:">
            <Select onChange={e => setSelectedTint(e.target.value)}>
              {TINTS.map(tint => (
                <option value={tint}>{tint}</option>
              ))}
            </Select>
          </Field>
        </div>
        <div className="flex flex-wrap">
          {brandColors.map(color => (
            <div className="w-[33%] min-w-[200px] max-w-[300px] p-2">
              <div className={`bg-${color}${tintString} h-[80px]`} />
              <div className="border-border divide-border divide-y border p-2">
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
              <option value={tint}>{tint}</option>
            ))}
          </Select>
        </Field>
      </div>
      <div className="flex flex-wrap">
        {reservedColors.map(color => (
          <div className="w-[33%] min-w-[200px] max-w-[300px] p-2">
            <div className={`bg-${color}${tintString} h-[80px]`} />
            <div className="border-border divide-border divide-y border p-2">
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
      <div className={`bg-black h-[80px]`} />
      <div className="border-border divide-border divide-y border p-2">
        <div className="pb-2 font-bold">black</div>
        <div className="typography-body-10 py-2 font-light">{`Tailwind eg: bg-black`}</div>
        <div className="typography-body-10 pt-2 font-light">#000</div>
      </div>
    </div>
    <div className="w-[33%] min-w-[200px] max-w-[300px] p-2">
      <div className={`bg-white h-[80px] border border-border`} />
      <div className="border-border divide-border divide-y border p-2">
        <div className="pb-2 font-bold">white</div>
        <div className="typography-body-10 py-2 font-light">{`Tailwind eg: bg-white`}</div>
        <div className="typography-body-10 pt-2 font-light">#FFF</div>
      </div>
    </div>
  </div>
);
