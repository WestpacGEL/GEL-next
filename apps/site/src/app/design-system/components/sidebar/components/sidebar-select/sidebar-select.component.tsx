import { ExpandLessIcon, ExpandMoreIcon } from '@westpac/ui/icon';
import { useRef } from 'react';
import { HiddenSelect, mergeProps, useButton, useFocusRing, useSelect } from 'react-aria';
import { Item, useSelectState } from 'react-stately';

import { ListBox } from './components/list-box';
import { Popover } from './components/popover';
import { styles as sidebarSelectStyles } from './sidebar-select.styles';
import { type SidebarSelectProps } from './sidebar-select.types';

export function SidebarSelect(props: SidebarSelectProps) {
  // Create state based on the incoming props
  const state = useSelectState(props);
  const portalContainreRef = useRef<HTMLDivElement>(null);

  // Get props for child elements from useSelect
  const ref = useRef(null);

  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(props, state, ref);
  // Get props for the button based on the trigger props from useSelect

  const { buttonProps } = useButton(triggerProps, ref);

  const { focusProps, isFocusVisible } = useFocusRing();
  const styles = sidebarSelectStyles({ isFocusVisible });
  return (
    <div className={styles.base()}>
      {props.label && (
        <div {...labelProps} className={styles.label()}>
          {props.label}
        </div>
      )}

      <HiddenSelect state={state} triggerRef={ref} label={props.label} name={props.name} />

      <button
        {...mergeProps(buttonProps, focusProps)}
        onClick={undefined}
        onPointerUp={undefined}
        onPointerDown={() => {
          state.toggle();
        }}
        ref={ref}
        className={styles.button()}
      >
        <div className={styles.textWrapper()}>
          <div className="typography-body-11 w-full text-left leading-normal" {...valueProps}>
            Change brand
          </div>
        </div>
        <div aria-hidden="true" className={styles.iconWrapper()}>
          {state.isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
      </button>
      <div ref={portalContainreRef} />
      <Popover
        state={state}
        triggerRef={ref}
        isNonModal
        portalContainer={portalContainreRef.current ?? undefined}
        placement="bottom start"
        className={styles.popover()}
      >
        <ListBox {...menuProps} state={state} />
      </Popover>
    </div>
  );
}
SidebarSelect.Option = Item;
