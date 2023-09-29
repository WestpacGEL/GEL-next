import { useCallback, useMemo, useState } from 'react';

import { type PaginationHookProps } from './pagination.types.js';

export const usePagination = ({ defaultCurrent = 1, pages, infinite = false }: PaginationHookProps) => {
  const [currentPage, setCurrentPage] = useState<number>(defaultCurrent);

  const next = useCallback(() => {
    setCurrentPage(currentPage => {
      const cannotGoForward = currentPage >= pages.length;
      if (infinite && cannotGoForward) {
        return 1;
      }
      return cannotGoForward ? currentPage : currentPage + 1;
    });
  }, [pages]);

  const previous = useCallback(() => {
    setCurrentPage(currentPage => {
      const cannotGoBackwards = currentPage <= 1;
      if (infinite && cannotGoBackwards) {
        return pages.length;
      }
      return cannotGoBackwards ? currentPage : currentPage - 1;
    });
  }, [pages]);

  const selectedPage = useMemo(() => {
    return pages[currentPage - 1];
  }, [pages, currentPage]);

  return {
    selectedPage,
    currentPage,
    setCurrentPage,
    next,
    previous,
    pages,
  };
};
