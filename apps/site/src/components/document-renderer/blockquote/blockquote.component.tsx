import { Children, ReactNode, isValidElement, useCallback } from 'react';

import { styles } from './blockquote.style';
import { type BlockquoteProps } from './blockquote.types';

export function Blockquote({ children, className, type = 'default' }: BlockquoteProps) {
  const renderChildren = useCallback(() => {
    return Children.map<ReactNode, ReactNode>(children, child => {
      if (isValidElement(child)) {
        return child.props.node.children.map(({ text }: { text?: string }) => text);
      }
    });
  }, [children]);

  return <blockquote className={styles({ className, type })}>{renderChildren()}</blockquote>;
}
