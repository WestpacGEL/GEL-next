import React, { useMemo } from 'react';
import { useFilter, useListBoxSection } from 'react-aria';

import { Option } from '../option/option.component.js';

import { styles as listBoxStyles } from './list-box-section.styles.js';

import type { SectionProps } from './list-box-section.types.js';

export function ListBoxSection({ filterText, selectionMode, section, state }: SectionProps) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  const filter = useFilter({ sensitivity: 'base' });
  const styles = listBoxStyles();

  const childNodes = useMemo(() => {
    const nodes = state?.collection?.getChildren ? [...state.collection.getChildren(section.key)] : [];
    if (!filterText) {
      return nodes;
    }
    return nodes.filter(child => filter.contains(child.textValue, filterText));
  }, [filter, filterText, section.key, state.collection]);

  return (
    <>
      <li {...itemProps}>
        {section.rendered && (
          <span {...headingProps} className={styles.span()}>
            {section.rendered}
          </span>
        )}
        <ul {...groupProps}>
          {childNodes.map(node => (
            <Option selectionMode={selectionMode} filterText={filterText} key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
}
