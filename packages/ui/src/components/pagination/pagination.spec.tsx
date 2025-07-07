import { act, render, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { Pagination } from './pagination.component.js';
import { usePagination } from './pagination.hooks.js';
import { styles } from './pagination.styles.js';

describe('Pagination', () => {
  const user = userEvent.setup();

  it('renders the component as link', () => {
    const { container } = render(
      <Pagination
        current={1}
        pages={[
          { href: '#page1', text: 'page-1' },
          { href: '#page2', text: 'page-2' },
          { href: '#page3', text: 'page-3' },
        ]}
      />,
    );
    expect(container).toBeInTheDocument();
  });
  it('renders the component as data driven', () => {
    const fn = vitest.fn();
    const { container } = render(
      <Pagination current={1} onChange={fn} pages={[{ text: 'page-1' }, { text: 'page-2' }, { text: 'page-3' }]} />,
    );
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const { base, ul } = styles();
    // TODO: use some variants for test
    expect(base()).toBe('flex flex-col items-center');
    expect(ul()).toBe('flex overflow-hidden');
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
        pages={[{ text: 'page-1' }, { text: 'page-2' }, { text: 'page-3' }]}
      />,
    );
    expect(getByRole('button', { current: 'page' })).toHaveTextContent('page-1');
    await act(async () => {
      await user.click(getByText('page-2'));
    });

    rerender(
      <Pagination
        current={result.current.current}
        onChange={newPage => {
          result.current.setCurrent(newPage);
        }}
        pages={[{ text: 'page-1' }, { text: 'page-2' }, { text: 'page-3' }]}
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
        pages={[{ text: 'page-1' }, { text: 'page-2' }, { text: 'page-3' }]}
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
        pages={[{ text: 'page-1' }, { text: 'page-2' }, { text: 'page-3' }]}
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
        pages={[{ text: 'page-1' }, { text: 'page-2' }, { text: 'page-3' }]}
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
        pages={[{ text: 'page-1' }, { text: 'page-2' }, { text: 'page-3' }]}
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
        pages={[{ text: 'page-1' }, { text: 'page-2' }, { text: 'page-3' }]}
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
        pages={[{ text: 'page-1' }, { text: 'page-2' }, { text: 'page-3' }]}
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
        pages={[{ text: 'page-1' }, { text: 'page-2' }, { text: 'page-3' }]}
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
        pages={[{ text: 'page-1' }, { text: 'page-2' }, { text: 'page-3' }]}
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
        pages={[{ text: 'page-1' }, { text: 'page-2' }, { text: 'page-3' }]}
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
        pages={[{ text: 'page-1' }, { text: 'page-2' }, { text: 'page-3' }]}
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
        pages={[{ text: 'page-1' }, { text: 'page-2' }, { text: 'page-3' }]}
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
        pages={[{ text: 'page-1' }, { text: 'page-2' }, { text: 'page-3' }]}
      />,
    );
    expect(getByRole('button', { current: 'page' })).toHaveTextContent('page-3');
  });

  describe('usePagination hook', () => {
    it('goes to next page', () => {
      const { result, rerender } = renderHook(() =>
        usePagination({
          pages: [{ text: 'page-1' }, { text: 'page-2' }, { text: 'page-3' }],
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
          pages: [{ text: 'page-1' }, { text: 'page-2' }, { text: 'page-3' }],
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
            pages: [{ text: 'page-1' }, { text: 'page-2' }, { text: 'page-3' }],
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
            pages: [{ text: 'page-1' }, { text: 'page-2' }, { text: 'page-3' }],
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
