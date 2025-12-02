import React, {
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
  KeyboardEvent,
  Children,
  ReactElement,
  memo,
} from 'react';
import { Key, mergeProps, useButton, useFilter, useFocusRing, useOverlayTrigger } from 'react-aria';
import { ItemProps, Item, SectionProps, useListState, useOverlayTriggerState } from 'react-stately';

import { ClearIcon, DropDownIcon, SearchIcon } from '../../components/icon/index.js';
import { useBreakpoint } from '../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';
import { Button } from '../button/button.component.js';
import { Input } from '../input/input.component.js';
import { InputGroup } from '../input-group/input-group.component.js';
import { Tooltip } from '../tooltip/tooltip.component.js';

import { ListBox } from './components/list-box/list-box.component.js';
import { Popover } from './components/popover/popover.component.js';
import { styles as multiSelectStyles } from './multi-select.styles.js';

import type { MultiSelectProps, MultiSelectValue } from './multi-select.types.js';

export { Section } from 'react-stately';

export function BaseMultiSelect<T extends MultiSelectValue = MultiSelectValue>({
  size = 'medium',
  listBoxProps,
  selectionMode = 'multiple',
  selectedKeys,
  onSelectionChange,
  ...props
}: MultiSelectProps<T>) {
  const isItemElement = useCallback((el: ReactElement<any>): el is ReactElement<ItemProps<T>> => {
    return !!el.props && 'textValue' in el.props;
  }, []);

  const isSectionElement = useCallback((el: ReactElement<any>): el is ReactElement<SectionProps<T>> => {
    return !!el.props && 'children' in el.props && !('textValue' in el.props);
  }, []);

  const breakpoint = useBreakpoint();
  // local filter string for the search input
  const [filterText, setFilterText] = useState('');
  const filter = useFilter({ sensitivity: 'base' });

  const filteredChildren = useMemo(() => {
    const newChildren: ReactElement[] = [];

    Children.forEach(props.children, child => {
      if (!React.isValidElement(child)) return;

      if (isItemElement(child)) {
        if (filter.contains(child.props.textValue ?? '', filterText)) {
          newChildren.push(child);
        }
        return;
      }

      if (isSectionElement(child)) {
        const subItems: ReactElement[] = [];

        Children.forEach(child.props.children, sub => {
          if (React.isValidElement(sub) && isItemElement(sub)) {
            if (filter.contains(sub.props.textValue ?? '', filterText)) {
              subItems.push(sub);
            }
          }
        });

        if (subItems.length > 0) {
          newChildren.push(
            React.cloneElement(child, {
              children: subItems,
            }),
          );
        }
      }
    });

    return newChildren;
  }, [props.children, isItemElement, isSectionElement, filter, filterText]);

  const listState = useListState<T>({
    ...props,
    children: filteredChildren,
    selectedKeys,
    selectionMode,
    onSelectionChange,
    // In theory this should work but there is a bug when there is a section
    // https://github.com/adobe/react-spectrum/issues/4930
    // filter: nodes => {
    //   if (!filterText) return nodes;
    //   return [...nodes].filter(node => {
    //     return filter.contains(node.textValue ?? '', filterText);
    //   });
    // },
  });

  // refs
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listBoxRef = useRef<HTMLUListElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const overlayState = useOverlayTriggerState({
    onOpenChange: isOpen => {
      if (isOpen) {
        requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
      }
    },
  });

  // overlay trigger (useOverlayTrigger gives the props to open/close overlays)
  const { triggerProps } = useOverlayTrigger({ type: 'listbox' }, overlayState, buttonRef);
  const { buttonProps } = useButton(triggerProps, buttonRef);
  const { focusProps, isFocusVisible } = useFocusRing();
  const finalButtonProps = mergeProps(props, focusProps, buttonProps);

  // React Aria does not check for escape key press unless panel is focused so this is needed
  const keyHandler = useCallback(
    (event: globalThis.KeyboardEvent) => {
      event.stopPropagation();
      if (overlayState.isOpen && event.key === 'Escape') overlayState.close();
    },
    [overlayState],
  );

  useEffect(() => {
    window.document.addEventListener('keydown', keyHandler);
    return () => {
      window.document.removeEventListener('keydown', keyHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styles = multiSelectStyles({
    size: resolveResponsiveVariant(size, breakpoint),
    isFocusVisible,
  });

  // Helper: get an array of selected nodes (for rendering tags)
  const selectedNodes = useMemo(() => {
    if (!selectedKeys || typeof selectedKeys === 'string') {
      return [];
    }
    const items: { key: Key | null; textValue?: string }[] = [];

    Children.forEach(props.children, child => {
      if (!React.isValidElement(child)) return;

      if (isItemElement(child)) {
        items.push({ ...child.props, key: child.key });
        return;
      }

      if (isSectionElement(child)) {
        Children.forEach(child.props.children, sub => {
          if (React.isValidElement(sub) && isItemElement(sub)) {
            items.push({ ...sub.props, key: sub.key });
          }
        });
      }
    });

    return [...selectedKeys].map(key => items.find(item => item.key === key));
  }, [isItemElement, isSectionElement, props.children, selectedKeys]);

  const handleInputKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      listBoxRef.current?.focus();
    }
  }, []);

  const selectedValues = selectedNodes.map(node => node?.textValue || '').join(', ');

  return (
    <div className={styles.root()}>
      <Tooltip tooltip={selectedValues}>
        <div className="relative w-full">
          <button className={styles.control()} ref={buttonRef} {...finalButtonProps}>
            {/* Selected items */}
            <div className={styles.selection()}>
              <span className={styles.selectionSpan()}>{selectedValues}</span>
            </div>

            {/* dropdown toggle */}
            <div className={styles.button()}>
              <DropDownIcon color="muted" size="small" aria-hidden="true" />
            </div>
          </button>
          {selectedNodes.length > 0 && (
            <Button
              className="absolute top-0 right-6.5 bottom-0 flex !h-auto items-center justify-center"
              look="unstyled"
              onClick={() => {
                listState.selectionManager.clearSelection();
              }}
            >
              <ClearIcon className="-mt-0.5" size="small" color="muted" />
            </Button>
          )}
        </div>
      </Tooltip>
      {selectedNodes.length > 0 && (
        <p className={styles.hint()}>
          {selectedNodes.length} item{selectedNodes.length > 1 && 's'} selected
        </p>
      )}

      {/* Popover + ListBox: keep passing state to ListBox — it will use selectionManager */}
      {overlayState.isOpen && (
        <Popover
          popoverRef={popoverRef}
          triggerRef={buttonRef}
          state={overlayState}
          isNonModal
          placement="bottom"
          className={styles.popover()}
          shouldFlip
          shouldCloseOnInteractOutside={() => false}
        >
          <div className={styles.searchInputWrapper()}>
            <InputGroup
              before={{
                icon: SearchIcon,
              }}
              after={
                filterText.length > 0 && {
                  inset: true,
                  element: (
                    <Button
                      onClick={() => {
                        setFilterText('');
                        inputRef.current?.focus();
                      }}
                      look="unstyled"
                      className="-mt-0.5 px-2"
                    >
                      <ClearIcon color="muted" size="small" />
                    </Button>
                  ),
                }
              }
            >
              <Input
                ref={inputRef}
                size={size}
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
                onFocus={() => overlayState.open()}
                onKeyDown={handleInputKeyDown}
              />
            </InputGroup>
          </div>
          <ListBox
            {...listBoxProps}
            aria-label="multiselect list"
            escapeKeyBehavior="none"
            selectionMode={selectionMode}
            filterText={filterText}
            listBoxRef={listBoxRef}
            state={listState}
          />
        </Popover>
      )}
    </div>
  );
}
export const MultiSelect = memo(BaseMultiSelect);
export const MultiSelectItem = Item as (props: ItemProps<unknown> & { description?: string }) => JSX.Element;
