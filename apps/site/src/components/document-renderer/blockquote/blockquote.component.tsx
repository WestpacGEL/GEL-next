import { Children, ReactNode, cloneElement, isValidElement, useCallback } from 'react';

import { styles } from './blockquote.style';
import { type BlockquoteProps } from './blockquote.types';

export function Blockquote({ children, className }: BlockquoteProps) {
  const renderChildren = useCallback(() => {
    return Children.map<ReactNode, ReactNode>(children, (child, index) => {
      if (isValidElement(child)) {
        return child.props.node.children.map(({ text }) => text);
      }
    });
  }, [children]);

  return <blockquote className={styles({ className })}>{renderChildren()}</blockquote>;
}
