import React, { useCallback, useContext, useEffect, useState, Key, KeyboardEvent } from 'react';
import { mergeProps, useButton, useFocusRing } from 'react-aria';

import { useBreakpoint } from '../../../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../../../utils/breakpoint.util.js';
import { Button } from '../../../button/button.component.js';
import { DropDownIcon, ClearIcon } from '../../../icon/index.js';
import { Tooltip } from '../../../tooltip/tooltip.component.js';
import { VisuallyHidden } from '../../../visually-hidden/visually-hidden.component.js';
import { MultiSelectContext } from '../../multi-select.component.js';

import { styles as triggerStyles } from './multi-select-list-box-trigger.styles.js';
import { MultiSelectListBoxTriggerProps } from './multi-select-list-box-trigger.types.js';

import type { MultiSelectItemProps } from '../../multi-select.types.js';
import type { Node } from '@react-types/shared';

// value is shown in the field, tooltip is the textValue shown in the tooltip and read by screen readers
type SelectedValue = { key: string; value: string | undefined; tooltip: string | undefined };

export function MultiSelectListBoxTrigger<T>({
  placeholder,
  showSingleSectionTitle,
  selectedKeys,
  triggerProps,
  id,
  width,
}: MultiSelectListBoxTriggerProps<T>) {
  const { size, overlayState, listState, buttonRef, inputRef } = useContext(MultiSelectContext);
  const selectionMode = listState.selectionManager.selectionMode;
  const breakpoint = useBreakpoint();
  const { buttonProps } = useButton(triggerProps, buttonRef);
  const { focusProps, isFocusVisible } = useFocusRing();
  const [selectedValues, setSelectedValues] = useState<SelectedValue[]>([]);
  const [sectionTitle, setSectionTitle] = useState<string | undefined>(undefined);

  const finalButtonProps = mergeProps(focusProps, buttonProps);
  const styles = triggerStyles({
    size: resolveResponsiveVariant(size, breakpoint),
    isFocusVisible,
    width: resolveResponsiveVariant(width, breakpoint),
  });

  const getSectionTitle = useCallback(
    (key?: Key): string | undefined => {
      const parentKey = key ?? '';
      const item = listState.collection.getItem(parentKey as string);
      if (!item) return undefined;
      const title = (item.props as { title?: string }).title;
      return title;
    },
    [listState.collection],
  );

  const handleTriggerKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        overlayState.open();
        inputRef.current?.focus();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [overlayState],
  );

  // Manage selected items state for display
  useEffect(() => {
    if (!selectedKeys || typeof selectedKeys === 'string' || (selectedKeys instanceof Set && selectedKeys.size === 0)) {
      setSelectedValues([]);
    } else {
      const currentMap = new Map(selectedValues.map(item => [item.key, item]));

      const next: SelectedValue[] = [];
      for (const key of [...selectedKeys] as string[]) {
        const current = currentMap.get(key);
        if (current) {
          next.push(current);
        } else {
          const item: (Omit<Node<object>, 'props'> & { props?: Pick<MultiSelectItemProps, 'displayValue'> }) | null =
            listState.collection.getItem(key);
          next.push({ key, value: item?.props?.displayValue ?? item?.textValue, tooltip: item?.textValue });
        }
      }

      // Handles displaying the section title
      if (selectionMode === 'single' && showSingleSectionTitle) {
        const firstKey = ([...selectedKeys] as string[])[0];
        const parentKey = listState.collection.getItem(firstKey)?.parentKey;
        const title = parentKey ? getSectionTitle(parentKey) : undefined;
        setSectionTitle(title);
      }

      setSelectedValues(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKeys]);

  const formatValues = (field: 'value' | 'tooltip') =>
    selectionMode === 'single' && selectedValues.length > 0 && showSingleSectionTitle && sectionTitle
      ? `${sectionTitle}: ${selectedValues[0][field]}`
      : selectedValues.map(item => item[field] || '').join(', ');

  const valuesString = formatValues('value');
  const tooltipString = formatValues('tooltip');

  return (
    <>
      <Tooltip tooltip={tooltipString} position="top">
        <div className={styles.buttonContainer()}>
          <button
            className={styles.control()}
            ref={buttonRef}
            {...finalButtonProps}
            onKeyDown={handleTriggerKeyDown}
            type="button"
            role="combobox"
            aria-autocomplete="list"
            tabIndex={undefined}
            aria-haspopup="dialog"
            id={id}
          >
            {/* Selected items */}
            <div className={styles.selection()}>
              {selectedValues.length > 0 ? (
                <>
                  {/* Visible text may use displayValue, so screen readers get the textValue instead */}
                  <span aria-hidden="true" className={styles.selectionSpan()}>
                    {valuesString}
                  </span>
                  <VisuallyHidden tag="span">{tooltipString}</VisuallyHidden>
                </>
              ) : (
                <span className={styles.selectionSpan()}>{placeholder}</span>
              )}
            </div>

            {/* dropdown toggle */}
            <div className={styles.button()}>
              <DropDownIcon color="muted-vivid" size="medium" aria-hidden="true" />
            </div>
          </button>
          {selectedValues.length > 0 && (
            <Button
              className={styles.clearButton()}
              look="unstyled"
              onClick={() => {
                listState.selectionManager.clearSelection();
              }}
            >
              <ClearIcon className={styles.clearIcon()} size="small" color="muted" />
            </Button>
          )}
        </div>
      </Tooltip>
      {selectedValues.length > 0 && selectionMode === 'multiple' && (
        <p className={styles.hint()}>
          {selectedValues.length} item{selectedValues.length > 1 && 's'} selected
        </p>
      )}
    </>
  );
}
