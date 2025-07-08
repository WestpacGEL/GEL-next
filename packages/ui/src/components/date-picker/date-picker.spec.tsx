/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { render, screen } from '@testing-library/react';

import { DatePicker } from './date-picker.component.js';
import { styles } from './date-picker.styles.js';
import { createDate, formatDate, isDateDisabled } from './date-picker.utils.js';

vi.mock('@duetds/date-picker/custom-element', () => {
  const createMockDatePicker = (w: Window) => {
    customElements.get('duet-date-picker') ||
      customElements.define(
        'duet-date-picker',
        class extends HTMLElement {
          constructor() {
            super();
            const p = w.document.createElement('p');
            p.setAttribute('role', 'date-picker');
            p.textContent = 'duet-ds-date-picker';
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const dateAdapter = this.dateAdapter;
            if (!dateAdapter) {
              return;
            }
            const formattedDate: string = dateAdapter?.format(new Date('2029-12-04T00:12:00.000Z'));
            p.setAttribute('data-formatted-date', formattedDate);
            const _createDate = (s1: string, s2: string, s3: string) => {
              return `${s1}-${s2}-${s3}T00:00:00.000Z`;
            };
            const parseDate: string = dateAdapter?.parse('12-12-2012', _createDate);
            p.setAttribute('data-parse-date', parseDate);

            this.appendChild(p);
          }
        },
      );
  };

  return {
    defineCustomElements: (w: Window) => createMockDatePicker(w),
  };
});

describe('DatePicker', () => {
  it('renders the custom date picker element, bind the parse and format functions to the date adaptor', async () => {
    render(<DatePicker />);
    const el = await screen.findByText('duet-ds-date-picker');
    expect(el).toBeInTheDocument();
    expect(el.getAttribute('data-parse-date')).toBe('2012-12-12T00:00:00.000Z');
    expect(el.getAttribute('data-formatted-date')).toBe('04-12-2029');
  });

  it('renders the style correctly', () => {
    const style = styles({ size: 'lg' });
    // TODO: use some variants for test
    expect(style).toBe('date-picker date-picker-lg');
  });
  describe('DatePicker utils', () => {
    it('should format the date', () => {
      expect(formatDate(createDate('2023', '08', '01') ?? new Date(), 'dd/MM/yyyy')).toBe('01/08/2023');
    });

    it('should calculate the disabled date', () => {
      expect(isDateDisabled(new Date('2023-08-01'), true)).toBe(false);
      expect(isDateDisabled(new Date('2023-08-05'), true)).toBe(true);
      expect(isDateDisabled(createDate('2023', '08', '06') ?? new Date(), undefined, undefined, ['2023-08-06'])).toBe(
        true,
      );
    });
  });
});
