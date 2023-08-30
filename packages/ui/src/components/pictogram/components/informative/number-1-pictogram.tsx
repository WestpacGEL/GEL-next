import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../../pictogram.component.js';
import { fill } from '../../pictogram.styles.js';
import { type PictogramProps } from '../../pictogram.types.js';

export function Number1Pictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Number 1',
  copyrightYear = '2021',
  className,
  ...props
}: PictogramProps) {
  return (
    <Pictogram
      className={clsx('h-13 w-13', className)}
      viewBoxWidth={viewBoxWidth}
      viewBoxHeight={viewBoxHeight}
      aria-label={ariaLabel}
      copyrightYear={copyrightYear}
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <path
          className={fill({ mode, highlight: true })}
          d="M42.762 52.16h-5.35V31.994c-1.956 1.828-4.26 3.18-6.914 4.056v-4.857c1.397-.457 2.914-1.323 4.552-2.598 1.638-1.277 2.761-2.765 3.37-4.466h4.342V52.16z"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M38.268 68.037C21.855 68.037 8.5 54.683 8.5 38.269S21.855 8.502 38.268 8.502s29.768 13.353 29.768 29.767-13.355 29.768-29.768 29.768m27.17-47.142C59.697 11.947 49.666 6 38.268 6 20.476 6 6 20.475 6 38.268c0 7.133 2.331 13.73 6.266 19.078C18.006 66.3 28.039 72.25 39.443 72.25c17.792 0 32.266-14.475 32.266-32.267a32.101 32.101 0 0 0-6.271-19.088"
        />
      </g>
    </Pictogram>
  );
}
