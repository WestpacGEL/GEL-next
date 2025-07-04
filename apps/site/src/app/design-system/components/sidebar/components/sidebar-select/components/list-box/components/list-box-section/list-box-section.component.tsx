/* eslint-disable sonarjs/deprecation */
import { useListBoxSection } from 'react-aria';

import { Option } from '../list-box-option';

import { type ListBoxSectionProps } from './list-box-section.types';

export function ListBoxSection({ section, state }: ListBoxSectionProps) {
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
            <Option key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
}
