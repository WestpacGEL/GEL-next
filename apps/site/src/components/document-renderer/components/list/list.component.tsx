import { styles as listStyles } from './list.style';
import { type ListProps } from './list.types';

export const List: ListProps = ({ children, type }) => {
  const Tag = type === 'unordered' ? 'ul' : 'ol';
  const styles = listStyles({ type });

  return (
    <Tag className={styles.base({})}>
      {children.map((child, index) => (
        <li className={styles.li({})} key={index}>
          {child}
        </li>
      ))}
    </Tag>
  );
};
