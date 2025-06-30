/* eslint-disable sonarjs/cognitive-complexity */
'use client';

import React from 'react';

import { PaginationItem } from '../../components/index.js';

import { styles as paginationStyles } from './pagination-presentational.styles.js';
import { type PaginationPresentationalProps } from './pagination-presentational.types.js';

export function PaginationPresentational({
  className,
  tag: Tag = 'nav',
  role = 'navigation',
  paginationBackProps,
  backLabel,
  pagesToRender,
  current,
  linkComponent,
  onChange,
  paginationNextProps,
  nextLabel,
  ...props
}: PaginationPresentationalProps) {
  const styles = paginationStyles({});

  return (
    <Tag className={styles.base({ className })} role={role} aria-label="Page number" {...props}>
      <ul className={styles.ul({})}>
        <li>
          <PaginationItem {...paginationBackProps}>{backLabel}</PaginationItem>
        </li>
        {pagesToRender.map((page, index) => {
          if (page === null) {
            return (
              <li className={styles.emptyItem()} aria-hidden="true" key={`index-${index}`}>
                ...
              </li>
            );
          }

          const commonProps = {
            active: (current || 0) === page.page,
            'aria-label': page['aria-label'] || `Go to page ${page.page}`,
          };

          return (
            <li key={page.page}>
              {'href' in page ? (
                <PaginationItem {...commonProps} tag={linkComponent || 'a'} href={page.href}>
                  {page.text}
                </PaginationItem>
              ) : (
                <PaginationItem
                  {...commonProps}
                  tag={linkComponent || 'button'}
                  onClick={
                    onChange &&
                    (() => {
                      onChange(page.page);
                    })
                  }
                >
                  {page.text}
                </PaginationItem>
              )}
            </li>
          );
        })}
        <li>
          <PaginationItem {...paginationNextProps}>{nextLabel}</PaginationItem>
        </li>
      </ul>
      {current && (
        <span className="sr-only" role="status">
          Page {current}
        </span>
      )}
    </Tag>
  );
}
