import React, { useCallback, useContext, useEffect, useState, Key } from 'react';
import { mergeProps, useButton, useFocusRing, useOverlayTrigger } from 'react-aria';

import { useBreakpoint } from '../../../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../../../utils/breakpoint.util.js';
import { Button } from '../../../button/button.component.js';
import { DropDownIcon, ClearIcon } from '../../../icon/index.js';
import { Tooltip } from '../../../tooltip/tooltip.component.js';
import { MultiSelectContext } from '../../multi-select.component.js';

import { styles as triggerStyles } from './multi-select-list-box-trigger.styles.js';
import { MultiSelectListBoxTriggerProps } from './multi-select-list-box-trigger.types.js';

export function MultiSelectListBoxTrigger<T>({
  placeholder,
  showSingleSectionTitle,
  selectedKeys,
}: MultiSelectListBoxTriggerProps<T>) {
  const { size, selectionMode, overlayState, listState, buttonRef } = useContext(MultiSelectContext);
  const breakpoint = useBreakpoint();
  const { triggerProps } = useOverlayTrigger({ type: 'listbox' }, overlayState, buttonRef);
  const { buttonProps } = useButton(triggerProps, buttonRef);
  const { focusProps, isFocusVisible } = useFocusRing();
  const [selectedValues, setSelectedValues] = useState<{ key: string; value: string | undefined }[]>([]);
  const [sectionTitle, setSectionTitle] = useState<string | undefined>(undefined);

  const finalButtonProps = mergeProps(focusProps, buttonProps);
  const styles = triggerStyles({
    size: resolveResponsiveVariant(size, breakpoint),
    isFocusVisible,
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

  // Manage selected items state for display
  useEffect(() => {
    if (!selectedKeys || typeof selectedKeys === 'string' || (selectedKeys instanceof Set && selectedKeys.size == 0)) {
      setSelectedValues([]);
    } else {
      const currentMap = new Map(selectedValues.map(item => [item.key, item.value]));

      // manages the selected values that should be displayed to work with filtering
      const next: { key: string; value: string | undefined }[] = [];
      for (const key of [...selectedKeys] as string[]) {
        if (currentMap.has(key)) {
          next.push({ key, value: currentMap.get(key) });
        } else {
          next.push({ key, value: listState.collection.getItem(key)?.textValue });
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

  const valuesString =
    selectionMode === 'single' && selectedValues.length > 0 && showSingleSectionTitle && sectionTitle
      ? `${sectionTitle}: ${selectedValues[0].value}`
      : selectedValues.map(node => node.value || '').join(', ');

  return (
    <>
      <Tooltip tooltip={valuesString} position="top">
        <div className={styles.buttonContainer()}>
          <button className={styles.control()} ref={buttonRef} {...finalButtonProps}>
            {/* Selected items */}
            <div className={styles.selection()}>
              <span className={styles.selectionSpan()}>{selectedValues.length > 0 ? valuesString : placeholder}</span>
            </div>

            {/* dropdown toggle */}
            <div className={styles.button()}>
              <DropDownIcon color="muted" size="small" aria-hidden="true" />
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
      {selectedValues.length > 0 && (
        <p className={styles.hint()}>
          {selectedValues.length} item{selectedValues.length > 1 && 's'} selected
        </p>
      )}
    </>
  );
}
