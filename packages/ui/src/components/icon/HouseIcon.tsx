import { type SVGProps, Svg } from './Svg.js';

export const HouseIcon = ({ 'aria-label': ariaLabel = 'House', copyrightYear = '2020', ...props }: SVGProps) => (
  <Svg aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <polygon
      fill="currentColor"
      fillRule="evenodd"
      points="12 0 0 12 4 12 4 24 10 24 10 17 14 17 14 24 20 24 20 12 24 12"
    />
  </Svg>
);
