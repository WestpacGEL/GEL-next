import { type SVGProps, Svg } from './Svg.js';

export const CursorArrowIcon = ({
  'aria-label': ariaLabel = 'Cursor arrow',
  copyrightYear = '2021',
  ...props
}: SVGProps) => (
  <Svg aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="m6 1 12.67 11.823-5.701.169 3.801 8.741L13.856 23l-3.801-8.741L6 18.313z"
    />
  </Svg>
);
