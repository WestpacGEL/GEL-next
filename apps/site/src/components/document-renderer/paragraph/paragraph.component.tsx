import { styles } from './paragraph.style';
import { type ParagraphProps } from './paragraph.types';

export const Paragraph = ({ children, textAlign, className }: ParagraphProps) => {
  return <p className={styles({ textAlign, className })}>{children}</p>;
};
