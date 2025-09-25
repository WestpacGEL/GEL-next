/* eslint-disable sonarjs/deprecation */
import { CalendarDate } from '@internationalized/date';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nProvider } from 'react-aria';
import { act } from 'react-dom/test-utils';
import { Mock, describe, expect, it, vi } from 'vitest';

import { useBreakpoint } from '../../hook/breakpoints.hook.js';

import { DatePickerBeta } from './date-picker.component.js';

vi.mock('../../hook/breakpoints.hook.js', () => ({
  useBreakpoint: vi.fn(() => 'md'),
}));

describe('DatePicker component', () => {
  const user = userEvent.setup();

  it('renders label and button', () => {
    render(<DatePickerBeta label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders popover when state.isOpen is true', async () => {
    render(<DatePickerBeta label="Test Label" />);
    await act(async () => {
      await user.click(screen.getByRole('button'));
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('applies bottomSheetView correctly', async () => {
    (useBreakpoint as Mock).mockReturnValue('initial');

    render(<DatePickerBeta bottomSheetView={{ initial: true, xsl: false }} />);
    await act(async () => {
      await user.click(screen.getByRole('button'));
    });
    expect(screen.getByText('Choose a date')).toBeVisible();
  });

  it('applies the right separator', () => {
    render(<DatePickerBeta label="Test Label" separator="-" />);

    screen.getAllByText('-').forEach(el => {
      expect(el).toBeInTheDocument();
    });
  });

  it('disable weekends', async () => {
    render(<DatePickerBeta disableWeekends value={new CalendarDate(2025, 7, 18)} />);

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
        <DatePickerBeta disableDaysOfWeek={[0, 1, 2]} value={new CalendarDate(2025, 7, 18)} />
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

  it('passes className correctly to input div', () => {
    render(<DatePickerBeta label="Test Label" className="custom-class" />);
    const inputDiv = screen.getByText('Test Label').nextSibling as HTMLElement;
    expect(inputDiv.className).toContain('custom-class');
  });
});
