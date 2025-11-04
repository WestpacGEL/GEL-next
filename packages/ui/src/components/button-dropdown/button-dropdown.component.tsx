'use client';

import React, { useCallback, useEffect, useId, useRef } from 'react';
import { useButton, useOverlayTrigger } from 'react-aria';
import { useOverlayTriggerState } from 'react-stately';

import { Button } from '../button/index.js';
import { DropDownIcon, IconProps } from '../icon/index.js';

import { styles as buttonDropdownStyles } from './button-dropdown.styles.js';
import { type ButtonDropdownProps } from './button-dropdown.types.js';
import { ButtonDropdownPanel } from './components/button-dropdown-panel/button-dropdown-panel.component.js';

export function ButtonDropdown({
  className,
  dropdownSize = 'medium',
  iconBefore: IconBefore,
  open = false,
  text,
  children,
  size,
  look = 'hero',
  soft = false,
  block = false,
  dropDownIcon: Icon = DropDownIcon,
  shouldFlip,
}: ButtonDropdownProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement & HTMLSpanElement & HTMLDivElement>(null);
  const panelId = useId();
  const styles = buttonDropdownStyles({ block, dropdownSize });
  const state = useOverlayTriggerState({ defaultOpen: open });
  const { triggerProps } = useOverlayTrigger({ type: 'menu' }, state, ref);
  const { buttonProps } = useButton(triggerProps, ref);

  // React Aria does not check for escape key press unless panel is focused so this is needed
  const keyHandler = useCallback(
    (event: globalThis.KeyboardEvent) => {
      if (state.isOpen && event.key === 'Escape') state.close();
    },
    [state],
  );

  useEffect(() => {
    window.document.addEventListener('keydown', keyHandler);
    return () => {
      window.document.removeEventListener('keydown', keyHandler);
    };
  }, [keyHandler]);

  return (
    <>
      <Button
        ref={ref}
        iconAfter={
          !(look === 'link' || look === 'unstyled') ? (props: IconProps) => <Icon aria-hidden {...props} /> : undefined
        }
        iconBefore={IconBefore}
        size={size}
        look={look}
        soft={soft}
        block={block}
        aria-expanded={state.isOpen}
        aria-controls={panelId}
        className={styles.base()}
        {...buttonProps}
      >
        {text}
      </Button>
      {state.isOpen && (
        <ButtonDropdownPanel
          className={styles.panel({ className })}
          placement="bottom start"
          triggerRef={ref}
          state={state}
          block={block}
          id={panelId}
          shouldFlip={shouldFlip}
        >
          {children}
        </ButtonDropdownPanel>
      )}
    </>
  );
}
