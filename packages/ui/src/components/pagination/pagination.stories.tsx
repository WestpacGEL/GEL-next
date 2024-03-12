import { action } from '@storybook/addon-actions';
import { type Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '../icon/index.js';
import { Button } from '../index.js';

import { Pagination } from './pagination.component.js';
import { usePagination } from './pagination.hooks.js';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;

/**
 * > Button usage example
 */
export const Default = () => {
  const [current, setCurrent] = useState(1);
  useEffect(() => {
    setCurrent(1);
  }, []);

  return (
    <Pagination
      pages={[
        {
          text: '1',
        },
        {
          text: '2',
        },
        {
          text: '3',
        },
      ]}
      onChange={value => {
        setCurrent(value);
        action('onChange')(value);
      }}
      current={current}
    />
  );
};

/**
 * > Link usage example
 */
export const AsLink: unknown = {
  args: {
    current: 1,
    onChange: undefined,
    pages: [
      {
        text: '1',
        href: '#page-1',
      },
      {
        text: '2',
        href: '#page-2',
      },
      {
        text: '3',
        href: '#page-3',
      },
    ],
  },
};

/**
 * > Using useState as example
 */
export const State = () => {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      current={page}
      onChange={changedPage => {
        setPage(changedPage);
      }}
      pages={[{ text: '1' }, { text: '2' }, { text: '3' }]}
    />
  );
};

/**
 * > Using useState as example
 */
export const InfiniteState = () => {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      current={page}
      infinite
      onChange={changedPage => {
        setPage(changedPage);
      }}
      pages={[{ text: '1' }, { text: '2' }, { text: '3' }]}
    />
  );
};

/**
 * > Using custom back and next label
 */
export const CustomBackAndNextLabel = () => {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      current={page}
      backLabel="Custom back"
      nextLabel="Custom next"
      onChange={changedPage => {
        setPage(changedPage);
      }}
      pages={[{ text: '1' }, { text: '2' }, { text: '3' }]}
    />
  );
};

/**
 * > Using use pagination hook
 */
export const UsePagination = () => {
  const { pages, currentPage, setCurrentPage } = usePagination({
    pages: [{ text: '1' }, { text: '2' }, { text: '3' }],
  });

  return (
    <Pagination
      current={currentPage}
      backLabel="Custom back"
      nextLabel="Custom next"
      infinite
      onChange={changedPage => {
        setCurrentPage(changedPage);
      }}
      pages={pages}
    />
  );
};

/**
 * > Using use pagination hook with other components
 */
export const UsePaginationDifferentComponents = () => {
  const { next, previous, selectedPage } = usePagination({
    pages: [{ text: 'Page 1' }, { text: 'Page 2' }, { text: 'Page 3' }],
    infinite: true,
  });

  return (
    <div className="flex w-[15.625rem] items-center justify-between">
      <Button look="link" iconAfter={ArrowLeftIcon} onClick={previous} />
      <h4>{selectedPage.text}</h4>
      <Button look="link" iconAfter={ArrowRightIcon} onClick={next} />
    </div>
  );
};
