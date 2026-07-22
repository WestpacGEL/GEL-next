'use client';

import { Column, Table, flexRender } from '@tanstack/react-table';
import { useCallback, useMemo, useRef } from 'react';
import { Key, useButton, useMenuTrigger } from 'react-aria';
import { Item, Section, useMenuTriggerState } from 'react-stately';

import { Button } from '../../../button/index.js';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ClearIcon,
  MoreVertIcon,
  PinIcon,
  SearchIcon,
  UnpinIcon,
} from '../../../icon/index.js';
import { Input } from '../../../input/input.component.js';
import { InputGroup } from '../../../input-group/input-group.component.js';
import { VisuallyHidden } from '../../../visually-hidden/index.js';
import { ColumnReorderInfo, useAdvancedTableContext } from '../../advanced-table.context.js';
import { canGroupColumn, canPinColumn, moveColumnLeft, moveColumnRight } from '../../utils/index.js';

import { styles as advancedTableColumnMenuStyles } from './advanced-table-column-menu.styles.js';
import { AdvancedTableColumnMenuProps } from './advanced-table-column-menu.types.js';
import { MenuItemContent } from './components/menu-item-content/menu-item-content.component.js';
import { MenuList } from './components/menu-list/menu-list.component.js';
import { MenuPopover } from './components/menu-popover/menu-popover.component.js';

/** The "Filter by:" section's contents. */
function ColumnMenuFilterItem<T>({ column }: { column: Column<T, unknown> }) {
  const filterVal = column.getFilterValue() as string | undefined;
  const clearFilter = useCallback(() => column.setFilterValue(''), [column]);

  return (
    <InputGroup
      after={{
        element: filterVal ? (
          <Button onClick={clearFilter} look="link" iconAfter={ClearIcon} iconColor="muted" />
        ) : null,
        inset: true,
      }}
      before={{ icon: SearchIcon }}
      hideLabel
      label="Filter"
    >
      <Input onChange={val => column.setFilterValue(val.currentTarget.value)} value={filterVal ?? ''} />
    </InputGroup>
  );
}

/** Early check if `canReorder` before checking boundaries, returns menu items. */
function resolveMoveBoundaries(canReorder: boolean, columnId: string, reorderInfo: ColumnReorderInfo) {
  const none = { canMoveLeft: false, canMoveRight: false };
  return canReorder ? (reorderInfo.moveBoundaries.get(columnId) ?? none) : none;
}

/** The pin-left/pin-right menu item's icon and label, toggling to "unpin" once already pinned that way. */
function resolvePinMenuItem<T>(column: Column<T, unknown>, direction: 'left' | 'right') {
  const isPinned = column.getIsPinned() === direction;

  if (isPinned) {
    return {
      icon: UnpinIcon,
      label: `Unpin ${direction}`,
    };
  }

  return {
    icon: PinIcon,
    label: `Pin ${direction}`,
  };
}

/** The move-left/move-right menu item's icon and label. */
function resolveMoveMenuItem(direction: 'left' | 'right') {
  if (direction === 'left') {
    return {
      icon: ArrowLeftIcon,
      label: 'Move left',
    };
  }

  return {
    icon: ArrowRightIcon,
    label: 'Move right',
  };
}

/** Handles pins or unpins the column and sets announcement. */
function handlePinAction<T>(
  column: Column<T, unknown>,
  direction: 'left' | 'right',
  columnName: string,
  onPinAnnouncement?: (text: string) => void,
) {
  if (column.getIsPinned() === direction) {
    column.pin(false);
    onPinAnnouncement?.(`${columnName} unpinned.`);
  } else {
    column.pin(direction);
    onPinAnnouncement?.(`${columnName} pinned ${direction}.`);
  }
}

/** Moves the column reorder position to left or right and sets announcement. */
function handleMoveAction<T>(
  table: Table<T>,
  columnId: string,
  direction: 'left' | 'right',
  columnName: string,
  onReorderAnnouncement?: (text: string) => void,
) {
  const nextOrder = direction === 'left' ? moveColumnLeft(table, columnId) : moveColumnRight(table, columnId);
  if (nextOrder) {
    table.setColumnOrder(nextOrder);
    onReorderAnnouncement?.(`${columnName} moved ${direction}.`);
  }
}

