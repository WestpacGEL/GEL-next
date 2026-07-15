'use client';

import { flexRender } from '@tanstack/react-table';
import { useCallback, useRef } from 'react';
import { Key, useButton, useMenuTrigger } from 'react-aria';
import { Item, Section, useMenuTriggerState } from 'react-stately';

import { Button } from '../../../button/index.js';
import { ClearIcon, MoreVertIcon, SearchIcon } from '../../../icon/index.js';
import { Input } from '../../../input/input.component.js';
import { InputGroup } from '../../../input-group/input-group.component.js';
import { VisuallyHidden } from '../../../visually-hidden/index.js';
import { useAdvancedTableContext } from '../../advanced-table.context.js';
import { RESERVED_COLUMN_IDS } from '../../utils/index.js';

import { styles as advancedTableColumnMenuStyles } from './advanced-table-column-menu.styles.js';
import { AdvancedTableColumnMenuProps } from './advanced-table-column-menu.types.js';
import { MenuList } from './components/menu-list/menu-list.component.js';
import { MenuPopover } from './components/menu-popover/menu-popover.component.js';
import { PinItemContent } from './components/pin-item-content/pin-item-content.component.js';

/**
 * Column menu trigger + popover. Filtering and pinning ship in this ticket;
 * grouping and move actions (tickets 08/12) add further `Section`s to the same
 * `MenuList`, in that order, without restructuring this component.
 */
export function AdvancedTableColumnMenu<T>({ header }: AdvancedTableColumnMenuProps<T>) {
  const { tableId, onPinAnnouncement } = useAdvancedTableContext<T>();
  const state = useMenuTriggerState({});

  const btnRef = useRef(null);
  const { menuTriggerProps, menuProps } = useMenuTrigger<object>({}, state, btnRef);
  const { buttonProps } = useButton(menuTriggerProps, btnRef);
  const styles = advancedTableColumnMenuStyles();

  const labelId = `${tableId}-${header.id}-label`;
  const menuActionId = `${tableId}-${header.id}-menu-action`;

  const filterVal = header.column.getFilterValue() as string | undefined;
  const clearFilter = useCallback(() => header.column.setFilterValue(''), [header.column]);

  const canPin = header.column.getCanPin() && !RESERVED_COLUMN_IDS.includes(header.column.id);

  const handleAction = (key: Key) => {
    if (key !== 'pin-left' && key !== 'pin-right') return;
    const direction = key === 'pin-left' ? 'left' : 'right';
    const title = flexRender(header.column.columnDef.header, header.getContext());
    const name = typeof title === 'string' ? title : header.column.id;
    if (header.column.getIsPinned() === direction) {
      header.column.pin(false);
      onPinAnnouncement?.(`${name} unpinned.`);
    } else {
      header.column.pin(direction);
      onPinAnnouncement?.(`${name} pinned ${direction}.`);
    }
  };

  return (
    <>
      <Button
        {...buttonProps}
        look="unstyled"
        size="small"
        iconBefore={() => <MoreVertIcon size="small" />}
        className={styles.triggerButton()}
        aria-labelledby={`${labelId} ${menuActionId}`}
        ref={btnRef}
      />
      {/* TODO: this column menu is announced twice*/}
      <VisuallyHidden id={menuActionId} tag="span">
        column menu
      </VisuallyHidden>
      {state.isOpen && (
        <MenuPopover state={state} triggerRef={btnRef} placement="bottom start">
          <MenuList {...menuProps} onAction={handleAction} aria-labelledby={`${labelId} ${menuActionId}`}>
            <Section key="filter-section" title="Filter by:">
              <Item key="filter" textValue="Filter">
                <InputGroup
                  hideLabel
                  label="Filter"
                  before={{ icon: SearchIcon }}
                  after={{
                    inset: true,
                    element: filterVal ? (
                      <Button onClick={clearFilter} look="link" iconAfter={ClearIcon} iconColor="muted" />
                    ) : null,
                  }}
                >
                  <Input
                    value={filterVal ?? ''}
                    onChange={val => header.column.setFilterValue(val.currentTarget.value)}
                  />
                </InputGroup>
              </Item>
            </Section>
            {canPin ? (
              <Section key="pin-section" title="Pin">
                <Item key="pin-left" textValue={header.column.getIsPinned() === 'left' ? 'Unpin left' : 'Pin left'}>
                  <PinItemContent isPinned={header.column.getIsPinned() === 'left'} direction="left" />
                </Item>
                <Item key="pin-right" textValue={header.column.getIsPinned() === 'right' ? 'Unpin right' : 'Pin right'}>
                  <PinItemContent isPinned={header.column.getIsPinned() === 'right'} direction="right" />
                </Item>
              </Section>
            ) : null}
          </MenuList>
        </MenuPopover>
      )}
    </>
  );
}
