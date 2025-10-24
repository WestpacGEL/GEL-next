import { Button, ButtonProps } from '@westpac/ui';
import { ArrowLeftIcon } from '@westpac/ui/icon';

export function BackButton({ children, ...props }: ButtonProps) {
  return (
    <Button
      iconBefore={ArrowLeftIcon}
      look="link"
      className="p-0 font-normal no-underline hidden md:block mb-9"
      {...props}
    >
      {children}
    </Button>
  );
}
