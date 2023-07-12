import { type SVGProps, Svg } from './Svg.js';

export const ExpandMoreIcon = ({
  'aria-label': ariaLabel = 'Expand More',
  copyrightYear = '2020',
  ...props
}: SVGProps) => (
  <Svg aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <polygon fill="currentColor" fillRule="evenodd" points="12 13.588 5.412 7 4 8.412 12 16.412 20 8.412 18.588 7" />
  </Svg>
);
