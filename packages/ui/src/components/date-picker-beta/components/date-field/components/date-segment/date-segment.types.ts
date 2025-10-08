import { HTMLAttributes } from 'react';
import { DateFieldState, DateSegment } from 'react-stately';

export type DateSegmentProps = {
  segment: DateSegment;
  separator?: string;
  state: DateFieldState;
} & HTMLAttributes<Element>;
