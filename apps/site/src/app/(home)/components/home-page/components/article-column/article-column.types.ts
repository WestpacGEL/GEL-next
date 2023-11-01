import { type ReactNode } from 'react';

import { type ArticleRowsProps } from '../../home-page.types';

export type ArticleColumnProps = {
  children: ReactNode;
  index: number;
  layout: ArticleRowsProps['layout'];
};
