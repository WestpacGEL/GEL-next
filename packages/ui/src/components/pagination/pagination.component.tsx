/* eslint-disable sonarjs/cognitive-complexity */
'use client';

import React, { useCallback, useMemo } from 'react';

import { useBreakpoint } from '../../hook/breakpoints.hook.js';

import { PaginationPresentational } from './components/pagination-presentational/pagination-presentational.component.js';
import { type PaginationProps } from './pagination.types.js';
import { getSiblingOrBoundaryCount } from './pagination.utils.js';

function generateArray(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, i) => i + from);
}

export function Pagination({
  className,
  totalPages,
  tag = 'nav',
  role = 'navigation',
  current = 1,
  linkComponent,
  infinite = false,
  onChange,
  backLabel = 'Back',
  backAriaLabel = 'Back',
  nextLabel = 'Next',
  nextAriaLabel = 'Next',
  siblingCount = 2,
  boundaryCount = 1,
  onPageItemProps,
  ...props
}: PaginationProps) {
  const breakpoint = useBreakpoint();

  // catering for responsive usage of siblingCount.
  const finalSiblingCount = useMemo(() => {
    if (typeof siblingCount === 'number') {
      return siblingCount;
    }
    return getSiblingOrBoundaryCount(siblingCount, breakpoint);
  }, [breakpoint, siblingCount]);

  // catering for responsive usage of BoundaryCount
  const finalBoundaryCount = useMemo(() => {
    if (typeof boundaryCount === 'number') {
      return boundaryCount;
    }
    return getSiblingOrBoundaryCount(boundaryCount, breakpoint);
  }, [boundaryCount, breakpoint]);

  const generateHandleOnClickBackwards = useCallback(
    (
      current: number,
      infinite: boolean,
      forwardOnly: boolean,
      onChange: (page: number) => unknown,
      totalPages: number,
    ) =>
      () => {
        if (infinite && forwardOnly) {
          return onChange(totalPages);
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
          onClick: generateHandleOnClickBackwards(current, infinite, fowardOnly, onChange, totalPages),
        }),
      };
    }
    return {
      ...defaultBackProps,
      tag: linkComponent || 'a',
      href: fowardOnly ? onPageItemProps?.(totalPages).href : onPageItemProps?.(current - 1)?.href,
    };
  }, [
    current,
    infinite,
    backAriaLabel,
    onChange,
    linkComponent,
    onPageItemProps,
    totalPages,
    generateHandleOnClickBackwards,
  ]);

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
    const backwardsOnly = (current || 1) >= totalPages;
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
      href: backwardsOnly ? onPageItemProps?.(1)?.href : onPageItemProps?.(current || 0)?.href,
    };
  }, [
    current,
    totalPages,
    infinite,
    linkComponent,
    nextAriaLabel,
    onChange,
    onPageItemProps,
    generateHandleOnClickForward,
  ]);

  /** Compute which pages and ellipses to show */
  const pagesToRender = useMemo(() => {
    const minEdgePagesVisible = Math.min(finalSiblingCount * 2 + finalBoundaryCount + 2, totalPages);

    // Always show these boundaries
    let leftCorner = generateArray(1, Math.min(finalBoundaryCount, totalPages));
    let rightCorner =
      finalBoundaryCount > 0
        ? generateArray(totalPages + 1 - finalBoundaryCount, totalPages).filter(
            page => !leftCorner.some(leftItem => leftItem === page),
          )
        : [];
    let middle: (number | null)[] = [];

    if (current) {
      // Expand corners when near start or end
      const nearStart = current < minEdgePagesVisible - finalSiblingCount;
      const nearEnd = current > totalPages - minEdgePagesVisible + finalSiblingCount;

      if (nearStart) {
        leftCorner = generateArray(1, minEdgePagesVisible);
      }
      if (nearEnd) {
        rightCorner = generateArray(totalPages - minEdgePagesVisible + 1, totalPages);
      }
      rightCorner = rightCorner.filter(page => !leftCorner.some(leftItem => leftItem === page));

      // Compute middle pages
      const leftEdge = current - finalSiblingCount;
      middle = generateArray(Math.max(1, leftEdge), Math.min(leftEdge + finalSiblingCount * 2, totalPages)).filter(
        middleItem => {
          return !(leftCorner.some(left => left === middleItem) || rightCorner.some(right => right === middleItem));
        },
      );

      // Decide where to show ellipses
      const lastItemMiddle = middle.at(-1);
      const hasLeftDots = middle[0] && middle[0] - 1 !== leftCorner.at(-1);
      const hasRightDots = lastItemMiddle && lastItemMiddle + 1 !== rightCorner[0];

      if (middle.length === 0 && leftCorner.length + rightCorner.length !== totalPages) {
        middle = [null]; // full middle ellipsis
      } else {
        if (hasLeftDots) middle.unshift(null);
        if (hasRightDots) middle.push(null);
      }
    }

    return [...leftCorner, ...middle, ...rightCorner].map(page =>
      page ? { page, text: page, ...onPageItemProps?.(page) } : null,
    );
  }, [finalBoundaryCount, current, onPageItemProps, finalSiblingCount, totalPages]);

  if (totalPages <= 0) {
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
