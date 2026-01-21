'use client';

import React, { useContext, useRef } from 'react';

import { ButtonRef } from '../../../../components/button/button.types.js';
import { MultiSelectListBox } from '../../components/multi-select-list-box/multi-select-list-box.component.js';
import { MultiSelectContext } from '../../multi-select.component.js';
import { MultiSelectPopover } from '../multi-select-popover/multi-select-popover.component.js';
import { MultiSelectSearchbar } from '../multi-select-searchbar/multi-select-searchbar.component.js';

import { styles as dropdownStyles } from './multi-select-dropdown.styles.js';
import { MultiSelectDropdownProps } from './multi-select-dropdown.types.js';

export function MultiSelectDropdown<T extends object = object>({
  setFilterText,
  ...props
}: MultiSelectDropdownProps<T>) {
  const { filterText, listBoxRef } = useContext(MultiSelectContext);
  const closeBtnRef = useRef<ButtonRef>(null);
  const styles = dropdownStyles({});

  return (
    <MultiSelectPopover>
          <MultiSelectSearchbar
            filterText={filterText}
            setFilterText={setFilterText}
            closeBtnRef={closeBtnRef}
          />
        <MultiSelectListBox {...props} aria-label="multiselect list" escapeKeyBehavior="none" listBoxRef={listBoxRef} />
    </MultiSelectPopover>
  );
}
