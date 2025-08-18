'use client';

import React, { useCallback, useEffect, useId, useMemo, useRef } from 'react';
import { useButton, useOverlayTrigger } from 'react-aria';
import { useOverlayTriggerState } from 'react-stately';

import { Button } from '../button/index.js';
import { DropDownIcon, IconProps } from '../icon/index.js';

import { styles as buttonDropdownStyles } from './button-dropdown.styles.js';
import { type ButtonDropdownProps } from './button-dropdown.types.js';
import { ButtonDropdownPanel } from './components/button-dropdown-panel/button-dropdown-panel.component.js';

export function ButtonDropdown({
  className,
  portalClassName,
  dropdownSize = 'medium',
  iconBefore: IconBefore,
  open = false,
  text,
  children,
  size,
  look = 'hero',
  soft = false,
  block = false,
  portal = false,
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

  const iconColor = useMemo(() => {
    if (look === 'faint') {
      return 'muted';
    }
    return soft ? 'muted-vivid' : 'mono';
  }, [look, soft]);

  return (
    <>
      <Button
        ref={ref}
        iconAfter={(props: IconProps) => <DropDownIcon {...props} color={iconColor} aria-hidden />}
        iconBefore={IconBefore}
        size={size}
        look={look}
        soft={soft}
        block={block}
        aria-expanded={state.isOpen}
        aria-controls={panelId}
        className={styles.base({ className })}
        {...buttonProps}
      >
        {text}
      </Button>
      {state.isOpen && (
        <ButtonDropdownPanel
          className={styles.panel({ className: portalClassName })}
          placement="bottom start"
          triggerRef={ref}
          state={state}
          block={block}
          id={panelId}
          portal={portal}
        >
          {children}
        </ButtonDropdownPanel>
      )}
    </>
  );
}
