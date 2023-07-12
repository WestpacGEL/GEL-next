import { type SVGProps, Svg } from './Svg.js';

export const DropUpIcon = ({ 'aria-label': ariaLabel = 'Drop Up', copyrightYear = '2020', ...props }: SVGProps) => (
  <Svg aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <polygon fill="currentColor" fillRule="evenodd" points="5 8 12 16 19 8" transform="rotate(-180 12 12)" />
  </Svg>
);
