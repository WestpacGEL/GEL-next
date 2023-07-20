import React, { forwardRef } from 'react';

import { styles } from './textarea.styles.js';
import { type TextareaProps } from './textarea.types.js';

function BaseTextarea({ className, size = 'medium', invalid = false, ...props }: TextareaProps, ref: any) {
  return <textarea ref={ref} className={styles({ className, size, invalid })} {...props} />;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(BaseTextarea);
