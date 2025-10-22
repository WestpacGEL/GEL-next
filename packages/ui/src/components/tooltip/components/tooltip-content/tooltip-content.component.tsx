import { styles } from './tooltip-content.styles.js';
import { TooltipContentProps } from './tooltip-content.types.js';

export function TooltipContent({ children, id }: TooltipContentProps) {
  return children ? (
    <span className={styles()} role="tooltip" id={id}>
      {children}
    </span>
  ) : null;
}
