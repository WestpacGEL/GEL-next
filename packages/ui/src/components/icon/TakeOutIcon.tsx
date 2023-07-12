import { type SVGProps, Svg } from './Svg.js';

export const TakeOutIcon = ({ 'aria-label': ariaLabel = 'Take Out', copyrightYear = '2020', ...props }: SVGProps) => (
  <Svg aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3,5 L21,5 L18.99,22.23 C18.87,23.23 18.03,24 17,24 L7,24 C5.97,24 5.13,23.23 5.01,22.23 L3,5 Z M12,20 C13.66,20 15,18.66 15,17 C15,15 12,11.6 12,11.6 C12,11.6 9,15 9,17 C9,18.66 10.34,20 12,20 Z M5,2 L8,0 L16,0 L19,2 L21,2 L22,4 L2,4 L3,2 L5,2 Z"
    />
  </Svg>
);
