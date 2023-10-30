import { styles } from './paragraph.style';
import { type ParagraphProps } from './paragraph.types';

export const Paragraph = ({ children, textAlign, className, type = 'default' }: ParagraphProps) => {
  return <p className={styles({ textAlign, className, type })}>{children}</p>;
};
