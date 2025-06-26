/* eslint-disable sonarjs/cognitive-complexity */
'use client';

import React, { useCallback, useMemo } from 'react';

import { PaginationPresentational } from '../pagination-presentational/pagination-presentational.component.js';

import { PageToRender, type PaginationPageProps } from './pagination-pages.types.js';

export function PaginationPage({
  className,
  pages,
  tag = 'nav',
  role = 'navigation',
  current = 1,
  linkComponent,
  infinite = false,
  onChange,
  backLabel = 'Back',
  nextLabel = 'Next',
  nextAriaLabel = 'Next',
  backAriaLabel = 'Back',
  siblingCount = 2,
  boundaryCount = 1,
  ...props
}: PaginationPageProps) {
  const generateHandleOnClickBackwards = useCallback(
    (
      current: number,
      infinite: boolean,
      forwardOnly: boolean,
      onChange: (page: number) => unknown,
      pages: PaginationPageProps['pages'],
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
      'aria-label': backAriaLabel,
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
  }, [current, infinite, backAriaLabel, onChange, linkComponent, pages, generateHandleOnClickBackwards]);

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
      'aria-label': nextAriaLabel,
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
  }, [current, pages, infinite, linkComponent, nextAriaLabel, onChange, generateHandleOnClickForward]);

  /** Create a list of pages with page numbers */
  const numberedPages = useMemo(() => pages.map((page, index) => ({ ...page, page: index + 1 })), [pages]);

  /** Compute which pages and ellipses to show */
  const pagesToRender: PageToRender[] = useMemo(() => {
    const minEdgePagesVisible = siblingCount * 2 + boundaryCount + 2;

    // Always show these boundaries
    let leftCorner = numberedPages.slice(0, boundaryCount);
    let rightCorner =
      boundaryCount > 0
        ? numberedPages.slice(-boundaryCount).filter(page => !leftCorner.some(leftItem => leftItem.page === page.page))
        : [];
    let middle: PageToRender[] = [];

    if (current) {
      // Expand corners when near start or end
      const nearStart = current < minEdgePagesVisible - siblingCount;
      const nearEnd = current > numberedPages.length - minEdgePagesVisible + siblingCount;

      if (nearStart) {
        leftCorner = numberedPages.slice(0, minEdgePagesVisible);
      }
      if (nearEnd) {
        rightCorner = numberedPages
          .slice(-minEdgePagesVisible)
          .filter(page => !leftCorner.some(leftItem => leftItem.page === page.page));
      }

      // Compute middle pages
      const currentIndex = current - 1;
      const leftEdge = currentIndex - siblingCount;
      middle = numberedPages.slice(Math.max(0, leftEdge), leftEdge + (siblingCount * 2 + 1)).filter(middleItem => {
        return !(
          leftCorner.some(left => left.page === middleItem.page) ||
          rightCorner.some(right => right.page === middleItem.page)
        );
      });

      // Decide where to show ellipses
      const lastItemMiddle = middle.at(-1);
      const hasLeftDots = middle[0]?.page && middle[0].page - 1 !== leftCorner.at(-1)?.page;
      const hasRightDots = lastItemMiddle?.page && lastItemMiddle.page + 1 !== rightCorner[0]?.page;

      if (middle.length === 0 && leftCorner.length + rightCorner.length !== numberedPages.length) {
        middle = [null]; // full middle ellipsis
      } else {
        if (hasLeftDots) middle.unshift(null);
        if (hasRightDots) middle.push(null);
      }
    }
    return [...leftCorner, ...middle, ...rightCorner];
  }, [boundaryCount, current, numberedPages, siblingCount]);

  if (!pages.length) {
    return <></>;
  }

  return (
    <PaginationPresentational
      className={className}
      current={current}
      paginationBackProps={paginationBackProps}
      paginationNextProps={paginationNextProps}
      pagesToRender={pagesToRender}
      tag={tag}
      role={role}
      backLabel={backLabel}
      nextLabel={nextLabel}
      onChange={onChange}
      {...props}
    />
  );
}
