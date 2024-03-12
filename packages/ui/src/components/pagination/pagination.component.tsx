'use client';

import React, { useCallback, useMemo } from 'react';

import { PaginationItem } from './components/index.js';
import { styles as paginationStyles } from './pagination.styles.js';
import { type PaginationProps } from './pagination.types.js';

export function Pagination({
  className,
  pages,
  tag: Tag = 'nav',
  role = 'navigation',
  current,
  linkComponent,
  infinite = false,
  onChange,
  backLabel = 'Back',
  nextLabel = 'Next',
  ...props
}: PaginationProps) {
  const styles = paginationStyles({});

  const generateHandleOnClickBackwards = useCallback(
    (
      current: number,
      infinite: boolean,
      forwardOnly: boolean,
      onChange: (page: number) => unknown,
      pages: PaginationProps['pages'],
    ) =>
      () => {
        if (infinite && forwardOnly) {
          return onChange(pages.length);
        }
        if (!forwardOnly) {
          return onChange(current - 1);
        }
      },
    [],
  );

  const paginationBackProps = useMemo(() => {
    const fowardOnly = (current || 1) <= 1;
    const defaultBackProps = {
      disabled: !infinite && fowardOnly,
      firstItem: true,
    };
    if (defaultBackProps.disabled) {
      return {
        ...defaultBackProps,
        tag: 'button',
      } as const;
    }
    if (onChange) {
      return {
        ...defaultBackProps,
        tag: linkComponent || 'button',
        ...(current && {
          onClick: generateHandleOnClickBackwards(current, infinite, fowardOnly, onChange, pages),
        }),
      };
    }
    return {
      ...defaultBackProps,
      tag: linkComponent || 'a',
      href: fowardOnly ? pages[pages.length - 1].href : pages[(current || 0) - 2]?.href,
    };
  }, [current, infinite, onChange, linkComponent, pages, generateHandleOnClickBackwards]);

  const generateHandleOnClickForward = useCallback(
    (current: number, infinite: boolean, backwardsOnly: boolean, onChange: (page: number) => unknown) => () => {
      if (infinite && backwardsOnly) {
        return onChange(1);
      }
      if (backwardsOnly) {
        return;
      }
      return onChange(current + 1);
    },
    [],
  );

  const paginationNextProps = useMemo(() => {
    const backwardsOnly = (current || 1) >= pages.length;
    const defaultNextProps = {
      disabled: !infinite && backwardsOnly,
      tag: linkComponent,
      lastItem: true,
    };
    if (defaultNextProps.disabled) {
      return {
        ...defaultNextProps,
        tag: 'button',
      } as const;
    }
    if (onChange) {
      return {
        ...defaultNextProps,
        tag: linkComponent || 'button',
        ...(current && {
          onClick: generateHandleOnClickForward(current, infinite, backwardsOnly, onChange),
        }),
      };
    }
    return {
      ...defaultNextProps,
      tag: linkComponent || 'a',
      href: backwardsOnly ? pages[0].href : pages[current || 0]?.href,
    };
  }, [current, pages, infinite, linkComponent, onChange, generateHandleOnClickForward]);

  return (
    <Tag className={styles.base({ className })} role={role} aria-label="Page number" {...props}>
      <ul className={styles.ul({})}>
        <li>
          <PaginationItem {...paginationBackProps}>{backLabel}</PaginationItem>
        </li>
        {pages.map((page, index) => {
          const commonProps = {
            active: (current || 0) === index + 1,
          };

          return (
            <li key={index}>
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
                      onChange(index + 1);
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
