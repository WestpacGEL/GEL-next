import { ExpandLessIcon, ExpandMoreIcon } from '@westpac/ui/icon';
import React, { useRef } from 'react';
import { HiddenSelect, mergeProps, useButton, useFocusRing, useSelect } from 'react-aria';
import { Item, useSelectState } from 'react-stately';

import { ListBox } from './components/list-box';
import { Popover } from './components/popover';
import { styles as sidebarSelectStyles } from './sidebar-select.styles';
import { type SidebarSelectProps } from './sidebar-select.types';

export function SidebarSelect(props: SidebarSelectProps) {
  // Create state based on the incoming props
  const state = useSelectState(props);

  // Get props for child elements from useSelect
  const ref = useRef(null);

  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(props, state, ref);
  // Get props for the button based on the trigger props from useSelect

  const { buttonProps } = useButton(triggerProps, ref);

  const { focusProps, isFocusVisible } = useFocusRing();
  const styles = sidebarSelectStyles({ isFocusVisible, isOpen: state.isOpen });
  return (
    <div className={styles.base()}>
      <div {...labelProps} className={styles.label()}>
        {props.label}
      </div>

      <HiddenSelect state={state} triggerRef={ref} label={props.label} name={props.name} />

      <button {...mergeProps(buttonProps, focusProps)} ref={ref} className={styles.button()}>
        <div className={styles.textWrapper()}>
          <div className="w-full" {...valueProps}>
            {state.selectedItem ? state.selectedItem.rendered : 'Select an option'}
          </div>
        </div>
        <div aria-hidden="true" className={styles.iconWrapper()}>
          {state.isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
        {/* <SelectorIcon className={`h-5 w-5 ${isFocusVisible ? 'text-pink-500' : 'text-gray-500'}`} /> */}
      </button>

      {state.isOpen && (
        <Popover state={state} triggerRef={ref} placement="bottom start" className={styles.popover()}>
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </div>
  );
}
SidebarSelect.Option = Item;
