import React, { forwardRef, useContext, useRef } from 'react';
import { VisuallyHidden, mergeProps, useCheckboxGroupItem, useFocusRing } from 'react-aria';

import {
  FlexiCellAdornment,
  FlexiCellBody,
  FlexiCellButton,
  FlexiCellCircle,
  FlexiCellFooter,
  FlexiCellHint,
  FlexiCellLabel,
} from '../../../../../../components/flexi-cell/index.js';
import { ArrowRightIcon, TickIcon } from '../../../../../../components/icon/index.js';
import { FlexiCell } from '../../../../../../components/index.js';
import { SelectorCheckboxGroupContext } from '../../selector-checkbox-group.component.js';

import { styles as selectorCheckboxGroupOptionStyles } from './selector-checkbox-group-option.styles.js';
import { type SelectorCheckboxGroupOptionProps } from './selector-checkbox-group-option.types.js';

function BaseSelectorCheckboxGroupOption(
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
  }: SelectorCheckboxGroupOptionProps,
  ref: any,
) {
  const state = useContext(SelectorCheckboxGroupContext);
  const localRef = useRef(null);
  const { inputProps, isDisabled, isSelected } = useCheckboxGroupItem({ ...props, value, children }, state, localRef);
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = selectorCheckboxGroupOptionStyles({
    className,
    isSelected,
    isFocusVisible,
    isDisabled,
    checkIcon,
  });

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

export const SelectorCheckboxGroupOption = forwardRef(
  BaseSelectorCheckboxGroupOption,
) as React.ForwardRefExoticComponent<SelectorCheckboxGroupOptionProps & React.RefAttributes<unknown>> & {
  Adornment: typeof FlexiCell.Adornment;
  Body: typeof FlexiCell.Body;
  Button: typeof FlexiCell.Button;
  Circle: typeof FlexiCell.Circle;
  Footer: typeof FlexiCell.Footer;
  Hint: typeof FlexiCell.Hint;
  Label: typeof FlexiCell.Label;
};

SelectorCheckboxGroupOption.Body = FlexiCellBody;
SelectorCheckboxGroupOption.Footer = FlexiCellFooter;
SelectorCheckboxGroupOption.Adornment = FlexiCellAdornment;
SelectorCheckboxGroupOption.Hint = FlexiCellHint;
SelectorCheckboxGroupOption.Label = FlexiCellLabel;
SelectorCheckboxGroupOption.Button = FlexiCellButton;
SelectorCheckboxGroupOption.Circle = FlexiCellCircle;
