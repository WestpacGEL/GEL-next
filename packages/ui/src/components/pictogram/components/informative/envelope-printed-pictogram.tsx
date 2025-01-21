'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../../pictogram.component.js';
import { fill } from '../../pictogram.styles.js';
import { type PictogramProps } from '../../pictogram.types.js';

export function EnvelopePrintedPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Printed envelope',
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
        <polygon
          className={fill({ mode, highlight: true })}
          points="22.646 37.949 54.308 37.949 54.308 34.949 22.646 34.949"
        />
        <polygon
          className={fill({ mode, highlight: true })}
          points="22.646 31.473 54.308 31.473 54.308 28.473 22.646 28.473"
        />
        <polygon
          className={fill({ mode, highlight: true })}
          points="22.646 24.497 43.822 24.497 43.822 21.497 22.646 21.497"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M63.614 64.331c0 .024-.006.048-.007.072L48.705 50.926c.47-.414.946-.836 1.462-1.296 3.16-2.815 5.34-4.822 6.847-6.275l6.6-5.85v26.826zM61.8 66.143H14.313c-.09 0-.176-.013-.262-.026l14.798-13.385c3.053 2.826 4.762 4.271 5.738 4.994.194.15.39.292.596.411.258.163.434.247.56.288a4.884 4.884 0 0 0 1.926.41c.435 0 .866-.08 1.293-.199a1.15 1.15 0 0 0 .25-.072 5.255 5.255 0 0 0 1.84-1.06l1.176-1.042c1.1-.885 2.58-2.128 4.587-3.876l14.989 13.557H61.8zm-49.3-28.74l8.507 7.85a392.194 392.194 0 0 0 6.008 5.769L12.5 64.15V37.402zm.542-4.024l2.552-2.512v5.988l-2.99-2.759c.09-.268.234-.517.438-.717zm5.052-15.637c0-.328.267-.595.595-.595h38.589c.329 0 .595.267.595.595v21.16c-1.602 2.04-14.106 13.25-18.298 16.491-.623.483-1.4.713-2.187.663a3.224 3.224 0 0 1-1.838-.717c-3.82-3.11-15.956-14.716-17.456-16.775V17.742zm18.692-7.727c.35-.345.81-.517 1.27-.517.462 0 .922.172 1.272.517l4.709 4.632h-11.96l4.709-4.632zm23.587 20.708l2.7 2.657c.235.23.395.525.477.842l-3.177 2.815v-6.314zm0-3.509v-9.472a3.099 3.099 0 0 0-3.095-3.095h-9.675l-6.521-6.416c-1.668-1.64-4.382-1.643-6.05 0l-6.521 6.416h-9.822a3.099 3.099 0 0 0-3.095 3.095v9.616l-4.306 4.237A4.34 4.34 0 0 0 10 34.67v29.66c0 .766.218 1.474.568 2.098l-.061-.043s1.674 3.26 4.953 4.793c.559.257 1.073.294 1.69.294h47.488a4.318 4.318 0 0 0 4.313-4.315v-29.66a4.336 4.336 0 0 0-1.287-3.073l-7.291-7.209z"
        />
      </g>
    </Pictogram>
  );
}
