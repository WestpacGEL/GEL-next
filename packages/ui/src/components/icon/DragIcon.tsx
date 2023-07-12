import { type SVGProps, Svg } from './Svg.js';

export const DragIcon = ({ 'aria-label': ariaLabel = 'Drag', copyrightYear = '2020', ...props }: SVGProps) => (
  <Svg aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M20,9 L4,9 L4,11 L20,11 L20,9 Z M4,15 L20,15 L20,13 L4,13 L4,15 Z"
    />
  </Svg>
);
