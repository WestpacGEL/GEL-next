import { type SVGProps, Svg } from './Svg.js';

export const RemoveIcon = ({ 'aria-label': ariaLabel = 'Remove', copyrightYear = '2020', ...props }: SVGProps) => (
  <Svg aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <polygon fill="currentColor" fillRule="evenodd" points="4 11 4 13 20 13 20 11" />
  </Svg>
);
