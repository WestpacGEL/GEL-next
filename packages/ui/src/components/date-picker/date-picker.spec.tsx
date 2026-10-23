/* eslint-disable sonarjs/deprecation */
import { CalendarDate } from '@internationalized/date';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { I18nProvider } from 'react-aria';
import { act } from 'react-dom/test-utils';
import { Mock, describe, expect, it, vi } from 'vitest';

import { useBreakpoint } from '../../hook/breakpoints.hook.js';

import { DatePicker } from './date-picker.component.js';

vi.mock('../../hook/breakpoints.hook.js', () => ({
  useBreakpoint: vi.fn(() => 'md'),
}));

describe('DatePicker component', () => {
  const user = userEvent.setup();

  it('renders label and button', () => {
    render(<DatePicker label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders popover when state.isOpen is true', async () => {
    render(<DatePicker label="Test Label" />);
    await act(async () => {
      await user.click(screen.getByRole('button'));
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('applies bottomSheetView correctly', async () => {
    (useBreakpoint as Mock).mockReturnValue('initial');

    render(<DatePicker bottomSheetView={{ initial: true, xsl: false }} />);
    await act(async () => {
      await user.click(screen.getByRole('button'));
    });
    expect(screen.getByText('Choose a date')).toBeVisible();
  });

  it('applies the right separator', () => {
    render(<DatePicker label="Test Label" separator="-" />);

    screen.getAllByText('-').forEach(el => {
      expect(el).toBeInTheDocument();
    });
  });

  it('disable weekends', async () => {
    render(<DatePicker disableWeekends value={new CalendarDate(2025, 7, 18)} />);

    await act(async () => {
      await user.click(screen.getByRole('button'));
    });
    await waitFor(
      () => {
        expect(screen.getByRole('button', { name: 'Friday, July 18, 2025 selected' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Saturday, July 19, 2025', hidden: false })).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });

  it('disable weekdays', async () => {
    render(
      <I18nProvider locale="en-AU">
        <DatePicker disableDaysOfWeek={[0, 1, 2]} value={new CalendarDate(2025, 7, 18)} />
      </I18nProvider>,
    );

    await act(async () => {
      await user.click(screen.getByRole('button'));
    });
    const disabledDays = ['1', '2', '7', '8', '9'];

    disabledDays.forEach(day => {
      const button = screen.getByRole('button', { name: new RegExp(`\\b${day}\\b`) });
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button.className).toContain('line-through');
    });
  });

  it('limits the year dropdown to the minValue/maxValue range', async () => {
    render(
      <DatePicker
        value={new CalendarDate(2025, 7, 18)}
        minValue={new CalendarDate(2023, 1, 1)}
        maxValue={new CalendarDate(2027, 12, 31)}
      />,
    );
    await act(async () => {
      await user.click(screen.getByRole('button'));
    });
    const [, yearSelect] = within(screen.getByRole('dialog')).getAllByRole('combobox');
    const years = within(yearSelect)
      .getAllByRole('option')
      .map(option => option.textContent);
    expect(years).toEqual(['2023', '2024', '2025', '2026', '2027']);
  });

  describe('month dropdown', () => {
    const getEnabledMonths = () => {
      const [monthSelect] = within(screen.getByRole('dialog')).getAllByRole('combobox');
      return within(monthSelect)
        .getAllByRole<HTMLOptionElement>('option')
        .filter(option => !option.disabled)
        .map(option => option.textContent);
    };

    it.each([
      {
        name: 'disables months before minValue, keeping the partially available min month',
        value: new CalendarDate(2025, 3, 20),
        minValue: new CalendarDate(2025, 3, 15),
        maxValue: undefined,
        expected: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      {
        name: 'disables months after maxValue, keeping the partially available max month',
        value: new CalendarDate(2025, 9, 5),
        minValue: undefined,
        maxValue: new CalendarDate(2025, 9, 10),
        expected: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
      {
        name: 'only enables months between minValue and maxValue in the same year',
        value: new CalendarDate(2025, 6, 1),
        minValue: new CalendarDate(2025, 3, 15),
        maxValue: new CalendarDate(2025, 9, 10),
        expected: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
      {
        name: 'enables every month in a year strictly between minValue and maxValue',
        value: new CalendarDate(2025, 7, 18),
        minValue: new CalendarDate(2024, 10, 1),
        maxValue: new CalendarDate(2026, 2, 1),
        expected: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      {
        name: 'enables every month without minValue or maxValue',
        value: new CalendarDate(2025, 7, 18),
        minValue: undefined,
        maxValue: undefined,
        expected: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
    ])('$name', async ({ value, minValue, maxValue, expected }) => {
      render(<DatePicker value={value} minValue={minValue} maxValue={maxValue} />);
      await act(async () => {
        await user.click(screen.getByRole('button'));
      });
      expect(getEnabledMonths()).toEqual(expected);
    });

    it('updates the disabled months when the visible year changes', async () => {
      render(
        <DatePicker
          value={new CalendarDate(2026, 7, 18)}
          minValue={new CalendarDate(2025, 3, 15)}
          maxValue={new CalendarDate(2026, 9, 10)}
        />,
      );
      await act(async () => {
        await user.click(screen.getByRole('button'));
      });
      expect(getEnabledMonths()).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']);

      const [, yearSelect] = within(screen.getByRole('dialog')).getAllByRole('combobox');
      await act(async () => {
        await user.selectOptions(yearSelect, '2025');
      });
      expect(getEnabledMonths()).toEqual(['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    });
  });

  it('only passes DOM props to the input div', () => {
    render(
      <DatePicker
        label="Test Label"
        data-testid="date-picker"
        style={{ width: 200 }}
        minValue={new CalendarDate(2023, 1, 1)}
        maxValue={new CalendarDate(2027, 12, 31)}
      />,
    );
    const inputDiv = screen.getByTestId('date-picker');
    expect(inputDiv).toHaveStyle({ width: '200px' });
    expect(inputDiv).not.toHaveAttribute('minValue');
    expect(inputDiv).not.toHaveAttribute('maxValue');
    expect(inputDiv).not.toHaveAttribute('label');
  });

  it('passes className correctly to input div', () => {
    // eslint-disable-next-line better-tailwindcss/no-unregistered-classes
    render(<DatePicker label="Test Label" className="custom-class" />);
    const inputDiv = screen.getByText('Test Label').nextSibling as HTMLElement;
    expect(inputDiv.className).toContain('custom-class');
  });

  describe('ref', () => {
    it('points at the first editable date segment', () => {
      const ref = createRef<HTMLSpanElement>();
      render(<DatePicker ref={ref} label="Test Label" />);
      expect(ref.current).toBe(screen.getAllByRole('spinbutton')[0]);
    });

    it('focus() moves focus to the first date segment', () => {
      const ref = createRef<HTMLSpanElement>();
      render(<DatePicker ref={ref} label="Test Label" />);
      act(() => ref.current?.focus());
      expect(screen.getAllByRole('spinbutton')[0]).toHaveFocus();
    });
  });
});
