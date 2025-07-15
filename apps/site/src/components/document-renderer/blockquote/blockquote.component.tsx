import { Children, ReactNode, isValidElement, useCallback } from 'react';

import { styles } from './blockquote.style';
import { type BlockquoteProps } from './blockquote.types';

export function Blockquote({ children, className, type = 'default' }: BlockquoteProps) {
  const renderChildren = useCallback(() => {
    return Children.map<ReactNode, ReactNode>(children, child => {
      if (isValidElement(child)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
        return child.props.node.children.map(({ text }: { text?: string }) => text);
      }
    });
  }, [children]);

  return <blockquote className={styles({ className, type })}>{renderChildren()}</blockquote>;
}
