import { styles } from './article-column.styles';
import { type ArticleColumnProps } from './article-column.types';

export const ArticleColumn = ({ children, layout, index }: ArticleColumnProps) => {
  return <div className={styles({ layout, index: index as 0 | 1 | 2 })}>{children}</div>;
};
