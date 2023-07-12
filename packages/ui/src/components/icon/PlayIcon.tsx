import { type SVGProps, Svg } from './Svg.js';

export const PlayIcon = ({ 'aria-label': ariaLabel = 'Play', copyrightYear = '2020', ...props }: SVGProps) => (
  <Svg aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <polygon fill="currentColor" fillRule="evenodd" points="8 5 8 19 19 12" />
  </Svg>
);
