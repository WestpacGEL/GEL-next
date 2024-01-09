import React from 'react';

import { Button } from '../../../index.js';
import { generateAriaDescription } from '../../filter.util.js';

import { styles } from './filter-buttons.styles.js';
import { type FilterButtonsProps } from './filter-buttons.types.js';

export function FilterButtons({
  filterButtons,
  onClick,
  selectedButton,
  resultsFound,
  tag: Tag = 'div',
  className,
  ...props
}: FilterButtonsProps) {
  return (
    <Tag className={styles({ className })} {...props}>
      {filterButtons.map(button => (
        <Button
          aria-pressed={button.id === selectedButton}
          aria-description={generateAriaDescription(button.id, selectedButton, filterButtons.length, resultsFound)}
          aria-label={button.text}
          look="hero"
          size="small"
          onClick={() => onClick(button.id)}
          key={button.id}
          soft={button.id !== selectedButton}
        >
          {button.text}
        </Button>
      ))}
    </Tag>
  );
}
