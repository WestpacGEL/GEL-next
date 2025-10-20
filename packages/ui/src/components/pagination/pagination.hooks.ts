import { useCallback, useState } from 'react';

import { type PaginationHookProps } from './pagination.types.js';

export const usePagination = ({ defaultCurrent = 1, totalPages, infinite = false }: PaginationHookProps) => {
  const [currentPage, setCurrentPage] = useState<number>(defaultCurrent);

  const next = useCallback(() => {
    setCurrentPage(currentPage => {
      const cannotGoForward = currentPage >= totalPages;
      if (infinite && cannotGoForward) {
        return 1;
      }
      return cannotGoForward ? currentPage : currentPage + 1;
    });
  }, [infinite, totalPages]);

  const previous = useCallback(() => {
    setCurrentPage(currentPage => {
      const cannotGoBackwards = currentPage <= 1;
      if (infinite && cannotGoBackwards) {
        return totalPages;
      }
      return cannotGoBackwards ? currentPage : currentPage - 1;
    });
  }, [infinite, totalPages]);

  return {
    currentPage,
    setCurrentPage,
    next,
    previous,
    totalPages,
  };
};
