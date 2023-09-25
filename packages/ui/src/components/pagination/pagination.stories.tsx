import { action } from '@storybook/addon-actions';
import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Pagination } from './pagination.component.js';

const meta: Meta<typeof Pagination> = {
  title: 'Example/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Button usage example
 */
export const DefaultStory: any = {
  args: {
    current: 1,
    onChange: action('onChange'),
    pages: [
      {
        text: '1',
      },
      {
        text: '2',
      },
      {
        text: '3',
      },
    ],
  },
};

/**
 * > Link usage example
 */
export const AsLinkStory: any = {
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
export const ExampleWithState = () => {
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
export const ExampleWithInfiniteState = () => {
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
export const ExampleWithCustomBackAndNextLabel = () => {
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
