'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../../pictogram.component.js';
import { fill } from '../../pictogram.styles.js';
import { type PictogramProps } from '../../pictogram.types.js';

export function Number5Pictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Number 5',
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
          d="M29.28 45.165l5.332-.552c.152 1.206.603 2.161 1.352 2.866.749.705 1.612 1.057 2.589 1.057 1.118 0 2.064-.454 2.838-1.36.775-.909 1.16-2.277 1.16-4.105 0-1.715-.382-3-1.151-3.856-.767-.858-1.767-1.286-3-1.286-1.535 0-2.912.68-4.131 2.038l-4.342-.628 2.743-14.53h14.148v5.008H36.725l-.838 4.742c1.194-.597 2.413-.896 3.657-.896 2.374 0 4.386.864 6.037 2.59 1.65 1.727 2.475 3.968 2.475 6.723 0 2.297-.667 4.348-2 6.15-1.815 2.464-4.335 3.695-7.56 3.695-2.576 0-4.678-.692-6.303-2.076-1.625-1.384-2.596-3.243-2.913-5.58"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M38.268 68.037C21.855 68.037 8.5 54.683 8.5 38.268c0-16.414 13.355-29.766 29.768-29.766s29.768 13.352 29.768 29.766c0 16.415-13.355 29.769-29.768 29.769m0-62.037C20.476 6 6 20.474 6 38.267a32.09 32.09 0 0 0 6.266 19.079C18.006 66.3 28.039 72.25 39.443 72.25c17.792 0 32.266-14.476 32.266-32.268a32.106 32.106 0 0 0-6.271-19.088C59.697 11.947 49.666 6 38.268 6z"
        />
      </g>
    </Pictogram>
  );
}
