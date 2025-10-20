import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { Pagination } from './pagination.component.js';
import { usePagination } from './pagination.hooks.js';

const TWENTY_PAGES_SAMPLE = [
  { text: 'page-1' },
  { text: 'page-2' },
  { text: 'page-3' },
  { text: 'page-4' },
  { text: 'page-5' },
  { text: 'page-6' },
  { text: 'page-7' },
  { text: 'page-8' },
  { text: 'page-9' },
  { text: 'page-10' },
  { text: 'page-11' },
  { text: 'page-12' },
  { text: 'page-13' },
  { text: 'page-14' },
  { text: 'page-15' },
  { text: 'page-16' },
  { text: 'page-17' },
  { text: 'page-18' },
  { text: 'page-19' },
  { text: 'page-20' },
];

describe('Pagination', () => {
  const user = userEvent.setup();

  it('renders the component as link', () => {
    const { container } = render(
      <Pagination
        current={1}
        totalPages={3}
        onPageItemProps={page => ({ href: `#page${page}`, text: `page-${page}` })}
      />,
    );
    expect(container).toBeInTheDocument();
  });
  it('renders the component as data driven', () => {
    const fn = vitest.fn();
    const { container } = render(
      <Pagination totalPages={3} current={1} onChange={fn} onPageItemProps={page => ({ text: `page-${page}` })} />,
    );
    expect(container).toBeInTheDocument();
  });

  it('goes to the page where user has clicked', async () => {
    const { result } = renderHook(() => {
      const [current, setCurrent] = useState(1);
      return { current, setCurrent };
    });

    const { getByRole, getByText, rerender } = render(
      <Pagination
        current={result.current.current}
        onChange={newPage => {
          result.current.setCurrent(newPage);
        }}
        totalPages={3}
        onPageItemProps={page => ({ text: `page-${page}` })}
      />,
    );
    expect(getByRole('button', { current: 'page' })).toHaveTextContent('page-1');
    await act(async () => {
      await user.click(getByText('page-2'));
    });

    rerender(
      <Pagination
        current={result.current.current}
        totalPages={3}
        onChange={newPage => {
          result.current.setCurrent(newPage);
        }}
        onPageItemProps={page => ({ text: `page-${page}` })}
      />,
    );
    expect(getByRole('button', { current: 'page' })).toHaveTextContent('page-2');
  });

  it('goes to the next page when the next button is clicked', async () => {
    const { result } = renderHook(() => {
      const [current, setCurrent] = useState(1);
      return { current, setCurrent };
    });

    const { getByRole, getByText, rerender } = render(
      <Pagination
        current={result.current.current}
        onChange={newPage => {
          result.current.setCurrent(newPage);
        }}
        totalPages={3}
        onPageItemProps={page => ({ text: `page-${page}` })}
      />,
    );
    await act(async () => {
      await user.click(getByText('Next'));
    });

    rerender(
      <Pagination
        current={result.current.current}
        onChange={newPage => {
          result.current.setCurrent(newPage);
        }}
        totalPages={3}
        onPageItemProps={page => ({ text: `page-${page}` })}
      />,
    );
    expect(getByRole('button', { current: 'page' })).toHaveTextContent('page-2');
  });

  it('does not go to the next page when it is the last page', async () => {
    const { result } = renderHook(() => {
      const [current, setCurrent] = useState(3);
      return { current, setCurrent };
    });

    const { getByRole, getByText, rerender } = render(
      <Pagination
        current={result.current.current}
        onChange={newPage => {
          result.current.setCurrent(newPage);
        }}
        totalPages={3}
        onPageItemProps={page => ({ text: `page-${page}` })}
      />,
    );
    expect(getByText('Next')).toBeDisabled();

    await act(async () => {
      await user.click(getByText('Next'));
    });

    rerender(
      <Pagination
        current={result.current.current}
        onChange={newPage => {
          result.current.setCurrent(newPage);
        }}
        totalPages={3}
        onPageItemProps={page => ({ text: `page-${page}` })}
      />,
    );
    expect(getByRole('button', { current: 'page' })).toHaveTextContent('page-3');
  });

  it('goes to the previous page when the back button is clicked', async () => {
    const { result } = renderHook(() => {
      const [current, setCurrent] = useState(2);
      return { current, setCurrent };
    });

    const { getByRole, getByText, rerender } = render(
      <Pagination
        current={result.current.current}
        onChange={newPage => {
          result.current.setCurrent(newPage);
        }}
        totalPages={3}
        onPageItemProps={page => ({ text: `page-${page}` })}
      />,
    );
    await act(async () => {
      await user.click(getByText('Back'));
    });

    rerender(
      <Pagination
        current={result.current.current}
        onChange={newPage => {
          result.current.setCurrent(newPage);
        }}
        totalPages={3}
        onPageItemProps={page => ({ text: `page-${page}` })}
      />,
    );
    expect(getByRole('button', { current: 'page' })).toHaveTextContent('page-1');
  });

  it('does not go to the previous page when it is the first page', async () => {
    const { result } = renderHook(() => {
      const [current, setCurrent] = useState(1);
      return { current, setCurrent };
    });

    const { getByRole, getByText, rerender } = render(
      <Pagination
        current={result.current.current}
        onChange={newPage => {
          result.current.setCurrent(newPage);
        }}
        totalPages={3}
        onPageItemProps={page => ({ text: `page-${page}` })}
      />,
    );
    expect(getByText('Back')).toBeDisabled();

    await act(async () => {
      await user.click(getByText('Back'));
    });

    rerender(
      <Pagination
        current={result.current.current}
        onChange={newPage => {
          result.current.setCurrent(newPage);
        }}
        totalPages={3}
        onPageItemProps={page => ({ text: `page-${page}` })}
      />,
    );
    expect(getByRole('button', { current: 'page' })).toHaveTextContent('page-1');
  });

  it('goes to the first page when the option infinite is true and click next on the last position', async () => {
    const { result } = renderHook(() => {
      const [current, setCurrent] = useState(3);
      return { current, setCurrent };
    });

    const { getByRole, getByText, rerender } = render(
      <Pagination
        current={result.current.current}
        infinite
        onChange={newPage => {
          result.current.setCurrent(newPage);
        }}
        totalPages={3}
        onPageItemProps={page => ({ text: `page-${page}` })}
      />,
    );

    await act(async () => {
      await user.click(getByText('Next'));
    });

    rerender(
      <Pagination
        current={result.current.current}
        infinite
        onChange={newPage => {
          result.current.setCurrent(newPage);
        }}
        totalPages={3}
        onPageItemProps={page => ({ text: `page-${page}` })}
      />,
    );
    expect(getByRole('button', { current: 'page' })).toHaveTextContent('page-1');
  });

  it('goes to the last page when the option infinite is true and click back on the first position', async () => {
    const { result } = renderHook(() => {
      const [current, setCurrent] = useState(1);
      return { current, setCurrent };
    });

    const { getByRole, getByText, rerender } = render(
      <Pagination
        current={result.current.current}
        infinite
        onChange={newPage => {
          result.current.setCurrent(newPage);
        }}
        totalPages={3}
        onPageItemProps={page => ({ text: `page-${page}` })}
      />,
    );

    await act(async () => {
      await user.click(getByText('Back'));
    });

    rerender(
      <Pagination
        current={result.current.current}
        infinite
        onChange={newPage => {
          result.current.setCurrent(newPage);
        }}
        totalPages={3}
        onPageItemProps={page => ({ text: `page-${page}` })}
      />,
    );
    expect(getByRole('button', { current: 'page' })).toHaveTextContent('page-3');
  });

  describe('should render the pages according to siblingCount and boundaryCount', () => {
    it('should render 8 buttons with current={1} siblingCount={2} and boundaryCount={0} with 20 pages', () => {
      render(
        <Pagination
          current={1}
          siblingCount={2}
          boundaryCount={0}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChange={() => {}}
          totalPages={20}
          onPageItemProps={page => ({ text: `page-${page}` })}
        />,
      );
      expect(screen.getAllByRole('button').length).toBe(8);
    });

    it('should render 7 buttons with current={1} siblingCount={2} and boundaryCount={0} with 20 pages', () => {
      render(
        <Pagination
          current={10}
          siblingCount={2}
          boundaryCount={0}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChange={() => {}}
          totalPages={20}
          onPageItemProps={page => ({ text: `page-${page}` })}
        />,
      );
      expect(screen.getAllByRole('button').length).toBe(7);
    });

    it('should render 10 buttons with current={1} siblingCount={2} and boundaryCount={1} with 20 pages', () => {
      render(
        <Pagination
          current={1}
          siblingCount={2}
          boundaryCount={1}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChange={() => {}}
          totalPages={20}
          onPageItemProps={page => ({ text: `page-${page}` })}
        />,
      );
      expect(screen.getAllByRole('button').length).toBe(10);
    });

    it('should render 9 buttons with current={10} siblingCount={2} and boundaryCount={1} with 20 pages', () => {
      render(
        <Pagination
          current={10}
          siblingCount={2}
          boundaryCount={1}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChange={() => {}}
          totalPages={20}
          onPageItemProps={page => ({ text: `page-${page}` })}
        />,
      );
      expect(screen.getAllByRole('button').length).toBe(9);
    });

    it('should render 10 buttons with current={20} siblingCount={2} and boundaryCount={1} with 20 pages', () => {
      render(
        <Pagination
          current={20}
          siblingCount={2}
          boundaryCount={1}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChange={() => {}}
          totalPages={20}
          onPageItemProps={page => ({ text: `page-${page}` })}
        />,
      );
      expect(screen.getAllByRole('button').length).toBe(10);
    });

    it('should render 12 buttons with current={1} siblingCount={2} and boundaryCount={2} with 20 pages', () => {
      render(
        <Pagination
          current={20}
          siblingCount={2}
          boundaryCount={2}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChange={() => {}}
          totalPages={20}
          onPageItemProps={page => ({ text: `page-${page}` })}
        />,
      );
      expect(screen.getAllByRole('button').length).toBe(12);
    });

    it('should render 11 buttons with current={10} siblingCount={2} and boundaryCount={1} with 20 pages', () => {
      render(
        <Pagination
          current={10}
          siblingCount={2}
          boundaryCount={2}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChange={() => {}}
          totalPages={20}
          onPageItemProps={page => ({ text: `page-${page}` })}
        />,
      );
      expect(screen.getAllByRole('button').length).toBe(11);
    });
  });

  describe('usePagination hook', () => {
    it('goes to next page', () => {
      const { result, rerender } = renderHook(() =>
        usePagination({
          totalPages: 3,
        }),
      );
      expect(result.current.currentPage).toBe(1);
      act(() => result.current.next());
      rerender();

      expect(result.current.currentPage).toBe(2);
      act(() => result.current.next());
      rerender();

      expect(result.current.currentPage).toBe(3);
      act(() => result.current.next());
      rerender();

      expect(result.current.currentPage).toBe(3);
    });

    it('goes to the previous when previous is invoked', () => {
      const { result, rerender } = renderHook(() =>
        usePagination({
          totalPages: 3,
          defaultCurrent: 3,
        }),
      );
      expect(result.current.currentPage).toBe(3);
      act(() => result.current.previous());
      rerender();

      expect(result.current.currentPage).toBe(2);
      act(() => result.current.previous());
      rerender();

      expect(result.current.currentPage).toBe(1);
      act(() => result.current.previous());
      rerender();

      expect(result.current.currentPage).toBe(1);
    });

    describe('when infinite option is ticked', () => {
      it('goes to the first page when next() is invoked on the last page', () => {
        const { result, rerender } = renderHook(() =>
          usePagination({
            totalPages: 3,
            defaultCurrent: 3,
            infinite: true,
          }),
        );
        expect(result.current.currentPage).toBe(3);
        act(() => result.current.next());
        rerender();

        expect(result.current.currentPage).toBe(1);
      });

      it('goes to the last page when previous() is invoked on the first page', () => {
        const { result, rerender } = renderHook(() =>
          usePagination({
            totalPages: 3,
            defaultCurrent: 1,
            infinite: true,
          }),
        );
        expect(result.current.currentPage).toBe(1);
        act(() => result.current.previous());
        rerender();

        expect(result.current.currentPage).toBe(3);
      });
    });
  });
});
