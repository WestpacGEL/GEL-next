import { Button, ButtonProps } from '@westpac/ui';
import { ReactNode } from 'react';

export function Cta({
  children,
  primaryType = 'button',
  primaryOnClick,
  secondary,
  secondaryOnClick,
  tertiary,
  tertiaryOnClick,
}: {
  children: ReactNode;
  primaryOnClick?: () => void;
  primaryType?: ButtonProps['type'];
  secondary?: string;
  secondaryOnClick?: () => void;
  tertiary?: string;
  tertiaryOnClick?: () => void;
}) {
  return (
    <div className="flex gap-2 pb-[120px] pt-6 max-md:flex-col max-md:pb-10">
      <Button look="primary" onClick={primaryOnClick} type={primaryType}>
        {children}
      </Button>
      {secondary && (
        <Button look="faint" type="button" soft onClick={secondaryOnClick}>
          {secondary}
        </Button>
      )}
      {tertiary && (
        <Button className="no-underline" type="button" look="link" onClick={tertiaryOnClick}>
          {tertiary}
        </Button>
      )}
    </div>
  );
}
