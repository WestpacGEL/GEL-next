'use client';

import React, { useCallback, useEffect, useId, useMemo, useRef } from 'react';
import { useButton, useOverlayTrigger } from 'react-aria';
import { useOverlayTriggerState } from 'react-stately';

import { useBreakpoint } from '../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';
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
  portalContainer,
  placement = 'bottom start',
  shouldFlip,
}: ButtonDropdownProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement & HTMLSpanElement & HTMLDivElement>(null);
  const panelId = useId();
  const breakpoint = useBreakpoint();
  const resolvedLook = resolveResponsiveVariant(look, breakpoint);
  const resolvedSoft = resolveResponsiveVariant(soft, breakpoint);
  const styles = buttonDropdownStyles({
    block: resolveResponsiveVariant(block, breakpoint),
    dropdownSize: resolveResponsiveVariant(dropdownSize, breakpoint),
  });
  const state = useOverlayTriggerState({ defaultOpen: open });
  const { triggerProps, overlayProps } = useOverlayTrigger({ type: 'menu' }, state, ref);
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
    if (resolvedLook === 'faint') {
      return 'muted';
    }
    return resolvedSoft ? 'muted-vivid' : 'mono';
  }, [resolvedLook, resolvedSoft]);

  // This is required so branding applies correctly by default due to portal location, can be overridden with portalContainer prop
  const brandContainer = useMemo(() => {
    if (typeof window !== 'undefined') {
      return (
        document.querySelector('[data-theme]') ||
        document.querySelector('[class^="theme-"], [class*=" theme-"]') ||
        document.body
      );
    }
  }, []);

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
          placement={placement}
          triggerRef={ref}
          state={state}
          block={block}
          id={panelId}
          portalContainer={portalContainer || brandContainer}
          {...overlayProps}
          shouldFlip={shouldFlip}
        >
          {children}
        </ButtonDropdownPanel>
      )}
    </>
  );
}
