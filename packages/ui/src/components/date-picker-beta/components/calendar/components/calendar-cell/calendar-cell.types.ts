import { AriaCalendarCellProps } from 'react-aria';
import { CalendarState, RangeCalendarState } from 'react-stately';

// import { styles } from './calendar-Cell.styles.js';

// type Variants = VariantProps<typeof styles>;

export type CalendarCellProps = AriaCalendarCellProps & { state: CalendarState | RangeCalendarState };
