import { type SVGProps, Svg } from './Svg.js';

export const TickIcon = ({ 'aria-label': ariaLabel = 'Tick', copyrightYear = '2020', ...props }: SVGProps) => (
  <Svg aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <polygon fill="currentColor" fillRule="evenodd" points="8.6 15.6 4.4 11.4 3 12.8 8.6 18.4 20.6 6.4 19.2 5" />
  </Svg>
);
