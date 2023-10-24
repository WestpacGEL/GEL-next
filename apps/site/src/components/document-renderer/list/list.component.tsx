import { styles as listStyles } from './list.style';
import { type ListProps } from './list.types';

export const List = ({ children, type, className, color = 'default' }: ListProps) => {
  const Tag = type === 'unordered' ? 'ul' : 'ol';
  const styles = listStyles({ type, color });

  return (
    <Tag className={styles.base({ className })}>
      {children?.map((child, index) => (
        <li className={styles.li({})} key={index}>
          {child}
        </li>
      ))}
    </Tag>
  );
};
