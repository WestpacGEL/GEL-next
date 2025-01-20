'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../../pictogram.component.js';
import { fill } from '../../pictogram.styles.js';
import { type PictogramProps } from '../../pictogram.types.js';

export function NestEggPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Nest egg',
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
          d="M40.592 37.265a3.36 3.36 0 0 1-1.562 1.037v-6.26c.752.278 1.322.636 1.688 1.085.443.543.664 1.19.664 1.942 0 .842-.263 1.572-.79 2.196M34.47 25.12a2.83 2.83 0 0 1-.538-1.657c0-.651.197-1.244.588-1.783.35-.48.813-.827 1.377-1.058v5.633c-.623-.3-1.104-.675-1.427-1.135m9.572 4.878c-.915-1.087-2.59-1.982-5.01-2.691v-6.432c.791.51 1.312 1.3 1.527 2.403l4.255-.555c-.29-1.682-.963-3.024-2.017-4.028-.953-.907-2.219-1.473-3.766-1.735v-1.756h-3.135v1.7c-1.829.223-3.312.924-4.429 2.128-1.16 1.249-1.74 2.794-1.74 4.633 0 1.817.512 3.362 1.538 4.634.993 1.233 2.54 2.158 4.631 2.786v6.996c-.524-.294-1.007-.72-1.444-1.295-.493-.651-.829-1.425-1.009-2.322l-4.39.47c.337 2.21 1.11 3.92 2.321 5.132 1.166 1.166 2.68 1.868 4.522 2.13v3.1h3.135v-3.233c1.95-.366 3.497-1.185 4.631-2.47 1.227-1.39 1.843-3.1 1.843-5.13 0-1.816-.49-3.304-1.464-4.465"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M49.556 64.324c2.018 0 3.885-.075 5.596-.192-6.676 3.652-20.474 8.463-35.31-2.565 2.579-.056 5.033-.165 7.378-.316 8.307 2.347 16.015 3.073 22.336 3.073m-31.17-26.562c0-15.644 8.622-28.372 19.219-28.372 10.597 0 19.219 12.728 19.219 28.372 0 3.217-.395 6.161-1.1 8.826-9.013 1.581-21.531 2.182-36.545-1.23-.512-2.335-.792-4.868-.792-7.596M71.08 56.94l-.6-2.428c-.142.036-6.325 1.502-15.165 1.731 10.146-3.373 14.23-7.142 14.538-7.438l-1.731-1.802c-.088.084-5.924 5.466-21.545 9.026-8.59-.66-18.345-2.81-27.242-8.046 8.022 1.791 15.319 2.471 21.76 2.471 19.137 0 30.737-5.962 31.463-6.346l-1.17-2.21c-.086.046-3.055 1.558-8.38 3.047.199-1.567.306-3.155.306-4.742 0-17.078-11.9-32.199-23.801-33.164-1.866-.12-3.887-.022-7.257 1.082-9.397 3.394-16.37 15.518-16.37 29.918 0 2.248.21 4.495.615 6.681a112.816 112.816 0 0 1-10.648-3.288L5 43.782c2.449.89 4.843 1.668 7.187 2.355 8.222 6.478 17.602 9.81 26.427 11.385-3.38.51-7.104.921-11.186 1.198a76.34 76.34 0 0 1-18.182-7.949l-1.29 2.141a78.61 78.61 0 0 0 12.609 6.13c-3.157.083-6.483.095-10.022.007l-.063 2.5c1.792.045 3.533.066 5.228.066 7.924 6.542 16.497 9.175 23.296 9.175 11.484 0 20.09-6.062 21.639-7.228 3.368-.478 5.342-1.008 5.416-1.028l-.673-2.408c-.19.052-13.14 3.52-30.233.407 4.418-.525 8.332-1.212 11.794-1.989 2.123.148 4.18.22 6.128.22 10.377 0 17.847-1.785 18.006-1.824z"
        />
      </g>
    </Pictogram>
  );
}
