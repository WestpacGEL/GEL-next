'use client';

import React, {
  ChangeEvent,
  ClipboardEvent,
  FocusEvent,
  KeyboardEvent,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { Input } from '../index.js';

import { styles as passCodeStyles } from './pass-code.styles.js';
import { PassCodeProps, PassCodeRef } from './pass-code.types.js';

export const PassCode = forwardRef<PassCodeRef, PassCodeProps>(
  ({ length, value, onChange, onComplete, className, type = 'alphanumeric', onBlur, ...props }, ref) => {
    const [internalPasscode, setInternalPasscode] = useState<string[]>(Array.from({ length }).map(() => ''));
    const passcode = value ? value : internalPasscode;
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const styles = passCodeStyles({});

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRefs.current[0]?.focus();
      },
      clear: () => {
        setInternalPasscode(Array.from({ length }).map(() => ''));
      },
    }));

    const handleChange = useCallback(
      (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value.slice(-1);
        if (
          (type === 'numbers' && /^\d$/.test(inputValue)) ||
          (type === 'letters' && /^[a-zA-Z]$/.test(inputValue)) ||
          (type === 'alphanumeric' && /^[a-zA-Z0-9]$/.test(inputValue))
        ) {
          const newPasscode = [...passcode.slice(0, index), inputValue, ...passcode.slice(index + 1)];
          if (onChange) {
            onChange(newPasscode);
          } else {
            setInternalPasscode(newPasscode);
          }

          // Move to the next input if available
          if (index < length - 1 && inputValue !== '') {
            inputRefs.current[index + 1]?.focus();
          }
          if (newPasscode.filter(passcode => !passcode).length === 0 && onComplete) {
            onComplete(newPasscode.join(''));
          }
        }
      },
      [passcode, length, onChange, onComplete, type],
    );

    const handlePaste = useCallback(
      (index: number, event: ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const pastedData = event.clipboardData.getData('text');
        const validData = pastedData
          .slice(0, length - index)
          .split('')
          .filter(char => {
            if (type === 'numbers') return /^\d$/.test(char);
            if (type === 'letters') return /^[a-zA-Z]$/.test(char);
            return /^[a-zA-Z0-9]$/.test(char);
          });
        const previousSlice = passcode.slice(0, index);
        const afterSlice = passcode.slice(index);
        const newPasscode = [...previousSlice, ...[...validData, ...afterSlice.slice(validData.length)]].slice(
          0,
          length,
        );
        if (onChange) {
          onChange(newPasscode);
        } else {
          setInternalPasscode(newPasscode);
        }
        if (newPasscode.filter(passcode => !passcode).length === 0 && onComplete) {
          onComplete(newPasscode.join(''));
        }
      },
      [passcode, length, onChange, onComplete, type],
    );

    const handleKeyDown = useCallback(
      (index: number, event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace') {
          event.preventDefault();
          const newPasscode = [...passcode.slice(0, index), '', ...passcode.slice(index + 1)];
          if (onChange) {
            onChange(newPasscode);
          } else {
            setInternalPasscode(newPasscode);
          }
          const previousInput = inputRefs.current[index - 1];
          const currentInput = inputRefs.current[index];
          if (previousInput) {
            previousInput.focus();
          }
          if (currentInput) {
            currentInput.value = '';
          }
        }
      },
      [passcode, onChange],
    );

    const handleFocus = useCallback(
      (index: number) => {
        inputRefs.current[index]?.select();
      },
      [inputRefs],
    );

    const handleBlur = useCallback(
      (index: number, event: FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
          onBlur(index, event);
        }
      },
      [onBlur],
    );

    return (
      <div {...props} className={styles.base({ className })}>
        {Array.from({ length }).map((_, index) => (
          <Input
            size="large"
            key={index}
            value={passcode[index] || ''}
            onChange={e => handleChange(index, e)}
            onPaste={e => handlePaste(index, e)}
            onKeyDown={e => handleKeyDown(index, e)}
            onFocus={() => handleFocus(index)}
            onBlur={e => handleBlur(index, e)}
            ref={input => (inputRefs.current[index] = input)}
            className={styles.input({})}
            aria-label={`Passcode digit ${index + 1}`}
            inputMode={type === 'numbers' ? 'numeric' : 'text'}
          />
        ))}
      </div>
    );
  },
);

PassCode.displayName = 'PassCode';
