import { type Meta, StoryFn } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { action } from 'storybook/actions';

import { ArrowLeftIcon, ArrowRightIcon } from '../icon/index.js';
import { Button, type PaginationProps } from '../index.js';

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
export const Default = (props: PaginationProps) => {
  const [current, setCurrent] = useState(1);
  useEffect(() => {
    setCurrent(1);
  }, []);

  return (
    <Pagination
      {...props}
      totalPages={20}
      onChange={value => {
        setCurrent(value);
        action('onChange')(value);
      }}
      current={current}
    />
  );
};

/**
 * > Responsive using totalPages
 */
export const ResponsiveTotalPages = (props: PaginationProps) => {
  const [current, setCurrent] = useState(1);
  useEffect(() => {
    setCurrent(1);
  }, []);

  return (
    <Pagination
      {...props}
      totalPages={20}
      siblingCount={{ initial: 0, sm: 2, md: 3 }}
      boundaryCount={{ initial: 0, sm: 2, md: 3 }}
      onChange={value => {
        setCurrent(value);
        action('onChange')(value);
      }}
      current={current}
    />
  );
};

/**
 * > Button usage example
 */
export const AsLinkOnTotalPages = () => {
  return <Pagination totalPages={20} onPageItemProps={page => ({ text: page, href: `#page-${page}` })} current={20} />;
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
 * > Using use pagination hook
 */
export const UsePagination = () => {
  const { currentPage, setCurrentPage, totalPages } = usePagination({
    totalPages: 3,
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
      totalPages={totalPages}
    />
  );
};

/**
 * > Using use pagination hook with other components
 */
export const UsePaginationDifferentComponents = () => {
  const { next, previous, currentPage } = usePagination({
    totalPages: 3,
    infinite: true,
  });

  return (
    <div className="flex w-[15.625rem] items-center justify-between">
      <Button look="link" iconAfter={ArrowLeftIcon} onClick={previous} />
      <h4>Page {currentPage}</h4>
      <Button look="link" iconAfter={ArrowRightIcon} onClick={next} />
    </div>
  );
};
