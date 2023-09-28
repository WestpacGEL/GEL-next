import { Icon, type IconProps } from '@westpac/ui/icon';

export function ArrowDownRightIcon({
  'aria-label': ariaLabel = 'Arrow Down Right',
  copyrightYear = '2023',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      <path fill="currentColor" fillRule="evenodd" d="M20 15l-6 6-1.42-1.42L16.17 16H4V4h2v10h10.17l-3.59-3.58L14 9z" />
    </Icon>
  );
}
