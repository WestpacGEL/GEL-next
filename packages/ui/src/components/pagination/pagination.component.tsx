import React, { useCallback, useMemo } from 'react';

import { PaginationItem } from './components/index.js';
import { styles as paginationStyles } from './pagination.styles.js';
import { type PaginationProps } from './pagination.types.js';

export function Pagination({
  className,
  pages,
  tag: Tag = 'nav',
  role = 'navigation',
  children,
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
        cannotGoBackwards: boolean,
        onChange: (page: number) => any,
        pages: PaginationProps['pages'],
      ) =>
      () => {
        if (infinite && cannotGoBackwards) {
          return onChange(pages.length);
        }
        if (!cannotGoBackwards) {
          return onChange(current - 1);
        }
      },
    [],
  );

  const paginationBackProps = useMemo(() => {
    const cannotGoBackwards = (current || 1) <= 1;
    const defaultBackProps = {
      disabled: !infinite && cannotGoBackwards,
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
          onClick: generateHandleOnClickBackwards(current, infinite, cannotGoBackwards, onChange, pages),
        }),
      };
    }
    return {
      ...defaultBackProps,
      tag: linkComponent || 'a',
      href: cannotGoBackwards ? pages[pages.length - 1].href : pages[(current || 0) - 2]?.href,
    };
  }, [current, onChange, linkComponent, pages, infinite]);

  const generateHandleOnClickForward = useCallback(
    (current: number, infinite: boolean, cannotGoForward: boolean, onChange: (page: number) => any) => () => {
      if (infinite && cannotGoForward) {
        return onChange(1);
      }
      if (cannotGoForward) {
        return;
      }
      return onChange(current + 1);
    },
    [],
  );

  const paginationNextProps = useMemo(() => {
    const cannotGoForward = (current || 1) >= pages.length;
    const defaultNextProps = {
      disabled: !infinite && cannotGoForward,
      tag: linkComponent,
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
          onClick: generateHandleOnClickForward(current, infinite, cannotGoForward, onChange),
        }),
      };
    }
    return {
      ...defaultNextProps,
      tag: linkComponent || 'a',
      href: cannotGoForward ? pages[0].href : pages[current || 0]?.href,
    };
  }, [current, onChange, linkComponent, pages, infinite]);

  return (
    <Tag className={styles.base({ className })} role={role} {...props}>
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
      {children}
    </Tag>
  );
}
