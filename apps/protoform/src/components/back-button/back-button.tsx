import { Button, ButtonProps } from '@westpac/ui';
import { ArrowLeftIcon } from '@westpac/ui/icon';

export function BackButton({ children, ...props }: ButtonProps) {
  return (
    <Button
      iconBefore={ArrowLeftIcon}
      look="link"
      className="mb-9 hidden p-0 font-normal no-underline md:block"
      {...props}
    >
      {children}
    </Button>
  );
}
