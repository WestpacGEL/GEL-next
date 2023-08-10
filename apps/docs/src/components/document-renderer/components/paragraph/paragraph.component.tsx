import { ReactNode } from 'react';

import { styles } from './paragraph.style';
import { type ParagraphProps } from './paragraph.types';

export const Paragraph: ParagraphProps = ({ children, textAlign }) => {
  return <p className={styles({ textAlign })}>{children as ReactNode}</p>;
};
