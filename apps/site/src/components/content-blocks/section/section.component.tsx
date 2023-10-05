import { tv } from 'tailwind-variants';

const styles = tv({
  base: 'border-b border-border',
  variants: {
    paddingTop: {
      medium: 'pt-7 sm:pt-10',
      large: 'pt-7 sm:pt-15',
    },
    paddingBottom: {
      medium: 'pb-7 sm:pb-10',
      large: 'pb-7 sm:pb-15',
    },
  },
});

export function Section({
  paddingTop = 'medium',
  paddingBottom = 'medium',
  className,
  children,
}: {
  children?: React.ReactNode;
  className?: string;
  paddingBottom?: 'medium' | 'large';
  paddingTop?: 'medium' | 'large';
}) {
  return <section className={styles({ paddingTop, paddingBottom, className })}>{children}</section>;
}
