'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../../pictogram.component.js';
import { fill } from '../../pictogram.styles.js';
import { type PictogramProps } from '../../pictogram.types.js';

export function AustraliaPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Australia',
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
          d="M8.5 38.269c0-16.414 13.354-29.767 29.768-29.767 16.413 0 29.767 13.353 29.767 29.767S54.68 68.037 38.268 68.037C21.854 68.037 8.5 54.683 8.5 38.269zm29.768-32.27C20.476 6 6 20.476 6 38.269a32.08 32.08 0 0 0 6.266 19.078C18.006 66.3 28.039 72.25 39.442 72.25c17.792 0 32.267-14.475 32.267-32.267a32.095 32.095 0 0 0-6.272-19.088C59.696 11.947 49.666 6 38.267 6z"
        />
        <path
          className={fill({ mode, highlight: true })}
          d="M54.931 38.297l.069 2.08-1.497 3.825-.814.47-1.768 3.96-2.925 1.208-.748-.873-1.427.47-2.79-1.878-.474-1.476-1.634-.338.817-2.077-1.428 1.876-.75-.468-.68-1.876-2.379-.874-4.147.874-1.36.803-.476.871-2.925.335-1.293 1.208-2.448-.47.274-2.279-.953-2.149-1.903-2.751.134-.737-.337-1.006L21 35.279l.406-.805 2.654-1.41 4.08-2.884.61-1.677 1.09-.135 1.428-2.415.883-.201 1.292 1.073 1.224.066-.273-.601 2.177-2.953 4.014.804.678-.2.342.4-1.496 2.35 4.825 2.55.818-2.147.135-2.417L46.907 23l.682 1.276.337 2.348 1.361.604.545 3.758 2.177 1.81.406 1.678.884.068 1.632 3.755zm-7.615 15.637l-.477-1.478-.27-1.341 1.222.535 1.36-.268v1.61l-.34.805-.409-.269-.406.472-.68-.066z"
        />
      </g>
    </Pictogram>
  );
}
