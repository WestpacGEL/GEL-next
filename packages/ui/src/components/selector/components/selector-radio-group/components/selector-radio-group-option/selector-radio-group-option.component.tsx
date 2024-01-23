'use client';

import React, { forwardRef, useContext, useRef } from 'react';
import { VisuallyHidden, mergeProps, useFocusRing, useRadio } from 'react-aria';

import { ArrowRightIcon, TickIcon } from '../../../../../../components/icon/index.js';
import { FlexiCell } from '../../../../../index.js';
import { SelectorRadioGroupContext } from '../../selector-radio-group.component.js';

import { styles as selectorRadioGroupOptionStyles } from './selector-radio-group-option.styles.js';
import { type SelectorRadioGroupOptionProps } from './selector-radio-group-option.types.js';

function BaseSelectorRadioGroupOption(
  {
    className,
    children,
    value,
    withBorder = true,
    withArrow,
    after,
    before,
    checkIcon = 'checkbox',
    ...props
  }: SelectorRadioGroupOptionProps,
  ref: any,
) {
  const state = useContext(SelectorRadioGroupContext);
  const localRef = useRef(null);
  const { inputProps, isSelected, isDisabled } = useRadio({ ...props, value, children }, state, localRef);
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = selectorRadioGroupOptionStyles({ className, isSelected, isFocusVisible, isDisabled, checkIcon });

  const FinalIcon = checkIcon === 'checkbox' ? TickIcon : ArrowRightIcon;

  return (
    <FlexiCell
      after={
        <div className="flex gap-2">
          {after}
          <FinalIcon aria-hidden="true" className={styles.icon({})} />
        </div>
      }
      before={before}
      withBorder={withBorder}
      withArrow={withArrow}
      tag="label"
      ref={ref}
      className={styles.base({})}
    >
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={localRef} />
      </VisuallyHidden>
      {children}
    </FlexiCell>
  );
}

export const SelectorRadioGroupOption = forwardRef(BaseSelectorRadioGroupOption) as React.ForwardRefExoticComponent<
  SelectorRadioGroupOptionProps & React.RefAttributes<unknown>
>;
SelectorRadioGroupOption.displayName = 'SelectorRadio';
