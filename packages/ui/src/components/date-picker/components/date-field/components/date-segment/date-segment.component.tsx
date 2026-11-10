'use client';

import React, { ForwardedRef, forwardRef } from 'react';
import { mergeProps, useDateSegment, useFocusRing, useObjectRef } from 'react-aria';

import { styles as dateSegmentStyles } from './date-segment.styles.js';
import { DateSegmentProps } from './date-segment.types.js';

/**
 * @private
 */
function BaseDateSegment(
  { segment, state, separator, ...props }: DateSegmentProps,
  forwardedRef: ForwardedRef<HTMLSpanElement>,
) {
  const ref = useObjectRef(forwardedRef);
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

export const DateSegment = forwardRef(BaseDateSegment);
DateSegment.displayName = 'DateSegment';
