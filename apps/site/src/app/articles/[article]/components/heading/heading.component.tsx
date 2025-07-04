import { useMemo } from 'react';

import { styles } from './heading.style';
import { type HeadingProps } from './heading.types';

export const Heading = ({ children, level = 3, textAlign = 'left', className }: HeadingProps) => {
  const Tag = useMemo(() => `h${level}` as keyof JSX.IntrinsicElements, [level]);
  const id = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-base-to-string
    const text: string | undefined = Array.isArray(children) ? children[0].props.node.text : children?.toString();
    return text?.toLowerCase().split(' ').join('-');
  }, [children]);

  return (
    <Tag id={id} className={styles({ textAlign, level, className })}>
      {children}
    </Tag>
  );
};
