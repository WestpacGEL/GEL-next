'use client';

import React, { useRef } from 'react';
import { mergeProps, useDateSegment, useFocusRing } from 'react-aria';

import { styles as dateSegmentStyles } from './date-segment.styles.js';
import { DateSegmentProps } from './date-segment.types.js';

/**
 * @private
 */
export function DateSegment({ segment, state, separator, ...props }: DateSegmentProps) {
  const ref = useRef(null);
  const { focusProps, isFocusVisible } = useFocusRing();
  const { segmentProps } = useDateSegment(segment, state, ref);
  const styles = dateSegmentStyles({
    isFocusVisible,
    isSeparator: segmentProps.role !== 'spinbutton',
  });
  return (
    <span {...props} {...mergeProps(focusProps, segmentProps)} ref={ref} className={styles}>
      {segment.type === 'literal' ? separator || segment.text : segment.text}
    </span>
  );
}
