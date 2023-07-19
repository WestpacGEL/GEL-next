import React, { forwardRef } from 'react';

import { styles } from './skip-link.styles.js';
import { type SkipLinkProps } from './skip-link.types.js';

function BaseSkipLink({ className, tag: Tag = 'a', children, ...props }: SkipLinkProps, ref: any) {
  return (
    <Tag {...({ ref } as any)} className={styles({ className })} {...props}>
      {children}
    </Tag>
  );
}

export const SkipLink = forwardRef(BaseSkipLink);
SkipLink.displayName = 'SkipLink';
