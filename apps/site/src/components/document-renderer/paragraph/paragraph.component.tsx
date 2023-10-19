import { styles } from './paragraph.style';
import { type ParagraphProps } from './paragraph.types';

export const Paragraph = ({ children, textAlign }: ParagraphProps) => {
  return <p className={styles({ textAlign })}>{children}</p>;
};
