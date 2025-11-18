import React from 'react';
import { useListBoxSection } from 'react-aria';

import { Option } from '../option/option.component.js';

import { styles as listBoxStyles } from './list-box-section.styles.js';

import type { SectionProps } from './list-box-section.types.js';

export function ListBoxSection({ filterText, section, state }: SectionProps) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  const styles = listBoxStyles();

  const childNodes = state?.collection?.getChildren ? [...state.collection.getChildren(section.key)] : [];
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
            <Option filterText={filterText} key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
}
