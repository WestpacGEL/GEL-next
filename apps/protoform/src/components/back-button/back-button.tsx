import { Button, ButtonProps } from '@westpac/ui';
import { ArrowLeftIcon } from '@westpac/ui/icon';

export function BackButton({ children, ...props }: ButtonProps) {
  return (
    <div className="md:pt-9">
      <Button iconBefore={ArrowLeftIcon} look="link" className="p-0 font-normal no-underline max-md:hidden" {...props}>
        {children}
      </Button>
    </div>
  );
}
