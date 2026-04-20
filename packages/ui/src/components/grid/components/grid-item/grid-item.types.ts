import { HTMLAttributes } from 'react';

import { ResponsiveVariants } from '../../../../types/responsive-variants.types.js';

import { type ROW_SPAN_MAP, type SPAN_MAP, type START_MAP } from './grid-item.styles.js';

type SpanValue = keyof (typeof SPAN_MAP)['initial'];
type RowSpanValue = keyof (typeof ROW_SPAN_MAP)['initial'];
type StartValue = keyof (typeof START_MAP)['initial'];

export type GridItemProps = {
  /**
   * Controls height of item based on amount of grid spaces to cover
   */
  rowSpan?: ResponsiveVariants<RowSpanValue>;
  /**
   * Controls width of item based on amount of grid spaces to cover
   */
  span?: ResponsiveVariants<SpanValue>;
  /**
   * Position item should start in grid
   */
  start?: ResponsiveVariants<StartValue>;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;
