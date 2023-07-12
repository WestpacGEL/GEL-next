import { type SVGProps, Svg } from './Svg.js';

export const AddIcon = ({ 'aria-label': ariaLabel = 'Add', copyrightYear = '2020', ...props }: SVGProps) => (
  <Svg aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <polygon
      fill="currentColor"
      fillRule="evenodd"
      points="11 11 4 11 4 13 11 13 11 20 13 20 13 13 20 13 20 11 13 11 13 4 11 4"
    />
  </Svg>
);
