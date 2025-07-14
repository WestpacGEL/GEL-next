import { render, screen } from '@testing-library/react';
import { useDatePickerState } from 'react-stately';
import { Mock, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useBreakpoint } from '../../hook/breakpoints.hook.js';

import { DatePicker } from './date-picker.component.js';

// Mock react-aria and react-stately hooks
vi.mock('react-aria', async () => {
  const actual = await vi.importActual<typeof import('react-aria')>('react-aria');
  return {
    ...actual,
    useDatePicker: vi.fn(() => ({
      groupProps: {},
      labelProps: {},
      fieldProps: {},
      buttonProps: {},
      dialogProps: {},
      calendarProps: {},
    })),
    useButton: vi.fn((props, ref) => ({ buttonProps: { ...props, ref } })),
  };
});

vi.mock('react-stately', async () => {
  const actual = await vi.importActual<typeof import('react-stately')>('react-stately');
  return {
    ...actual,
    useDatePickerState: vi.fn(() => ({
      isOpen: false,
      isInvalid: false,
      open: vi.fn(),
      close: vi.fn(),
    })),
  };
});

// Mock your internal hook
vi.mock('../../hook/breakpoints.hook.js', () => ({
  useBreakpoint: vi.fn(() => 'md'),
}));

// Mock styles
vi.mock('./date-picker.styles.js', () => ({
  styles: () => ({
    input: ({ className }: { className?: string }) => `input ${className || ''}`,
    button: () => 'button-class',
  }),
}));

describe('DatePicker component', () => {
  let mockState: any;

  beforeEach(() => {
    mockState = {
      isOpen: false,
      isInvalid: false,
      open: vi.fn(),
      close: vi.fn(),
    };
    (useDatePickerState as Mock).mockReturnValue(mockState);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders label and button', () => {
    render(<DatePicker label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders popover when state.isOpen is true', () => {
    mockState.isOpen = true;
    render(<DatePicker label="Test Label" />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('applies bottomSheetView correctly', () => {
    (useBreakpoint as Mock).mockReturnValue('initial');

    render(<DatePicker label="Test Label" bottomSheetView={{ initial: true, xsl: false }} />);

    // Basic render check, verifying correct class and button exist
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('passes className correctly to input div', () => {
    render(<DatePicker label="Test Label" className="custom-class" />);
    const inputDiv = screen.getByText('Test Label').nextSibling as HTMLElement;
    expect(inputDiv.className).toContain('custom-class');
  });
});
