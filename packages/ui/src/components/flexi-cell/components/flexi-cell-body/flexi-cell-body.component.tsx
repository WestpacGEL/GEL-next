import React from 'react';
import { mergeProps, useFocusRing } from 'react-aria';

import { styles } from './flexi-cell-body.styles.js';
import { type FlexiCellBodyProps } from './flexi-cell-body.types.js';

/** Flexi Cell Body: Flexi Cell Body */
export const FlexiCellBody = ({ children, tag: Tag = 'div', href, className, ...props }: FlexiCellBodyProps) => {
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <Tag
      {...mergeProps(props, focusProps)}
      href={href}
      className={styles({ isLink: !!href, isFocusVisible, className })}
    >
      {children}
    </Tag>
  );
};
FlexiCellBody.displayName = 'FlexiCell.Body';
