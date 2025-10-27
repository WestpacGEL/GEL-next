import React from 'react';

import { type FilterProps } from './filter.types.js';

export function Filter({ children, ...props }: FilterProps) {
  return (
    <div {...props} className="flex flex-col gap-2">
      {children}
    </div>
  );
}
