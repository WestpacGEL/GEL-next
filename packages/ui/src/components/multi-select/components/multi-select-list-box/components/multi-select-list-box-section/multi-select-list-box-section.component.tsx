import React, { useMemo } from 'react';
import { useListBoxSection } from 'react-aria';

import { MultiSelectOption } from '../multi-select-option/multi-select-option.component.js';

import { styles as listBoxStyles } from './multi-select-list-box-section.styles.js';

import type { MultiSelectSectionProps } from './multi-select-list-box-section.types.js';

export function MultiSelectListBoxSection<T>({ selectionMode, section, state }: MultiSelectSectionProps<T>) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  const styles = listBoxStyles();

  const childNodes = useMemo(() => {
    return state?.collection?.getChildren ? [...state.collection.getChildren(section.key)] : [];
  }, [section.key, state?.collection]);

  return (
    <>
      <li {...itemProps}>
        {section.rendered && (
          <span {...headingProps} className={styles.span()}>
            {section.rendered}
          </span>
        )}
        <ul {...groupProps} className="py-2">
          {childNodes.map(node => (
            <MultiSelectOption selectionMode={selectionMode} key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
}
