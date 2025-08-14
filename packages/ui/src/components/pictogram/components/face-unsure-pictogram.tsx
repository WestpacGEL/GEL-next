'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../pictogram.component.js';
import { fill } from '../pictogram.styles.js';
import { type PictogramProps } from '../pictogram.types.js';

export function FaceUnsurePictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Face looking unsure',
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
          className={fill({ mode, outline: true })}
          d="M38.268 68.037C21.854 68.037 8.5 54.683 8.5 38.27S21.854 8.502 38.268 8.502c16.413 0 29.768 13.353 29.768 29.767S54.68 68.037 38.268 68.037m27.169-47.142C59.697 11.947 49.666 6 38.267 6 20.477 6 6 20.475 6 38.268a32.08 32.08 0 0 0 6.266 19.078C18.006 66.3 28.039 72.25 39.443 72.25c17.792 0 32.266-14.476 32.266-32.267a32.095 32.095 0 0 0-6.272-19.088"
        />
        <path
          className={fill({ mode, highlight: true })}
          d="M51.828 54.565c-.034-.028-4.015-3.326-12.934-4.919-8.92-1.55-13.786.19-13.835.207l-1.06-2.808c.225-.084 5.594-2.059 15.416-.353 9.82 1.753 14.19 5.445 14.372 5.602l-1.96 2.271z"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M29.224 31.67a3.08 3.08 0 1 1-6.16 0 3.08 3.08 0 0 1 6.16 0m23.998 0a3.08 3.08 0 1 1-6.162 0 3.08 3.08 0 0 1 6.162 0"
        />
      </g>
    </Pictogram>
  );
}
