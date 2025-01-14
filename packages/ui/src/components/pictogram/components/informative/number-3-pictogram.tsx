'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../../pictogram.component.js';
import { fill } from '../../pictogram.styles.js';
import { type PictogramProps } from '../../pictogram.types.js';

export function Number3Pictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Number 3',
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
          d="M29.436 44.514l5.18-.628c.165 1.32.609 2.33 1.333 3.028.723.7 1.599 1.047 2.628 1.047 1.104 0 2.034-.419 2.789-1.257.756-.837 1.133-1.967 1.133-3.389 0-1.346-.362-2.412-1.085-3.199-.724-.788-1.606-1.18-2.647-1.18-.685 0-1.505.133-2.457.398l.591-4.36c1.447.038 2.552-.276 3.313-.942.762-.667 1.143-1.553 1.143-2.657 0-.939-.279-1.688-.838-2.248-.559-.557-1.302-.838-2.229-.838-.914 0-1.694.32-2.341.954-.648.634-1.041 1.56-1.181 2.78l-4.933-.839c.343-1.688.861-3.037 1.552-4.046.693-1.01 1.657-1.803 2.895-2.38 1.238-.578 2.625-.867 4.161-.867 2.628 0 4.735.838 6.322 2.514 1.308 1.371 1.962 2.92 1.962 4.646 0 2.45-1.34 4.405-4.019 5.865 1.6.343 2.879 1.112 3.837 2.305.959 1.193 1.439 2.634 1.439 4.322 0 2.45-.896 4.54-2.686 6.266s-4.017 2.59-6.683 2.59c-2.527 0-4.621-.728-6.284-2.18-1.664-1.455-2.628-3.355-2.895-5.705"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M38.268 68.037C21.855 68.037 8.5 54.683 8.5 38.268c0-16.414 13.355-29.766 29.768-29.766s29.768 13.352 29.768 29.766c0 16.415-13.355 29.769-29.768 29.769m27.17-47.143C59.697 11.946 49.666 6 38.268 6 20.476 6 6 20.474 6 38.267a32.09 32.09 0 0 0 6.266 19.079C18.006 66.3 28.039 72.25 39.443 72.25c17.792 0 32.266-14.476 32.266-32.268a32.106 32.106 0 0 0-6.271-19.088"
        />
      </g>
    </Pictogram>
  );
}
