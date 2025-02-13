import { clsx } from 'clsx';
import React from 'react';

import { Symbol } from '../../symbol.component.js';
import { type SymbolProps } from '../../symbol.types.js';

export function BOMLogo({
  'aria-label': ariaLabel = 'Bank of Melbourne',
  copyrightYear = '2025',
  viewBoxWidth = 150,
  viewBoxHeight = 39,
  className,
  ...props
}: SymbolProps) {
  return (
    <Symbol
      className={clsx('h-[39px] w-[150px]', className)}
      aria-label={ariaLabel}
      copyrightYear={copyrightYear}
      viewBoxWidth={viewBoxWidth}
      viewBoxHeight={viewBoxHeight}
      {...props}
    >
      <polygon points="0 0 0 13 6.5 6.5 " fill="#685AC0" />
      <polygon points="13 0 0 0 6.5 6.5 " fill="#A094FC" />
      <polygon points="13 13 13 0 6.5 6.5 " fill="#685AC0" />
      <polygon points="0 13 13 13 6.5 6.5 " fill="#20024E" />
      <polygon points="13 0 13 13 19.5 6.5 " fill="#C2BFEB" />
      <polygon points="26 0 13 0 19.5 6.5 " fill="#685AC0" />
      <polygon points="26 13 26 0 19.5 6.5 " fill="#20024E" />
      <polygon points="13 13 26 13 19.5 6.5 " fill="#685AC0" />
      <polygon points="13 13 13 26 19.5 19.5 " fill="#C2BFEB" />
      <polygon points="26 13 13 13 19.5 19.5 " fill="#A094FC" />
      <polygon points="26 26 26 13 19.5 19.5 " fill="#685AC0" />
      <polygon points="13 26 26 26 19.5 19.5 " fill="#20024E" />
      <polygon points="0 13 0 26 6.5 19.5 " fill="#685AC0" />
      <polygon points="13 13 0 13 6.5 19.5 " fill="#C2BFEB" />
      <polygon points="13 26 13 13 6.5 19.5 " fill="#20024E" />
      <polygon points="0 26 13 26 6.5 19.5 " fill="#A094FC" />
      <polygon points="13 26 13 39 19.5 32.5 " fill="#C2BFEB" />
      <polygon points="26 26 13 26 19.5 32.5 " fill="#685AC0" />
      <polygon points="13 26 0 26 6.5 32.5 " fill="#C2BFEB" />
      <polygon points="13 39 13 26 6.5 32.5 " fill="#20024E" />
      <path
        d="M33 15.5h1c0.4 0 0.7-0.4 0.7-0.8V2.5c0-0.4-0.4-0.8-0.7-0.8h-1V0.2h6.7c3.8 0 6.1 1.2 6.1 4.3 0 2.2-1.3 3.2-3.4 3.7v0.1c2.5 0.3 4.1 1.6 4.1 4.1 0 3.3-2.6 4.8-6.5 4.8h-7V15.5zM39.6 7.4c2.2 0 3.4-0.8 3.4-2.8 0-2-1.1-2.7-3.3-2.7h-2.1v5.5H39.6zM39.9 15.4c2.6 0 3.7-1.1 3.7-3.2 0-2.1-1-3.1-3.8-3.1h-2.3v6.3H39.9z"
        fill="#20024E"
      />
      <path
        d="M47.6 13.5c0-2.6 2.1-3.8 5-3.8 1.1 0 2 0.1 2.9 0.3V8.3c0-1.6-0.9-2.2-2.6-2.2 -1.7 0-2.6 0.6-3.3 1.2h-1.2v-2c1.1-0.5 2.6-1 4.9-1 3 0 4.7 0.9 4.7 3.7v6.7c0 0.5 0.3 0.8 0.8 0.8h0.7v1.3c-0.3 0.2-0.9 0.4-1.7 0.4 -1.4 0-2.1-0.6-2.3-1.7 -0.9 1.2-2.2 1.7-3.9 1.7C49.3 17.2 47.6 16 47.6 13.5zM55.5 14.2v-2.7c-0.7-0.1-1.5-0.2-2.4-0.2 -1.8 0-2.9 0.7-2.9 2.2 0 1.5 0.9 2.2 2.3 2.2C53.9 15.5 54.7 15 55.5 14.2z"
        fill="#20024E"
      />
      <path
        d="M60.4 15.5h0.9c0.3 0 0.7-0.3 0.7-0.7V6.7c0-0.3-0.3-0.7-0.7-0.7h-1V4.4H64c0.4 0 0.6 0.3 0.6 1.5v0.3c1.3-1.2 3-2 5-2 1.8 0 3.3 0.7 3.3 3.1v7.4c0 0.3 0.3 0.7 0.6 0.7h0.8v1.5h-5.8v-1.5h1.7V8.3c0-1.6-0.7-2-2-2 -1.3 0-2.6 0.6-3.7 1.2v8h1.8v1.5h-6V15.5z"
        fill="#20024E"
      />
      <path
        d="M75.1 15.5h0.9c0.3 0 0.7-0.3 0.7-0.7V2.5c0-0.3-0.3-0.7-0.7-0.7h-1V0.2h3.8c0.3 0 0.5 0.2 0.5 0.7V11l4-4.1c0.4-0.4 0.2-0.9-0.2-0.9h-0.6V4.4h5.2v1.6h-0.6c-0.3 0-0.8 0.2-1.1 0.5l-3.1 3.1 3.5 5.1c0.3 0.5 0.7 0.7 1.1 0.7h0.4v1.5H85l-3.8-5.6 -1.8 1.8v2.3h1.6v1.5h-5.8V15.5z"
        fill="#20024E"
      />
      <path
        d="M93.2 10.8c0-4 2.8-6.5 6.4-6.5 3.6 0 6.4 2.5 6.4 6.5 0 4-2.8 6.4-6.4 6.4C96 17.2 93.2 14.8 93.2 10.8zM103.3 10.8c0-3.1-1.5-4.8-3.7-4.8 -2.2 0-3.7 1.6-3.7 4.8 0 3.1 1.5 4.7 3.7 4.7C101.8 15.5 103.3 13.9 103.3 10.8z"
        fill="#20024E"
      />
      <path
        d="M106.6 15.5h0.9c0.3 0 0.7-0.3 0.7-0.7V6.1h-1.7V4.4h1.7V3.4c0-2.4 1.4-3.4 3.7-3.4 1 0 1.6 0.1 2 0.3v1.5h-1.2c-1.1 0-1.9 0.2-1.9 1.6v1h2.7v1.6h-2.7v8.8c0 0.3 0.3 0.7 0.7 0.7h1.2v1.5h-6.1V15.5z"
        fill="#20024E"
      />
      <path
        d="M33 36.3h1c0.4 0 0.7-0.4 0.7-0.8V23.3c0-0.4-0.4-0.8-0.7-0.8h-1v-1.6h6.1l4 12.6h0.1l4-12.6h6.1v1.6h-1c-0.4 0-0.7 0.4-0.7 0.8v12.2c0 0.3 0.4 0.8 0.7 0.8h1v1.5h-6.4v-1.5h1.9V22.8h-0.2l-4.8 15h-2l-4.8-15h-0.1v13.5h1.9v1.5H33V36.3z"
        fill="#20024E"
      />
      <path
        d="M53.4 31.5c0-4 2.5-6.5 6.1-6.5 3.5 0 5.6 1.9 5.6 6.1 0 0.4 0 0.7 0 0.8h-9c0.1 2.9 1.4 4.4 3.9 4.4 1.8 0 2.6-0.6 3.3-1.4h1.5v1.8c-1 0.7-2.4 1.3-4.9 1.3C55.6 38 53.4 35.5 53.4 31.5zM62.6 30.3c-0.1-2.7-1.1-3.7-3-3.7 -1.9 0-3.1 1.2-3.4 3.7H62.6z"
        fill="#20024E"
      />
      <path
        d="M65.9 36.3h0.9c0.3 0 0.7-0.3 0.7-0.7V23.2c0-0.3-0.3-0.7-0.7-0.7h-1v-1.6h3.8c0.3 0 0.5 0.2 0.5 0.7v14c0 0.3 0.3 0.7 0.7 0.7h0.9v1.5h-5.8V36.3z"
        fill="#20024E"
      />
      <path
        d="M75.4 36.5c-0.2 0.8-0.7 1.3-1 1.3H73V23.2c0-0.3-0.3-0.7-0.7-0.7h-1v-1.6h3.8c0.3 0 0.5 0.2 0.5 0.7v5.5c1-1.1 2.3-2 4.4-2 2.4 0 4.8 1.5 4.8 6.3 0 4.9-2.8 6.6-5.5 6.6C77.3 38 76.2 37.4 75.4 36.5zM82.2 31.5c0-3.7-1.6-4.6-3.3-4.6 -1.2 0-2.4 0.7-3.2 1.4v6.9c0.7 0.7 1.6 1.2 3 1.2C80.3 36.4 82.2 35.5 82.2 31.5z"
        fill="#20024E"
      />
      <path
        d="M86 31.5c0-4 2.8-6.5 6.4-6.5 3.6 0 6.4 2.5 6.4 6.5 0 4-2.8 6.4-6.4 6.4C88.8 38 86 35.6 86 31.5zM96.2 31.6c0-3.1-1.5-4.8-3.7-4.8 -2.2 0-3.7 1.6-3.7 4.8 0 3.1 1.5 4.7 3.7 4.7C94.7 36.3 96.2 34.7 96.2 31.6z"
        fill="#20024E"
      />
      <path
        d="M100.8 34.9v-7.4c0-0.3-0.3-0.7-0.7-0.7h-0.9v-1.6h4.2V34c0 1.6 0.8 2 2 2 1.3 0 2.6-0.6 3.6-1.3v-8h-1.8v-1.6h4.4v10.4c0 0.3 0.3 0.7 0.7 0.7h1v1.5h-3.6c-0.3 0-0.6-0.3-0.6-1.5V36c-1.3 1.2-2.8 2-4.9 2C102.4 38 100.8 37.3 100.8 34.9z"
        fill="#20024E"
      />
      <path
        d="M114.1 36.3h0.9c0.3 0 0.7-0.3 0.7-0.7v-8.1c0-0.3-0.3-0.7-0.7-0.7h-1v-1.6h3.7c0.4 0 0.6 0.3 0.6 1.7v0.4c0.9-1.1 2-2.2 3.8-2.2 0.3 0 0.5 0 0.7 0.1v2.1h-0.5c-1.9 0-3 0.5-4 1.3v7.7h2v1.5h-6.2V36.3z"
        fill="#20024E"
      />
      <path
        d="M123.7 36.3h0.9c0.3 0 0.7-0.3 0.7-0.7v-8.1c0-0.3-0.3-0.7-0.7-0.7h-1v-1.6h3.7c0.4 0 0.6 0.3 0.6 1.5v0.3c1.3-1.2 3-2 5-2 1.8 0 3.3 0.7 3.3 3.1v7.4c0 0.3 0.3 0.7 0.6 0.7h0.8v1.5h-5.8v-1.5h1.7V29c0-1.6-0.7-2-2-2 -1.4 0-2.6 0.6-3.7 1.2v8h1.8v1.5h-6V36.3z"
        fill="#20024E"
      />
      <path
        d="M137.6 31.5c0-4 2.5-6.5 6.1-6.5 3.5 0 5.6 1.9 5.6 6.1 0 0.4 0 0.7 0 0.8h-9c0.1 2.9 1.4 4.4 3.9 4.4 1.8 0 2.6-0.6 3.3-1.4h1.5v1.8c-1 0.7-2.4 1.3-4.9 1.3C139.8 38 137.6 35.5 137.6 31.5zM146.8 30.3c-0.1-2.7-1.1-3.7-3-3.7 -1.9 0-3.1 1.2-3.4 3.7H146.8z"
        fill="#20024E"
      />
    </Symbol>
  );
}