/**
 * Column menu trigger and popover. Filtering, pinning, grouping and re-ordering share this
 * `MenuList` as separate `Section`s in that order.
 */
export function AdvancedTableColumnMenu<T>({ header }: AdvancedTableColumnMenuProps<T>) {
  const { enableColumnReordering, loading, onPinAnnouncement, onReorderAnnouncement, reorderInfo, table, tableId } =
    useAdvancedTableContext<T>();
  const state = useMenuTriggerState({});

  const buttonRef = useRef(null);
  const { menuTriggerProps, menuProps } = useMenuTrigger<object>({}, state, buttonRef);

  const { buttonProps } = useButton(
    {
      ...menuTriggerProps,
      isDisabled: loading,
    },
    buttonRef,
  );
  const styles = advancedTableColumnMenuStyles();

  const labelId = `${tableId}-${header.id}-label`;
  const menuActionId = `${tableId}-${header.id}-menu-action`;

  // Check permissions and actions enabled
  const canFilter = header.column.getCanFilter();
  const canPin = canPinColumn(header.column);
  const canGroup = canGroupColumn(header.column);
  const isGrouped = header.column.getIsGrouped();
  const canReorder = Boolean(enableColumnReordering) && reorderInfo.idSet.has(header.column.id);
  const { canMoveLeft, canMoveRight } = resolveMoveBoundaries(canReorder, header.column.id, reorderInfo);
  const disabledMenuKeys = [...(canMoveLeft ? [] : ['move-left']), ...(canMoveRight ? [] : ['move-right'])];

  const pinLeftItem = resolvePinMenuItem(header.column, 'left');
  const pinRightItem = resolvePinMenuItem(header.column, 'right');
  const moveLeftItem = resolveMoveMenuItem('left');
  const moveRightItem = resolveMoveMenuItem('right');

  const columnName = useMemo(() => {
    const title = flexRender(header.column.columnDef.header, header.getContext());
    return typeof title === 'string' ? title : header.column.id;
  }, [header]);

  const handleMenuAction = (key: Key) => {
    if (key === 'pin-left') return handlePinAction(header.column, 'left', columnName, onPinAnnouncement);
    if (key === 'pin-right') return handlePinAction(header.column, 'right', columnName, onPinAnnouncement);

    if (key === 'group') return table.setGrouping(isGrouped ? [] : [header.column.id]);

    if (key === 'move-left')
      return handleMoveAction(table, header.column.id, 'left', columnName, onReorderAnnouncement);
    if (key === 'move-right')
      return handleMoveAction(table, header.column.id, 'right', columnName, onReorderAnnouncement);
  };

  return (
    <>
      <Button
        {...buttonProps}
        aria-labelledby={`${labelId} ${menuActionId}`}
        className={styles.triggerButton()}
        iconBefore={() => <MoreVertIcon size="small" />}
        look="unstyled"
        ref={buttonRef}
        size="medium"
      />
      <VisuallyHidden aria-hidden id={menuActionId} tag="span">
        column menu
      </VisuallyHidden>
      {state.isOpen && (
        <MenuPopover placement="bottom start" state={state} triggerRef={buttonRef}>
          <MenuList
            {...menuProps}
            aria-labelledby={`${labelId} ${menuActionId}`}
            disabledKeys={disabledMenuKeys}
            onAction={handleMenuAction}
          >
            {canFilter ? (
              <Section key="filter-section" title="Filter by:">
                <Item key="filter" textValue="Filter">
                  <ColumnMenuFilterItem column={header.column} />
                </Item>
              </Section>
            ) : null}
            {canPin ? (
              <Section key="pin-section" title="Pin">
                <Item key="pin-left" textValue={pinLeftItem.label}>
                  <MenuItemContent {...pinLeftItem} />
                </Item>
                <Item key="pin-right" textValue={pinRightItem.label}>
                  <MenuItemContent {...pinRightItem} />
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
            {canReorder ? (
              <Section key="move-section" title="Move">
                <Item key="move-left" textValue={moveLeftItem.label}>
                  <MenuItemContent {...moveLeftItem} />
                </Item>
                <Item key="move-right" textValue={moveRightItem.label}>
                  <MenuItemContent {...moveRightItem} />
                </Item>
              </Section>
            ) : null}
          </MenuList>
        </MenuPopover>
      )}
    </>
  );
}
