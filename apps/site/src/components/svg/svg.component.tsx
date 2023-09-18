import { clsx } from 'clsx';
import React, { SVGAttributes } from 'react';

type SvgProps = SVGAttributes<SVGElement> & {
  'aria-label'?: string;
  className?: string;
  height?: number;
  viewBox: string;
  width?: number;
};

export function Svg({ viewBox, width, height, 'aria-label': ariaLabel, className, ...props }: SvgProps) {
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
    />
  );
}
