'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../../pictogram.component.js';
import { fill } from '../../pictogram.styles.js';
import { type PictogramProps } from '../../pictogram.types.js';

export function TelephoneCallPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Telephone call',
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
          d="M55.496 43.43l-3-.07c.003-.12.004-.24.004-.36 0-9.127-6.988-16.623-15.905-17.428l-.07-3.016C47.135 23.336 55.5 32.19 55.5 43c0 .144-.001.287-.004.43zm17.994.419l-2.998-.07c.005-.26.008-.519.008-.779 0-19.213-15.263-34.861-34.325-35.48l-.07-3.004C56.857 5.1 73.5 22.106 73.5 43c0 .284-.003.566-.01.849z"
        />
        <path
          className={fill({ mode, highlight: true })}
          d="M64.493 43.64l-2.999-.07c.004-.19.006-.38.006-.57 0-14.171-11.123-25.744-25.115-26.464l-.07-3.007C51.997 14.216 64.5 27.149 64.5 43c0 .214-.002.427-.007.64z"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M55.791 62.729l-2.258 2.186a31.692 31.692 0 0 1-2.525 2.191l-.119.106c-.346.348-1.563 1.068-3.698 1.309-4.269.484-13.38-.759-26.259-14.523C7.076 39.203 8.022 29.892 9.072 26.576a6.59 6.59 0 0 1 2.098-3.082l3.627-3.495a.65.65 0 0 1 .926.014l9.156 9.535-.002.011.441.461c.235.243.295.669-.007.961l-4.772 4.58-.004.002c-2.805 2.706.096 6.446 1.652 8.454 2.44 3.16 5.56 6.41 8.78 9.153 3.377 2.872 5.576 4.591 7.683 4.361.754-.086 1.44-.424 2.018-.986l4.873-4.518a.662.662 0 0 1 .39-.183.626.626 0 0 1 .534.197l9.338 9.724a.68.68 0 0 1-.012.964m-2.516-12.414a3.08 3.08 0 0 0-2.12-.955l-5.163-.008a2.673 2.673 0 0 0-.34.007 3.172 3.172 0 0 0-1.826.851l-3.52 3.266c-.925-.695-1.888-1.504-2.717-2.209-3.094-2.634-6.084-5.751-8.423-8.78-2.217-2.86-2.748-4.297-1.895-5.123 3.042-2.987 4.804-4.727 5.286-5.219.724-.739.61-2.29-.007-3.304L22.523 18.276c-.584-.6-1.36-.92-2.177-.943-3.566-.007-5.382-.007-5.446 0a3.164 3.164 0 0 0-1.843.872l-3.47 3.356c-1.27 1.258-2.374 2.608-2.897 4.26-3.55 11.214 7.501 24.636 12.417 29.885 12.13 12.962 21.383 15.395 26.617 15.395h5c.644 0 1.23-.037 1.75-.096 2.192-.247 4.1-.982 5.128-1.97.922-.722 3.872-3.381 5.126-4.717a3.196 3.196 0 0 0 .176-3.927l-9.629-10.076z"
        />
      </g>
    </Pictogram>
  );
}
