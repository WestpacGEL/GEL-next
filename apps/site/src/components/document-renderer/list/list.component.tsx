import { styles as listStyles } from './list.style';
import { type ListProps } from './list.types';

export const List = ({ children, type, className, color = 'default' }: ListProps) => {
  const Tag = type === 'unordered' ? 'ul' : 'ol';
  const styles = listStyles({ type, className, color });

  return (
    <Tag className={styles.base({})}>
      {children?.map((child, index) => (
        <li className={styles.li({})} key={index}>
          {child}
        </li>
      ))}
    </Tag>
  );
};
