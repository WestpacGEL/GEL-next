import React, { MouseEventHandler, forwardRef, useCallback, useContext } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';

import { FlexiCell } from '../../../../../../index.js';
import {
  FlexiCellAdornment,
  FlexiCellBody,
  FlexiCellButton,
  FlexiCellCircle,
  FlexiCellFooter,
  FlexiCellHint,
  FlexiCellLabel,
} from '../../../../../flexi-cell/index.js';
import { ArrowRightIcon } from '../../../../../icon/index.js';
import { SelectorButtonContext } from '../../selector-button-group.component.js';

import { styles as SelectorButtonGroupOptionStyles } from './selector-button-group-option.styles.js';
import { type SelectorButtonGroupOptionProps } from './selector-button-group-option.types.js';

function BaseSelectorButtonGroupOption(
  {
    className,
    children,
    withBorder = true,
    withArrow,
    after,
    before,
    isDisabled = false,
    onClick = () => undefined,
    id,
    ...props
  }: SelectorButtonGroupOptionProps,
  ref: any,
) {
  const state = useContext(SelectorButtonContext);
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = SelectorButtonGroupOptionStyles({
    className,
    isFocusVisible,
    isDisabled: state.isDisabled ? state.isDisabled : isDisabled,
    isSelected: state.value === id,
  });
  const handleClick: MouseEventHandler<Element> = useCallback(
    event => {
      onClick(event);
      state.onClick(id);
    },
    [onClick, state.onClick],
  );
  return (
    <FlexiCell
      {...mergeProps(props, focusProps)}
      after={
        <div className="flex gap-2">
          {after}
          <ArrowRightIcon aria-hidden="true" className={styles.icon({})} />
        </div>
      }
      before={before}
      withBorder={withBorder}
      withArrow={withArrow}
      tag="button"
      ref={ref}
      className={styles.base({})}
      disabled={isDisabled}
      id={id}
      onClick={event => handleClick(event as React.MouseEvent)}
      aria-pressed={state.value === id}
      aria-disabled={state.isDisabled ? state.isDisabled : isDisabled}
    >
      {children}
    </FlexiCell>
  );
}

export const SelectorButtonGroupOption = forwardRef(BaseSelectorButtonGroupOption) as React.ForwardRefExoticComponent<
  SelectorButtonGroupOptionProps & React.RefAttributes<unknown>
> & {
  Adornment: typeof FlexiCell.Adornment;
  Body: typeof FlexiCell.Body;
  Button: typeof FlexiCell.Button;
  Circle: typeof FlexiCell.Circle;
  Footer: typeof FlexiCell.Footer;
  Hint: typeof FlexiCell.Hint;
  Label: typeof FlexiCell.Label;
};

SelectorButtonGroupOption.Body = FlexiCellBody;
SelectorButtonGroupOption.Footer = FlexiCellFooter;
SelectorButtonGroupOption.Adornment = FlexiCellAdornment;
SelectorButtonGroupOption.Hint = FlexiCellHint;
SelectorButtonGroupOption.Label = FlexiCellLabel;
SelectorButtonGroupOption.Button = FlexiCellButton;
SelectorButtonGroupOption.Circle = FlexiCellCircle;
