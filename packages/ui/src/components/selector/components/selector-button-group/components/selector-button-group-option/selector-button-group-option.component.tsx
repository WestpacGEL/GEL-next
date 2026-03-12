import React, { MouseEventHandler, Ref, forwardRef, useCallback, useContext } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';

import { FlexiCell } from '../../../../../../index.js';
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
  ref: Ref<HTMLElement>,
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
    [id, onClick, state],
  );
  return (
    <FlexiCell
      {...mergeProps(props, focusProps)}
      after={
        <div className="flex gap-2">
          {after}
          <ArrowRightIcon color="primary" aria-hidden="true" className={styles.icon({})} />
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
>;
SelectorButtonGroupOption.displayName = 'SelectorButton';
