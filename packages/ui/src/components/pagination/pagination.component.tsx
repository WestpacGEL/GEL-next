/* eslint-disable sonarjs/cognitive-complexity */
'use client';

import React from 'react';

import { PaginationPage } from './components/pagination-pages/pagination-pages.component.js';
import { PaginationTotalPages } from './components/pagination-total-pages/pagination-total-pages.component.js';
import { type PaginationProps } from './pagination.types.js';

export function Pagination({
  tag = 'nav',
  role = 'navigation',
  current = 1,
  infinite = false,
  backLabel = 'Back',
  nextLabel = 'Next',
  siblingCount = 2,
  boundaryCount = 1,
  ...props
}: PaginationProps) {
  if ('totalPages' in props) {
    return (
      <PaginationTotalPages
        tag={tag}
        role={role}
        current={current}
        infinite={infinite}
        backLabel={backLabel}
        nextLabel={nextLabel}
        siblingCount={siblingCount}
        boundaryCount={boundaryCount}
        {...props}
      />
    );
  }

  return (
    <PaginationPage
      tag={tag}
      role={role}
      current={current}
      infinite={infinite}
      backLabel={backLabel}
      nextLabel={nextLabel}
      siblingCount={siblingCount}
      boundaryCount={boundaryCount}
      {...props}
    />
  );
}
