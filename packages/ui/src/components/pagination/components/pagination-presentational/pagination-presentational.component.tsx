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
            const previousPage = pagesToRender[index - 1];
            const nextPage = pagesToRender[index + 1];
            const from = previousPage ? previousPage.page + 1 : undefined;
            const to = nextPage ? nextPage.page - 1 : undefined;

            const label = (() => {
              // Unknown case
              if (from === undefined || to === undefined) {
                return 'Some pages are hidden. Use the Previous and Next links to navigate';
              }

              // Single page hidden
              if (from === to) {
                return `Page ${from} is hidden. Use the Previous and Next links to navigate`;
              }

              // Page range
              return `Pages ${from} to ${to} are hidden. Use the Previous and Next links to navigate`;
            })();

            return (
              <li className={styles.emptyItem()} key={`index-${index}`}>
                <span aria-hidden="true">…</span>
                <span className="sr-only">{`… ${label}`}</span>
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
