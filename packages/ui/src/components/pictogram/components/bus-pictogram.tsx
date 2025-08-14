'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../pictogram.component.js';
import { fill } from '../pictogram.styles.js';
import { type PictogramProps } from '../pictogram.types.js';

export function BusPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Bus',
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
          d="M21.356 24.727h-8.584a1.06 1.06 0 0 0-1.02.772l-2.356 8.42a22.167 22.167 0 0 0-.82 5.974v3.933c0 .838.933 1.35 1.632.887 2.423-1.611 5.39-4.302 11.856-4.59.572-.025 1.03-.476 1.03-1.048V25.78c0-.584-.473-1.053-1.057-1.053"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M28.352 37.53h8.572V27.267h-8.572V37.53zm11.072 0h8.424V27.267h-8.424V37.53zm10.924 0h8.359V27.267h-8.359V37.53zm17.667 14.13c-.911-2.394-3.224-4.103-5.934-4.103s-5.023 1.71-5.934 4.103H21.461c-.911-2.394-3.223-4.103-5.933-4.103s-5.023 1.71-5.934 4.103H5.5V38.946c0-2.756.462-5.472 1.375-8.074l1.949-5.56A5.703 5.703 0 0 1 14.2 21.5h53.77c1.004 0 1.821.816 1.821 1.82v1.448h-42.66l-1.279.03v13.951l.029 1.28h43.91V51.66h-1.776zm-9.787 2.25a3.858 3.858 0 0 1 3.853-3.853 3.857 3.857 0 0 1 3.853 3.853 3.858 3.858 0 0 1-3.853 3.854 3.858 3.858 0 0 1-3.853-3.854zm-46.553 0a3.857 3.857 0 0 1 3.853-3.853 3.858 3.858 0 0 1 3.853 3.853 3.858 3.858 0 0 1-3.853 3.854 3.858 3.858 0 0 1-3.853-3.854zm49.533-16.38h8.583V27.267h-8.583V37.53zM66.971 19H14.2a8.207 8.207 0 0 0-7.736 5.485l-1.949 5.56A26.856 26.856 0 0 0 3 38.946v14.847h.017a.827.827 0 0 0 .416.663l2.511 1.423c.265.151.566.23.871.23h2.76c.897 2.422 3.223 4.155 5.953 4.155 2.729 0 5.055-1.733 5.952-4.155h34.648c.898 2.422 3.224 4.155 5.953 4.155 2.73 0 5.055-1.733 5.953-4.155h7.197a.407.407 0 0 0 .408-.408V25.27c0-2.274-4.241-5.829-6.699-6.15a26.397 26.397 0 0 0-1.969-.12z"
        />
      </g>
    </Pictogram>
  );
}
