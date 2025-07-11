'use client';

import React, { useRef } from 'react';
import { useDateSegment } from 'react-aria';

import { DateSegmentProps } from './date-segment.types.js';

export function DateSegment({ segment, state, ...props }: DateSegmentProps) {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <span
      {...props}
      {...segmentProps}
      ref={ref}
      className={`disabled:form-control-disabled placeholder:font-light placeholder:text-text-50 placeholder:opacity-100 ${segment.isPlaceholder ? 'placeholder' : ''}`}
    >
      {segment.text}
    </span>
  );
}
