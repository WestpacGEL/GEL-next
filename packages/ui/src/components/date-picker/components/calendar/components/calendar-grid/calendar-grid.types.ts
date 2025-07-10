import { HTMLAttributes } from 'react';
import { AriaCalendarGridProps, CalendarGridAria } from 'react-aria';
import { CalendarState, RangeCalendarState } from 'react-stately';
import { VariantProps } from 'tailwind-variants';

// import { styles } from './calendar-grid.styles.js';

// type Variants = VariantProps<typeof styles>;

export type CalendarGridProps = AriaCalendarGridProps & { state: CalendarState | RangeCalendarState };
