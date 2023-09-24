import { clsx } from 'clsx';

import { SvgProps } from './svg.types';

export function Svg({ viewBox, width, height, 'aria-label': ariaLabel, className, children, ...props }: SvgProps) {
  return (
    <svg
      aria-label={ariaLabel}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={height}
      role="img"
      focusable="false"
      className={clsx(className, 'inline-block')}
      {...props}
    >
      {children}
    </svg>
  );
}
