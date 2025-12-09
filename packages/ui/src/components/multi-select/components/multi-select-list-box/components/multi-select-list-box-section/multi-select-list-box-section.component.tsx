'use client';

import React, { useContext, useMemo } from 'react';
import { useListBoxSection } from 'react-aria';

import { MultiSelectContext } from '../../../../multi-select.component.js';
import { MultiSelectOption } from '../multi-select-option/multi-select-option.component.js';

import { styles as listBoxStyles } from './multi-select-list-box-section.styles.js';

import type { MultiSelectSectionProps } from './multi-select-list-box-section.types.js';

export function MultiSelectListBoxSection<T>({ section }: MultiSelectSectionProps<T>) {
  const { listState } = useContext(MultiSelectContext);
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  const styles = listBoxStyles();

  const childNodes = useMemo(() => {
    return listState?.collection?.getChildren ? [...listState.collection.getChildren(section.key)] : [];
  }, [section.key, listState?.collection]);

  return (
    <>
      <li {...itemProps}>
        {section.rendered && (
          <span {...headingProps} className={styles.span()}>
            {section.rendered}
          </span>
        )}
        <ul {...groupProps} className={styles.ul()}>
          {childNodes.map(node => (
            <MultiSelectOption key={node.key} item={node} />
          ))}
        </ul>
      </li>
    </>
  );
}
