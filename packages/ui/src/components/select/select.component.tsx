'use client';

import { ForwardedRef, forwardRef, useState } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';

import { Tooltip } from '../tooltip/index.js';

import { styles as selectStyles } from './select.styles.js';
import { type SelectProps } from './select.types.js';

function BaseSelect(
  { className, size = 'medium', invalid = false, width = 'auto', children, enableTooltip, ...props }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const { isFocused, isFocusVisible, focusProps } = useFocusRing();
  // const { pressProps } = usePress({
  //   onPress: () => {
  //     setIsOpen(true);
  //   },
  // });
  // const { onKeyDown, onKeyDownCapture, onKeyUp, onKeyUpCapture, ...restPressProps } = pressProps;
  const [selectedOption, setSelectedOption] = useState('');
  // const [isOpen, setIsOpen] = useState(false);
  const styles = selectStyles({ className, size, invalid, isFocused, isFocusVisible, width });

  return enableTooltip ? (
    <Tooltip tooltip={selectedOption} className={styles.tooltip()}>
      <select
        ref={ref}
        className={styles.base()}
        onChange={e => {
          setSelectedOption(e.target.options[e.target.selectedIndex].text);
          // setIsOpen(false);
        }}
        {...mergeProps(props, focusProps)}
      >
        {children}
      </select>
    </Tooltip>
  ) : (
    <select ref={ref} className={styles.base()} {...mergeProps(props, focusProps)}>
      {children}
    </select>
  );
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(BaseSelect);
