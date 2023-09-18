import React from 'react';

import { AlertIcon } from '../../../../components/icon/index.js';

import { styles as errorMessageStyles } from './error-message.styles.js';
import { type ErrorMessageProps } from './error-message.types.js';

export function ErrorMessage({ className, tag: Tag = 'div', icon: Icon, message, ...props }: ErrorMessageProps) {
  const styles = errorMessageStyles({});
  const FinalIcon = Icon || AlertIcon;

  return Array.isArray(message) ? (
    <ul className={styles.list({})} {...props}>
      {message.map(msg => (
        <li className={styles.base({ className })}>
          <FinalIcon
            copyrightYear="2020"
            className={styles.icon({})}
            size="xsmall"
            look="outlined"
            // color="inherit"
          />
          {msg}
        </li>
      ))}
    </ul>
  ) : (
    <Tag className={styles.base({ className: `${className} mb-2` })} {...props}>
      <FinalIcon
        copyrightYear="2020"
        className={styles.icon({})}
        size="xsmall"
        look="outlined"
        // color="inherit"
      />
      {message}
    </Tag>
  );
}
