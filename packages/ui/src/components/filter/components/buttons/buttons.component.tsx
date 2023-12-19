import React from 'react';

import { Button } from '../../../index.js';
import { generateAriaDescription } from '../../filter.util.js';

import { styles } from './buttons.styles.js';
import { type ButtonsProps } from './buttons.types.js';

export function Buttons({
  filterButtons,
  onClick,
  selectedButton,
  resultsFound,
  tag: Tag = 'div',
  className,
  ...props
}: ButtonsProps) {
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
