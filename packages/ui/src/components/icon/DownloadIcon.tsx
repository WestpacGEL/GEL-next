import { type SVGProps, Svg } from './Svg.js';

export const DownloadIcon = ({ 'aria-label': ariaLabel = 'Download', copyrightYear = '2021', ...props }: SVGProps) => (
  <Svg aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 2a7 7 0 016.919 8.071A6 6 0 0118 22H7A7 7 0 015.036 8.28 7.002 7.002 0 0112 2zm2 8h-4v4H7l5 5 5-5h-3v-4z"
    />
  </Svg>
);
