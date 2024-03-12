import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PassCode } from './pass-code.component.js';
import { styles } from './pass-code.styles.js';

const PASSCODE_DIGIT = 'Passcode digit';
const PASSCODE_DIGIT_1 = `${PASSCODE_DIGIT} 1`;
const PASSCODE_DIGIT_2 = `${PASSCODE_DIGIT} 2`;
const PASSCODE_DIGIT_3 = `${PASSCODE_DIGIT} 3`;
const PASSCODE_DIGIT_4 = `${PASSCODE_DIGIT} 4`;

describe('PassCode', () => {
  const user = userEvent.setup();

  it('renders the component', () => {
    const { container } = render(
      <PassCode
        length={4}
        onComplete={() => {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();

    expect(style.base()).toBe('flex gap-2');
    expect(style.input()).toBe('w-6 px-0 text-center');
  });

  it('triggers the onComplete correctly', async () => {
    const onCompleteMock = vi.fn();
    const { container, getByLabelText } = render(<PassCode length={4} onComplete={onCompleteMock} />);

    // Ensure the correct number of input elements are rendered
    const inputElements = container.querySelectorAll('input');
    expect(inputElements.length).toBe(4);

    // Simulate user input
    await act(() => user.type(getByLabelText(PASSCODE_DIGIT_1), '1'));
    await act(() => user.type(getByLabelText(PASSCODE_DIGIT_2), '2'));
    await act(() => user.type(getByLabelText(PASSCODE_DIGIT_3), '3'));
    await act(() => user.type(getByLabelText(PASSCODE_DIGIT_4), '4'));

    // Ensure the onComplete callback is called with the correct passcode
    expect(onCompleteMock).toHaveBeenCalledWith('1234');
  });

  it('handles backspace correctly', async () => {
    const onCompleteMock = vi.fn();
    const { getByLabelText } = render(<PassCode length={4} onComplete={onCompleteMock} />);

    // Simulate user input
    await act(() => user.type(getByLabelText(PASSCODE_DIGIT_1), '1'));
    await act(() => user.type(getByLabelText(PASSCODE_DIGIT_2), '2'));
    await act(() => user.type(getByLabelText(PASSCODE_DIGIT_3), '3'));
    await act(() => user.type(getByLabelText(PASSCODE_DIGIT_4), '4'));

    // Simulate backspace
    fireEvent.keyDown(getByLabelText(PASSCODE_DIGIT_4), { key: 'Backspace' });

    expect(screen.getByLabelText<HTMLInputElement>(PASSCODE_DIGIT_4).value).toBe('');

    // Ensure focus moves to the previous input
    expect(document.activeElement).toBe(getByLabelText(PASSCODE_DIGIT_3));
  });

  it('handles paste correctly', () => {
    const onCompleteMock = vi.fn();
    const { getByLabelText } = render(<PassCode length={4} onComplete={onCompleteMock} />);

    // Simulate pasting
    fireEvent.paste(getByLabelText(PASSCODE_DIGIT_1), {
      clipboardData: {
        getData: () => '5678',
      },
    });

    // Ensure the onComplete callback is called with the correct passcode
    expect(onCompleteMock).toHaveBeenCalledWith('5678');

    // Ensure all input values are updated correctly
    expect(screen.getByLabelText<HTMLInputElement>(PASSCODE_DIGIT_1).value).toBe('5');
    expect(screen.getByLabelText<HTMLInputElement>(PASSCODE_DIGIT_2).value).toBe('6');
    expect(screen.getByLabelText<HTMLInputElement>(PASSCODE_DIGIT_3).value).toBe('7');
    expect(screen.getByLabelText<HTMLInputElement>(PASSCODE_DIGIT_4).value).toBe('8');
  });

  it('selects entire text on focus', async () => {
    const onCompleteMock = vi.fn();
    const { getByLabelText } = render(<PassCode length={4} onComplete={onCompleteMock} />);

    // Simulate focus on an input
    await act(() => user.type(getByLabelText(PASSCODE_DIGIT_1), '1'));
    await act(() => user.type(getByLabelText(PASSCODE_DIGIT_2), '2'));
    fireEvent.focus(getByLabelText(PASSCODE_DIGIT_2));

    // Ensure the entire text is selected
    expect(screen.getByLabelText<HTMLInputElement>(PASSCODE_DIGIT_2).selectionStart).toBe(0);
    expect(screen.getByLabelText<HTMLInputElement>(PASSCODE_DIGIT_2).selectionEnd).toBe(1);
  });
});
