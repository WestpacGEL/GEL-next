import { type SVGProps, Svg } from './Svg.js';

export const ArrowLeftIcon = ({
  'aria-label': ariaLabel = 'Arrow Left',
  copyrightYear = '2020',
  ...props
}: SVGProps) => (
  <Svg aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <polygon fill="currentColor" fillRule="evenodd" points="9.824 12 16.412 18.588 15 20 7 12 15 4 16.412 5.412" />
  </Svg>
);
