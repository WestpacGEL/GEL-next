import { useCalendarGrid } from 'react-aria';

import { CalendarCell } from '../calendar-cell/calendar-cell.component.js';

import { CalendarGridProps } from './calendar-grid.types.js';

export function CalendarGrid({ state, weekdayStyle = 'short', ...props }: CalendarGridProps) {
  const { gridProps, headerProps, weekDays, weeksInMonth } = useCalendarGrid({ weekdayStyle, ...props }, state);

  return (
    <table className="w-full" {...gridProps}>
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th key={index} className="size-6 text-center leading-9">
              {day.toUpperCase().slice(0, 2)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map(weekIndex => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) => (date ? <CalendarCell key={i} state={state} date={date} /> : <td key={i} />))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
