import { type SVGProps, Svg } from './Svg.js';

export const GeolocationIcon = ({
  'aria-label': ariaLabel = 'Geolocation',
  copyrightYear = '2020',
  ...props
}: SVGProps) => (
  <Svg aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <polygon fill="currentColor" fillRule="evenodd" points="0 12 11.143 12.857 12 24 24 0" />
  </Svg>
);
