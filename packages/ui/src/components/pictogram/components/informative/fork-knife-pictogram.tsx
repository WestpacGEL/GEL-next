'use client';

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../../pictogram.component.js';
import { fill } from '../../pictogram.styles.js';
import { type PictogramProps } from '../../pictogram.types.js';

export function ForkKnifePictogram({
  mode = 'duo',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Fork and knife',
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
          d="M25.198 32.736l2.288 39.084c.026.362-.227.467-.56.476l-6.647.122c-.311.009-.576-.141-.563-.457l2.45-39.081c.038-.99-.603-1.894-1.673-2.362-1.852-.856-2.807-1.663-3.682-2.727-.836-1.016-1.299-2.617-1.308-3.197a23.195 23.195 0 0 1-.005-.427L15.5 6.809c.002-.101.037-.21.072-.308.322-.731 1.096-1.001 1.74-1.001.974 0 1.798.599 1.798 1.309v17.358a1.25 1.25 0 1 0 2.5 0V6.809c0-.71.823-1.31 1.797-1.31.975 0 1.798.6 1.798 1.31v17.358a1.25 1.25 0 1 0 2.5 0V6.809c0-.71.824-1.31 1.798-1.31.975 0 1.798.6 1.798 1.298l-.163 17.339h.005c-.262 3.486-2.887 5.38-4.51 6.225-.967.504-1.517 1.415-1.435 2.375zM35.71 6.809c0-1.664-1.541-3.804-3.858-3.808H29.51L29.503 3h-.023c-1.181.008-2.251.437-3.025 1.128C25.675 3.432 24.598 3 23.407 3c-1.19 0-2.268.432-3.047 1.128C19.58 3.432 18.502 3 17.312 3c-2.37 0-4.298 1.709-4.298 3.809v17.03c-.042.49-.347 5.983 6.477 8.969a.818.818 0 0 1 .172.099L17.195 72.28c-.023.629.22 1.237.687 1.712.579.59 1.44.926 2.372.926l8.774.002c.964-.019 1.845-.515 2.417-1.15.449-.496.667-1.117.614-1.747l-2.306-39.388a.586.586 0 0 1 .089-.056c1.829-.953 6.06-3.772 5.869-9.373L35.71 6.809zm15.18 65.18l2.283-34.35c.079-1.206-.944-2.222-2.327-2.312-2.251-.147-3.936-.79-4.745-1.81-.598-.753-.784-1.757-.567-3.068l2.874-17.39.031-.163c.307-1.888 1.779-6.386 8.782-7.39a.638.638 0 0 1 .175 0l1.284 66.43c.002.285-.17.372-.373.375l-6.997.102c-.335.004-.436-.23-.42-.424zM61.67 5.157c-.012-.58-.276-1.118-.747-1.518-.448-.382-2.27-.862-4.063-.607-8.884 1.273-10.585 7.564-10.889 9.451l-2.908 17.56c-.334 2.018.028 3.71 1.075 5.03 1.599 2.015 4.419 2.607 6.512 2.747l-2.31 34.782a1.998 1.998 0 0 0 .588 1.537c.486.5 1.196.78 1.936.78h9.691c1.377-.054 2.439-1.142 2.419-2.33L61.671 5.157z"
        />
        <path
          className={fill({ mode, highlight: true })}
          d="M27.485 71.82c.026.362-.227.467-.559.476l-6.648.122c-.31.009-.576-.141-.563-.457L20.402 61h6.45l.633 10.82zm31.197.117c.002.284-.17.371-.373.374l-6.997.102c-.298.004-.41-.18-.421-.358L51.622 61h6.849l.211 10.936z"
        />
      </g>
    </Pictogram>
  );
}
