import React, { ChangeEvent, ClipboardEvent, KeyboardEvent, useRef, useState } from 'react';

import { Input } from '../index.js';

import { styles } from './pass-code.styles.js';
import { type PassCodeProps } from './pass-code.types.js';

export function PassCode({ length, onComplete, ...props }: PassCodeProps) {
  const [passcode, setPasscode] = useState<(string | undefined)[]>(Array.from({ length }).map(() => undefined));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Update the passcode state
    const newPasscode = [...passcode.slice(0, index), value, ...passcode.slice(index + 1)];
    setPasscode(newPasscode);

    // Move to the next input if available
    if (index < length - 1 && value !== '') {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete when passcode is complete
    if (newPasscode.filter(passcode => !passcode).length === 0) {
      onComplete(newPasscode.join(''));
    }
  };

  const handlePaste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData('text');
    const validData = pastedData.slice(0, length - index).split('');
    const previousSlice = passcode.slice(0, index);
    const afterSlice = passcode.slice(index);
    setPasscode([...previousSlice, ...[...validData, ...afterSlice.slice(validData.length)]].slice(0, length));
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && index > 0) {
      event.preventDefault();
      const newPasscode = [...passcode.slice(0, index), undefined, ...passcode.slice(index + 1)];
      setPasscode(newPasscode);
      const previousInput = inputRefs.current[index - 1];
      const currentInput = inputRefs.current[index];
      if (previousInput) {
        previousInput.focus();
      }
      if (currentInput) {
        currentInput.value = '';
      }
    }
  };

  const handleFocus = (index: number) => {
    inputRefs.current[index]?.select();
  };

  return (
    <div {...props} className="flex gap-1">
      {passcode.map((digit, index) => (
        <Input
          key={index}
          value={digit}
          onChange={e => handleChange(index, e)}
          onPaste={e => handlePaste(index, e)}
          onKeyDown={e => handleKeyDown(index, e)}
          onFocus={() => handleFocus(index)}
          maxLength={1}
          ref={input => (inputRefs.current[index] = input)}
          className="w-5 px-0 text-center"
          aria-label={`Passcode digit ${index + 1}`}
        />
      ))}
    </div>
  );
}
