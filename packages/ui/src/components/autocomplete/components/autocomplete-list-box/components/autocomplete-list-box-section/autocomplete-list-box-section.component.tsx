import * as React from 'react';
import { useListBoxSection } from 'react-aria';

import { AutocompleteListBoxOption } from '../autocomplete-list-box-option/index.js';

import { type AutocompleteListBoxSectionProps } from './autocomplete-list-box-section.types.js';

/**
 * @private
 */
export function AutocompleteListBoxSection({ section, state }: AutocompleteListBoxSectionProps<unknown>) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  return (
    <>
      <li {...itemProps} className="pt-2">
        {section.rendered && (
          <span {...headingProps} className="mx-3 text-xs font-bold uppercase text-text">
            {section.rendered}
          </span>
        )}

        <ul {...groupProps}>
          {[...section.childNodes].map(node => (
            <AutocompleteListBoxOption key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
}
