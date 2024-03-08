'use client';

import React, { Ref, forwardRef } from 'react';

import { styles } from './skip-link.styles.js';
import { type SkipLinkProps } from './skip-link.types.js';

function BaseSkipLink({ className, tag: Tag = 'a', children, ...props }: SkipLinkProps, ref: Ref<HTMLElement>) {
  return (
    <Tag {...({ ref } as object)} className={styles({ className })} {...props}>
      {children}
    </Tag>
  );
}

export const SkipLink = forwardRef(BaseSkipLink);
SkipLink.displayName = 'SkipLink';
