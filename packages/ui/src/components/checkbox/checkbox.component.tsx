import React, { ReactElement, cloneElement, createContext, useEffect, useRef, useState } from 'react';
import { useCheckboxGroup, useFocusRing } from 'react-aria';
import { useCheckboxGroupState } from 'react-stately';

import { Button } from '../button/index.js';
import { ExpandMoreIcon } from '../icon/index.js';

import { styles as checkboxStyles } from './checkbox.styles.js';
import { type CheckboxContextState, type CheckboxProps } from './checkbox.types.js';
import { CheckboxItem } from './components/checkbox-item/checkbox-item.component.js';

export const CheckboxContext = createContext<CheckboxContextState>({
  orientation: 'vertical',
  size: 'medium',
  value: [],
  isDisabled: false,
  isReadOnly: false,
  isSelected: () => false,
  setValue: () => null,
  addValue: () => null,
  removeValue: () => null,
  toggleValue: () => null,
  validationState: 'valid',
});

export function Checkbox({
  className,
  children,
  label,
  orientation = 'vertical',
  showAmount = 0,
  size = 'medium',
  ...props
}: CheckboxProps) {
  const state = useCheckboxGroupState({ ...props, label });
  const { groupProps, labelProps } = useCheckboxGroup({ ...props, label }, state);
  const { isFocusVisible, focusProps } = useFocusRing();
  const [hiddenOptions, setHiddenOptions] = useState<boolean>(showAmount > 0);
  const firstNewOptionRef = useRef<HTMLDivElement>(null);
  const revealAmount = children && children.length - showAmount;
  const styles = checkboxStyles({ orientation, isFocusVisible });
  const childrenToRender =
    children &&
    children.map((child, index) => {
      return cloneElement(child as ReactElement, {
        key: index,
        ref: index === showAmount ? firstNewOptionRef : null,
      });
    });

  useEffect(() => {
    if (!hiddenOptions) {
      firstNewOptionRef.current?.focus();
    }
  }, [hiddenOptions]);

  return (
    <div className={styles.base({ className })} {...groupProps}>
      <span {...labelProps}>{label}</span>
      <div className={styles.itemWrapper()}>
        <CheckboxContext.Provider value={{ ...state, orientation, size }}>
          {hiddenOptions ? childrenToRender?.slice(0, showAmount) : childrenToRender}
        </CheckboxContext.Provider>
        {hiddenOptions && (
          <Button
            onClick={() => setHiddenOptions(false)}
            className={styles.revealButton()}
            color="link"
            {...focusProps}
          >
            <p className={styles.buttonText()}>{`Show ${revealAmount} more ${
              revealAmount === 1 ? 'item' : 'items'
            }`}</p>
            <ExpandMoreIcon size="small" color="link" />
          </Button>
        )}
      </div>
    </div>
  );
}
Checkbox.CheckboxItem = CheckboxItem;
