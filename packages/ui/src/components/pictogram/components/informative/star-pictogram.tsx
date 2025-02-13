'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../../pictogram.component.js';
import { fill } from '../../pictogram.styles.js';
import { type PictogramProps } from '../../pictogram.types.js';

export function StarPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Star',
  copyrightYear = '2025',
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
          d="M38.5967,47.1562 L27.8237,54.6532 C27.4867,54.8872 27.0427,54.5652 27.1617,54.1722 L30.9627,41.6102 C31.0147,41.4362 30.9537,41.2492 30.8097,41.1392 L20.3507,33.2102 C20.0237,32.9622 20.1937,32.4412 20.6037,32.4332 L33.7257,32.1652 C33.9067,32.1612 34.0667,32.0462 34.1257,31.8752 L38.4347,19.4772 C38.5697,19.0902 39.1177,19.0902 39.2517,19.4772 L43.5617,31.8752 C43.6207,32.0462 43.7807,32.1612 43.9617,32.1652 L57.0837,32.4332 C57.4937,32.4412 57.6627,32.9622 57.3357,33.2102 L46.8767,41.1392 C46.7337,41.2492 46.6717,41.4362 46.7247,41.6102 L50.5257,54.1722 C50.6447,54.5652 50.2007,54.8872 49.8647,54.6532 L39.0907,47.1562 C38.9427,47.0522 38.7447,47.0522 38.5967,47.1562"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M38.7109,67.9121 C22.2969,67.9121 8.9419,54.5581 8.9419,38.1441 C8.9419,21.7301 22.2969,8.3771 38.7109,8.3771 C55.1239,8.3771 68.4779,21.7301 68.4779,38.1441 C68.4779,54.5581 55.1239,67.9121 38.7109,67.9121 M65.8799,20.7701 C60.1389,11.8221 50.1079,5.8751 38.7109,5.8751 C20.9189,5.8751 6.4419,20.3501 6.4419,38.1431 C6.4419,45.2761 8.7739,51.8731 12.7089,57.2211 C18.4489,66.1751 28.4819,72.1251 39.8849,72.1251 C57.6769,72.1251 72.1509,57.6501 72.1509,39.8581 C72.1509,32.7201 69.8169,26.1201 65.8799,20.7701"
        />
      </g>
    </Pictogram>
  );
}
