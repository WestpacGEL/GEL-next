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
  argTypes: {
    backLabel: {
      description: 'Back label',
      type: { name: 'string' },
      defaultValue: 'Back',
    },
    boundaryCount: {
      description: 'boundaryCount',
      type: { name: 'number' },
      defaultValue: 1,
    },
    current: {
      description: 'Current page',
      type: { name: 'number' },
    },
    infinite: {
      description: 'Carousel feature',
      type: { name: 'boolean' },
      defaultValue: false,
    },
    linkComponent: {
      description: 'Link component to render',
    },
    nextLabel: {
      description: 'Next label',
      type: { name: 'string' },
      defaultValue: 'Next',
    },
    siblingCount: {
      description: 'siblingCount',
      type: { name: 'number' },
      defaultValue: 2,
    },
    tag: {
      description: 'Tag to render',
    },
  },
};

export default meta;

/**
 * > Button usage example
 */
export const Default = (props: any) => {
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
        {
          text: '4',
        },
        {
          text: '5',
        },
        {
          text: '6',
        },
        {
          text: '7',
        },
        {
          text: '8',
        },
        {
          text: '9',
        },
        {
          text: '10',
        },
        {
          text: '11',
        },
        {
          text: '12',
        },
        {
          text: '13',
        },
        {
          text: '14',
        },
        {
          text: '15',
        },
        {
          text: '16',
        },
        {
          text: '17',
        },
        {
          text: '18',
        },
        {
          text: '19',
        },
      ]}
      {...props}
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
      {
        text: '4',
        href: '#page-4',
      },
      {
        text: '5',
        href: '#page-5',
      },
      {
        text: '6',
        href: '#page-6',
      },
      {
        text: '7',
        href: '#page-7',
      },
      {
        text: '8',
        href: '#page-8',
      },
      {
        text: '9',
        href: '#page-9',
      },
      {
        text: '10',
        href: '#page-10',
      },
      {
        text: '21',
        href: '#page-21',
      },
      {
        text: '22',
        href: '#page-22',
      },
      {
        text: '23',
        href: '#page-23',
      },
      {
        text: '24',
        href: '#page-24',
      },
      {
        text: '25',
        href: '#page-25',
      },
      {
        text: '26',
        href: '#page-26',
      },
      {
        text: '27',
        href: '#page-27',
      },
      {
        text: '28',
        href: '#page-28',
      },
      {
        text: '29',
        href: '#page-29',
      },
      {
        text: '30',
        href: '#page-30',
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
