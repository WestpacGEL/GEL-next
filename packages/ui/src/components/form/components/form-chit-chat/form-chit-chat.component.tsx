import React from 'react';

import { styles } from './form-chit-chat.styles.js';
import { type FormChitChatProps } from './form-chit-chat.types.js';

export function FormChitChat({ className, tag: Tag = 'div', children, ...props }: FormChitChatProps) {
  return (
    <Tag className={styles({ className })} {...props}>
      {children}
    </Tag>
  );
}
