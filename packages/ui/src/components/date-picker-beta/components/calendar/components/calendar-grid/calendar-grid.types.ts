import { AriaCalendarGridProps } from 'react-aria';
import { CalendarState, RangeCalendarState } from 'react-stately';

export type CalendarGridProps = AriaCalendarGridProps & { state: CalendarState | RangeCalendarState };
