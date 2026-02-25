import { AriaCalendarCellProps } from 'react-aria';
import { CalendarState, RangeCalendarState } from 'react-stately';

export type CalendarCellProps = AriaCalendarCellProps & { state: CalendarState | RangeCalendarState };
