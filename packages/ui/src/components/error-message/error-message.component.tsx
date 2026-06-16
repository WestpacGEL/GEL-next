import { clsx } from 'clsx';
import React, { ReactNode } from 'react';

import { AlertIcon } from '../../components/icon/index.js';
import { List, ListItem } from '../../components/list/index.js';

import { styles as errorMessageStyles } from './error-message.styles.js';
import { type ErrorMessageProps } from './error-message.types.js';

export function ErrorMessage({
  className,
  tag: Tag = 'div',
  icon: Icon,
  errorTitle,
  message,
  ...props
}: ErrorMessageProps) {
  const styles = errorMessageStyles({});
  const FinalIcon = Icon ?? AlertIcon;

  if (errorTitle && Array.isArray(message)) {
    return (
      <div className={styles.titleWrapper({ className })} {...props}>
        <span className={styles.title({})}>
          <FinalIcon color="danger" copyrightYear="2026" className={styles.icon({})} size="xsmall" look="outlined" />
          {errorTitle}
        </span>
        <List type="bullet" look="primary" className={styles.bulletList({})}>
          {message.map((msg, index) => (
            <ListItem key={index}>{msg}</ListItem>
          ))}
        </List>
      </div>
    );
  }

  return Array.isArray(message) ? (
    <ul className={styles.list({})} {...props}>
      {message.map((msg, index) => (
        <li key={index} className={styles.base({ className })}>
          <FinalIcon color="danger" copyrightYear="2026" className={styles.icon({})} size="xsmall" look="outlined" />
          {msg}
        </li>
      ))}
    </ul>
  ) : (
    <Tag className={styles.base({ className: clsx(className, 'mb-2') })} {...props}>
      <FinalIcon color="danger" copyrightYear="2026" className={styles.icon({})} size="xsmall" look="outlined" />
      {message as ReactNode}
    </Tag>
  );
}
