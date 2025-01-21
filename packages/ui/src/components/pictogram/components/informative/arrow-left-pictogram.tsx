'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../../pictogram.component.js';
import { fill } from '../../pictogram.styles.js';
import { type PictogramProps } from '../../pictogram.types.js';

export function ArrowLeftPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Arrow left',
  copyrightYear = '2021',
  className,
  ...props
}: PictogramProps) {
  return (
    <Pictogram
      className={clsx('size-13', className)}
      viewBoxWidth={viewBoxWidth}
      viewBoxHeight={viewBoxHeight}
      aria-label={ariaLabel}
      copyrightYear={copyrightYear}
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <path
          className={fill({ mode, highlight: true })}
          d="M37.086 27.045l-9.402 9.08 26.606.465-.06 3.5-26.608-.465 9.08 9.403-2.397 2.316-11.283-11.686a2.637 2.637 0 0 1 .065-3.727l11.684-11.285 2.315 2.399z"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M38.268 68.037C21.854 68.037 8.5 54.683 8.5 38.27S21.854 8.502 38.268 8.502c16.413 0 29.767 13.353 29.767 29.767S54.681 68.037 38.268 68.037m27.168-47.142C59.696 11.947 49.666 6 38.268 6 20.476 6 6 20.475 6 38.268c0 7.133 2.331 13.73 6.266 19.078C18.006 66.3 28.039 72.25 39.442 72.25c17.792 0 32.267-14.475 32.267-32.267a32.09 32.09 0 0 0-6.273-19.088"
        />
      </g>
    </Pictogram>
  );
}
