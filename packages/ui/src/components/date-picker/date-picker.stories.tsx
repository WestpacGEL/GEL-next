import { DateValue, getLocalTimeZone, isWeekend, today } from '@internationalized/date';
import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { useLocale } from 'react-aria';

import { DatePicker } from './date-picker.component.js';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Datepicker',
  component: DatePicker,
  tags: ['autodocs'],
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
