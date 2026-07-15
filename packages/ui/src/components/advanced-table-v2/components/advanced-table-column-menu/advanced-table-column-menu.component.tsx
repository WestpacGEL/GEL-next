'use client';

import { Column, flexRender } from '@tanstack/react-table';
import { useCallback, useMemo, useRef } from 'react';
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

/** The "Filter by:" section's contents — split out to keep the parent's cognitive complexity down. */
function ColumnMenuFilterItem<T>({ column }: { column: Column<T, unknown> }) {
  const filterVal = column.getFilterValue() as string | undefined;
  const clearFilter = useCallback(() => column.setFilterValue(''), [column]);

  return (
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
      <Input value={filterVal ?? ''} onChange={val => column.setFilterValue(val.currentTarget.value)} />
    </InputGroup>
  );
}

/**
 * Column menu trigger + popover. Filtering, pinning, and grouping share this
 * `MenuList` as separate `Section`s in that order; move actions (ticket 12)
 * add a further `Section` without restructuring this component.
 */
export function AdvancedTableColumnMenu<T>({ header }: AdvancedTableColumnMenuProps<T>) {
  const { tableId, table, onPinAnnouncement } = useAdvancedTableContext<T>();
  const state = useMenuTriggerState({});

  const btnRef = useRef(null);
  const { menuTriggerProps, menuProps } = useMenuTrigger<object>({}, state, btnRef);
  const { buttonProps } = useButton(menuTriggerProps, btnRef);
  const styles = advancedTableColumnMenuStyles();

  const labelId = `${tableId}-${header.id}-label`;
  const menuActionId = `${tableId}-${header.id}-menu-action`;

  const canFilter = header.column.getCanFilter();
  // `getCanPin()` checks a group/banding column's LEAF children, never the
  // group column's own `enablePinning: false` — `accessorFn` is only present
  // on real (leaf) data columns, so it's what actually excludes banding headers.
  const canPin =
    header.column.getCanPin() && Boolean(header.column.accessorFn) && !RESERVED_COLUMN_IDS.includes(header.column.id);
  const canGroup = header.column.getCanGroup() && !RESERVED_COLUMN_IDS.includes(header.column.id);
  const isGrouped = header.column.getIsGrouped();

  const columnName = useMemo(() => {
    const title = flexRender(header.column.columnDef.header, header.getContext());
    return typeof title === 'string' ? title : header.column.id;
  }, [header]);

  const handleAction = (key: Key) => {
    if (key === 'pin-left' || key === 'pin-right') {
      const direction = key === 'pin-left' ? 'left' : 'right';
      if (header.column.getIsPinned() === direction) {
        header.column.pin(false);
        onPinAnnouncement?.(`${columnName} unpinned.`);
      } else {
        header.column.pin(direction);
        onPinAnnouncement?.(`${columnName} pinned ${direction}.`);
      }
      return;
    }
    if (key === 'group') {
      table.setGrouping(isGrouped ? [] : [header.column.id]);
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
            {canFilter ? (
              <Section key="filter-section" title="Filter by:">
                <Item key="filter" textValue="Filter">
                  <ColumnMenuFilterItem column={header.column} />
                </Item>
              </Section>
            ) : null}
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
            {canGroup ? (
              <Section key="group-section" title="Group">
                <Item key="group" textValue={isGrouped ? 'Ungroup' : `Group by ${columnName}`}>
                  {isGrouped ? 'Ungroup' : `Group by ${columnName}`}
                </Item>
              </Section>
            ) : null}
          </MenuList>
        </MenuPopover>
      )}
    </>
  );
}
