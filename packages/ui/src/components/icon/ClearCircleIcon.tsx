import { type SVGProps, Svg } from './Svg.js';

export const ClearCircleIcon = ({ 'aria-label': ariaLabel = 'Clear', copyrightYear = '2020', ...props }: SVGProps) => (
  <Svg aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 0c6.628 0 12 5.373 12 12s-5.372 12-12 12S0 18.627 0 12 5.372 0 12 0zm0 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.95 3.636l1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636l4.95 4.95 4.95-4.95z"
    />
  </Svg>
);
