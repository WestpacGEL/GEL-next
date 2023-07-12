import { type SVGProps, Svg } from './Svg.js';

export const ArrowRightIcon = ({
  'aria-label': ariaLabel = 'Arrow Right',
  copyrightYear = '2020',
  ...props
}: SVGProps) => (
  <Svg aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <polygon fill="currentColor" fillRule="evenodd" points="14.588 12 8 18.588 9.412 20 17.412 12 9.412 4 8 5.412" />
  </Svg>
);
