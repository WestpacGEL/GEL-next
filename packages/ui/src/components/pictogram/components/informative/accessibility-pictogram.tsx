'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../../pictogram.component.js';
import { fill } from '../../pictogram.styles.js';
import { type PictogramProps } from '../../pictogram.types.js';

export function AccessibilityPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Accessibility',
  copyrightYear = '2024',
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
          d="M51.9648 29.7974L25.0348 29.7974C23.9298 29.7974 23.0348 30.6934 23.0348 31.7974 23.0348 32.9014 23.9298 33.7974 25.0348 33.7974L31.3668 33.7974C33.4118 33.9344 34.4198 35.6614 34.4198 37.7944L31.4038 54.2864C31.2068 55.3734 31.9258 56.4154 33.0138 56.6134 33.1348 56.6364 33.2558 56.6474 33.3748 56.6474 34.3218 56.6474 35.1638 55.9714 35.3398 55.0064L37.5658 42.8324 37.5658 42.8344C37.5658 42.3494 37.9588 41.9574 38.4428 41.9574 38.8648 41.9574 39.2008 42.2614 39.2838 42.6594L41.5408 55.0064C41.7188 55.9714 42.5608 56.6474 43.5078 56.6474 43.6268 56.6474 43.7478 56.6364 43.8688 56.6134 44.9548 56.4154 45.6758 55.3734 45.4768 54.2864L42.4548 37.7554C42.4668 35.6414 43.4728 33.9334 45.5048 33.7974L51.9648 33.7974C53.0698 33.7974 53.9648 32.9014 53.9648 31.7974 53.9648 30.6934 53.0698 29.7974 51.9648 29.7974M38.5 28.6543C40.582 28.6543 42.27 26.9663 42.27 24.8843 42.27 22.8023 40.582 21.1143 38.5 21.1143 36.418 21.1143 34.73 22.8023 34.73 24.8843 34.73 26.9663 36.418 28.6543 38.5 28.6543"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M38.7109,67.9121 C22.2969,67.9121 8.9419,54.5581 8.9419,38.1441 C8.9419,21.7301 22.2969,8.3771 38.7109,8.3771 C55.1239,8.3771 68.4779,21.7301 68.4779,38.1441 C68.4779,54.5581 55.1239,67.9121 38.7109,67.9121 M65.8799,20.7701 C60.1389,11.8221 50.1079,5.8751 38.7109,5.8751 C20.9189,5.8751 6.4419,20.3501 6.4419,38.1431 C6.4419,45.2761 8.7739,51.8731 12.7089,57.2211 C18.4489,66.1751 28.4819,72.1251 39.8849,72.1251 C57.6769,72.1251 72.1509,57.6501 72.1509,39.8581 C72.1509,32.7201 69.8169,26.1201 65.8799,20.7701"
        />
      </g>
    </Pictogram>
  );
}
