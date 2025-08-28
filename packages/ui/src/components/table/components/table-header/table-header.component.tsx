import React from 'react';

import { type TableHeaderProps } from './table-header.types.js';

export function TableHeader({ children, ...props }: TableHeaderProps) {
  return <thead {...props}>{children}</thead>;
}
