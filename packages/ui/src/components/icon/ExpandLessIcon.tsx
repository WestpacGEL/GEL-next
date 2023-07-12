import { type SVGProps, Svg } from './Svg.js';

export const ExpandLessIcon = ({
  'aria-label': ariaLabel = 'Expand Less',
  copyrightYear = '2020',
  ...props
}: SVGProps) => (
  <Svg aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <polygon fill="currentColor" fillRule="evenodd" points="12 9.824 18.588 16.412 20 15 12 7 4 15 5.412 16.412" />
  </Svg>
);
