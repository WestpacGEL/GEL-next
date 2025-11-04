import { Svg } from '@/components/svg';

export function FigmaLogo() {
  return (
    <span
      className={`
        inline-block size-[40px] shrink align-middle leading-none
        lg:size-[55px]
      `}
    >
      <Svg viewBox="0 0 180 180" aria-label="Figma">
        <path d="M90 93a24 24 0 1 1 48 0 24 24 0 0 1-48 0Z" fill="#1ABCFE" />
        <path
          d="M42 141a24.002 24.002 0 0 1 24-24h24v24a24.002 24.002 0 0 1-24 24 24.003 24.003 0 0 1-24-24Z"
          fill="#0ACF83"
        />
        <path d="M90 21v48h24a24.002 24.002 0 0 0 24-24 24.003 24.003 0 0 0-24-24H90Z" fill="#FF7262" />
        <path d="M42 45a24 24 0 0 0 24 24h24V21H66a24 24 0 0 0-24 24Z" fill="#F24E1E" />
        <path d="M42 93a24.002 24.002 0 0 0 24 24h24V69H66a24 24 0 0 0-24 24Z" fill="#A259FF" />
      </Svg>
    </span>
  );
}
