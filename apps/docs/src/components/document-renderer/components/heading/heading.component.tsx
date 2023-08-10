import { ReactNode, useMemo } from 'react';

import { styles } from './heading.style';
import { type HeadingProps } from './heading.types';

export const Heading: HeadingProps = ({ children, level, textAlign }) => {
  const Tag = useMemo(() => `h${level}` as keyof JSX.IntrinsicElements, [level]);
  return <Tag className={styles({ textAlign, level })}>{children as ReactNode}</Tag>;
};
