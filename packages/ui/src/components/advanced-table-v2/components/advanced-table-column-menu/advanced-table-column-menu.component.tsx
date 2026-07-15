'use client';

import { useCallback, useRef } from 'react';
import { useButton, useMenuTrigger } from 'react-aria';
import { Item, Section, useMenuTriggerState } from 'react-stately';

import { Button } from '../../../button/index.js';
import { ClearIcon, MoreVertIcon, SearchIcon } from '../../../icon/index.js';
import { Input } from '../../../input/input.component.js';
import { InputGroup } from '../../../input-group/input-group.component.js';
import { VisuallyHidden } from '../../../visually-hidden/index.js';
import { useAdvancedTableContext } from '../../advanced-table.context.js';

import { styles as advancedTableColumnMenuStyles } from './advanced-table-column-menu.styles.js';
import { AdvancedTableColumnMenuProps } from './advanced-table-column-menu.types.js';
import { MenuList } from './components/menu-list/menu-list.component.js';
import { MenuPopover } from './components/menu-popover/menu-popover.component.js';

/**
 * Column menu trigger + popover. Only the filter action ships in this ticket;
 * pinning, grouping, and move actions (tickets 07/08/12) add further `Section`s
 * to the same `MenuList`, in that order, without restructuring this component.
 */
export function AdvancedTableColumnMenu<T>({ header }: AdvancedTableColumnMenuProps<T>) {
  const { tableId } = useAdvancedTableContext<T>();
  const state = useMenuTriggerState({});

  const btnRef = useRef(null);
  const { menuTriggerProps, menuProps } = useMenuTrigger<object>({}, state, btnRef);
  const { buttonProps } = useButton(menuTriggerProps, btnRef);
  const styles = advancedTableColumnMenuStyles();

  const labelId = `${tableId}-${header.id}-label`;
  const menuActionId = `${tableId}-${header.id}-menu-action`;

  const filterVal = header.column.getFilterValue() as string | undefined;
  const clearFilter = useCallback(() => header.column.setFilterValue(''), [header.column]);

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
          <MenuList {...menuProps} aria-labelledby={`${labelId} ${menuActionId}`}>
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
          </MenuList>
        </MenuPopover>
      )}
    </>
  );
}
