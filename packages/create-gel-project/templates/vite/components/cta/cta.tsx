import { Button, type ButtonProps } from '@westpac/ui';
import { type ReactNode } from 'react';

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
    <div className="flex gap-2 pt-5 pb-10 max-md:flex-col">
      <Button size="large" look="primary" className="md:px-2.5" onClick={primaryOnClick} type={primaryType}>
        {children}
      </Button>
      {secondary && (
        <Button size="large" look="faint" type="button" soft onClick={secondaryOnClick}>
          {secondary}
        </Button>
      )}
      {tertiary && (
        <Button size="large" type="button" look="link" onClick={tertiaryOnClick}>
          {tertiary}
        </Button>
      )}
    </div>
  );
}
