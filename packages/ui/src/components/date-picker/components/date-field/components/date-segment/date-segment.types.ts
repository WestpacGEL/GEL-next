import { HTMLAttributes } from 'react';
import { DateFieldState, DateSegment } from 'react-stately';

export type DateSegmentProps = { segment: DateSegment; state: DateFieldState } & HTMLAttributes<Element>;
