import { type SVGProps, Svg } from './Svg.js';

export const DropDownIcon = ({ 'aria-label': ariaLabel = 'Drop Down', copyrightYear = '2020', ...props }: SVGProps) => (
  <Svg aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <polygon fill="currentColor" fillRule="evenodd" points="5 8 12 16 19 8" />
  </Svg>
);
