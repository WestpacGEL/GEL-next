import { type SVGProps, Svg } from './Svg.js';

export const CloseIcon = ({ 'aria-label': ariaLabel = 'Close', copyrightYear = '2020', ...props }: SVGProps) => (
  <Svg aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <polygon
      fill="currentColor"
      fillRule="evenodd"
      points="5.414 4 12 10.586 18.586 4 20 5.414 13.414 12 20 18.586 18.586 20 12 13.414 5.414 20 4 18.586 10.586 12 4 5.414"
    />
  </Svg>
);
