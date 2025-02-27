'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../../pictogram.component.js';
import { fill } from '../../pictogram.styles.js';
import { type PictogramProps } from '../../pictogram.types.js';

export function PadlockUnlockedPictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Unlocked padlock',
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
          d="M43.3735,45.9736 C43.3735,42.3836 40.4635,39.4736 36.8735,39.4736 C33.2835,39.4736 30.3735,42.3836 30.3735,45.9736 C30.3735,48.2736 31.5705,50.2896 33.3735,51.4446 L33.3735,56.9736 C33.3735,58.9066 34.9405,60.4736 36.8735,60.4736 C38.8065,60.4736 40.3735,58.9066 40.3735,56.9736 L40.3735,51.4446 C42.1755,50.2896 43.3735,48.2736 43.3735,45.9736"
        />
        <path
          className={fill({ mode, outline: true })}
          d="M57.2681,63.4677 C57.2681,65.8407 55.3381,67.7707 52.9661,67.7707 L19.8031,67.7707 C17.4301,67.7707
        15.5001,65.8407 15.5001,63.4677 L15.5001,31.2707 L57.2681,31.2707 L57.2681,63.4677 Z M62.9971,32.6077
        L62.9991,32.6037 L59.1861,29.3347 L59.1851,29.3357 C58.8331,28.9867 58.3491,28.7707 57.8151,28.7707
        L53.8401,28.7707 L53.8401,21.1667 C53.8401,11.7007 46.4461,3.9997 37.3571,3.9997 C28.2681,3.9997 20.8731,11.7007
        20.8731,21.1667 L20.8731,21.5837 L24.8731,21.5837 L24.8731,21.1667 C24.8731,13.9067 30.4741,7.9997
        37.3571,7.9997 C44.2401,7.9997 49.8401,13.9067 49.8401,21.1667 L49.8401,28.7707 L14.9391,28.7707
        C13.8701,28.7707 13.0001,29.6397 13.0001,30.7097 L13.0001,63.4677 C13.0001,63.6017 13.0121,63.7317
        13.0201,63.8637 C13.0191,63.8637 13.0131,63.8607 13.0131,63.8607 C13.0131,63.8607 13.0171,63.9707
        13.0351,64.1577 C13.0351,64.1607 13.0361,64.1637 13.0361,64.1657 C13.1831,65.6597 14.2891,72.2587
        22.2371,73.4197 C22.6911,73.5157 23.1621,73.5687 23.6451,73.5687 L56.8081,73.5687 C60.5591,73.5687
        63.6111,70.5167 63.6111,66.7657 L63.6111,34.0217 C63.6111,33.4647 63.3731,32.9637 62.9971,32.6077
        L62.9971,32.6077 Z"
        />
      </g>
    </Pictogram>
  );
}
