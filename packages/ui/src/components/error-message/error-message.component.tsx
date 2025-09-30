import { clsx } from 'clsx';
import React, { ReactNode } from 'react';

import { AlertIcon } from '../../components/icon/index.js';

import { styles as errorMessageStyles } from './error-message.styles.js';
import { type ErrorMessageProps } from './error-message.types.js';

export function ErrorMessage({ className, tag: Tag = 'div', icon: Icon, message, ...props }: ErrorMessageProps) {
  const styles = errorMessageStyles({});
  const FinalIcon = Icon ?? AlertIcon;

  return Array.isArray(message) ? (
    <ul className={styles.list({})} {...props}>
      {message.map((msg, index) => (
        <li key={index} className={styles.base({ className })}>
          <FinalIcon color="danger" copyrightYear="2023" className={styles.icon({})} size="xsmall" look="outlined" />
          {msg}
        </li>
      ))}
    </ul>
  ) : (
    <Tag className={styles.base({ className: clsx(className, 'mb-2') })} {...props}>
      <FinalIcon color="danger" copyrightYear="2023" className={styles.icon({})} size="xsmall" look="outlined" />
      {message as ReactNode}
    </Tag>
  );
}
