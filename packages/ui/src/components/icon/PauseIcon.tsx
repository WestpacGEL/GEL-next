import { type SVGProps, Svg } from './Svg.js';

export const PauseIcon = ({ 'aria-label': ariaLabel = 'Pause', copyrightYear = '2020', ...props }: SVGProps) => (
  <Svg aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M6,19 L10,19 L10,5 L6,5 L6,19 Z M14,5 L14,19 L18,19 L18,5 L14,5 Z"
    />
  </Svg>
);
