import { DateValue, getLocalTimeZone, isWeekend, today } from '@internationalized/date';
import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useLocale } from 'react-aria';

import { Field } from '../index.js';

import { DatePicker } from './date-picker.component.js';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Datepicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    isRequired: {
      description: 'isRequired',
      type: { name: 'boolean' },
    },
  },
  decorators: [
    (Story: StoryFn) => (
      <div className="h-30">
        <Story />
      </div>
    ),
  ],
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
 * > Custom separator usage example
 */
export const CustomSeparator: Story = {
  args: {
    separator: '-',
  },
};

/**
 * > Different sizes example
 */
export const Sizes: Story = {
  args: {},
  render: () => {
    return (
      <>
        {(['small', 'medium', 'large', 'xlarge'] as const).map(size => {
          return (
            <div className="py-2" key={size}>
              <DatePicker size={size} />
            </div>
          );
        })}
      </>
    );
  },
};

/**
 * > Invalid example
 */
export const Invalid: Story = {
  args: {},
  render: () => {
    return <DatePicker isInvalid />;
  },
};

/**
 * > isReadOnly example
 */
export const IsReadOnly: Story = {
  args: {},
  render: () => {
    return <DatePicker isReadOnly />;
  },
};

/**
 * > isRequired example
 */
export const IsRequiredOnly: Story = {
  args: {},
  render: () => {
    return <DatePicker isRequired />;
  },
};

/**
 * > Controlled
 */
export const Controlled = () => {
  const now = today(getLocalTimeZone());
  const disabledRanges = [
    [now, now.add({ days: 5 })],
    [now.add({ days: 14 }), now.add({ days: 16 })],
    [now.add({ days: 23 }), now.add({ days: 24 })],
  ];

  const { locale } = useLocale();
  const [date, setDate] = useState<DateValue | null>(null);
  const [blurredDate, setBlurredDate] = useState<DateValue | null>(null);
  const isDateUnavailable = (date: DateValue) =>
    isWeekend(date, locale) ||
    disabledRanges.some(interval => date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0);

  return (
    <>
      <p>onChange Date: {date ? date.toString() : 'None'}</p>
      <p>
        onBlur Date (NOTE: Focus returns to button after using calendar so blur event not fired):{' '}
        {blurredDate ? blurredDate.toString() : 'None'}
      </p>
      <DatePicker
        onBlur={(e, date) => {
          if (date) setBlurredDate(date);
        }}
        onChange={e => {
          setDate(e as DateValue);
        }}
        isDateUnavailable={isDateUnavailable}
      />
    </>
  );
};

/**
 * > Disabled
 */
export const Disabled: Story = {
  args: {},
  render: () => {
    return <DatePicker isDisabled />;
  },
};

/**
 * > Disabled dates
 */
export const DisabledDates: Story = {
  args: {},
  render: () => {
    const now = today(getLocalTimeZone());
    const disabledRanges = [
      [now, now.add({ days: 5 })],
      [now.add({ days: 14 }), now.add({ days: 16 })],
      [now.add({ days: 23 }), now.add({ days: 24 })],
    ];

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { locale } = useLocale();
    const isDateUnavailable = (date: DateValue) =>
      isWeekend(date, locale) ||
      disabledRanges.some(interval => date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0);

    return <DatePicker isDateUnavailable={isDateUnavailable} />;
  },
};

/**
 * > Disable weekends
 */
export const DisabledWeekendsDates: Story = {
  args: {},
  render: () => {
    return <DatePicker disableWeekends />;
  },
};

/**
 * > Disable weekends
 */
export const DisabledWeekdays: Story = {
  args: {},
  render: () => {
    return <DatePicker disableDaysOfWeek={[0, 1, 2]} />;
  },
};

/**
 * > Disable weekends
 */
export const DisabledWeekdaysWeekendsAndCustom: Story = {
  args: {},
  render: () => {
    const now = today(getLocalTimeZone());
    const disabledRanges = [
      [now, now.add({ days: 5 })],
      [now.add({ days: 14 }), now.add({ days: 16 })],
      [now.add({ days: 23 }), now.add({ days: 24 })],
    ];

    const isDateUnavailable = (date: DateValue) =>
      disabledRanges.some(interval => date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0);

    return <DatePicker isDateUnavailable={isDateUnavailable} disableDaysOfWeek={[0, 1, 2]} disableWeekends />;
  },
};

/**
 * > Show as bottom sheet
 */
export const ShowAsBottomSheet: Story = {
  args: {},
  render: () => {
    return <DatePicker bottomSheetView />;
  },
};

/**
 * > Always as popover view
 */
export const NeverShowAsBottomSheet: Story = {
  args: {},
  render: () => {
    return <DatePicker bottomSheetView={false} />;
  },
};

/**
 * > Show as bottom sheet
 */
export const ShowAsBottomSheetResponsive: Story = {
  args: {},
  render: () => {
    return <DatePicker bottomSheetView={{ initial: false, lg: true }} />;
  },
};

/**
 * > DatePicker block
 */
export const DatePickerBlock: Story = {
  args: {},
  render: () => {
    return <DatePicker aria-label="date picker block" block={{ initial: true }} />;
  },
};

/**
 * > Placement of popover
 */
export const Placement: Story = {
  args: {},
  render: () => {
    return (
      <div className="mt-[200px] flex flex-col space-y-2">
        <Field label="Bottom Left">
          <DatePicker placement="bottom left" block />
        </Field>
        <Field label="Bottom Right">
          <DatePicker placement="bottom right" block />
        </Field>
        <Field label="Top Left">
          <DatePicker placement="top left" block />
        </Field>
        <Field label="Top Right">
          <DatePicker placement="top right" block className="bottom-0" />
        </Field>
      </div>
    );
  },
};
