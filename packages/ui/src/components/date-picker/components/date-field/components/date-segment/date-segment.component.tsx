'use client';

import React, { useRef } from 'react';
import { mergeProps, useDateSegment, useFocusRing } from 'react-aria';

import { styles as dateSegmentStyles } from './date-segment.styles.js';
import { DateSegmentProps } from './date-segment.types.js';

export function DateSegment({ segment, state, ...props }: DateSegmentProps) {
  const ref = useRef(null);
  const { focusProps, isFocusVisible } = useFocusRing();
  const { segmentProps } = useDateSegment(segment, state, ref);
  const styles = dateSegmentStyles({
    isFocusVisible,
    isPlaceholder: segment.isPlaceholder,
    isSeparator: segmentProps.role !== 'spinbutton',
  });
  return (
    <span {...props} {...mergeProps(focusProps, segmentProps)} ref={ref} className={styles}>
      {segment.text}
    </span>
  );
}
