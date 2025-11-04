/* eslint-disable @next/next/no-img-element */
import { styles as imageStyles } from './image.style';
import { type ImageProps } from './image.types';

export const Image = ({ alt, src, title }: ImageProps) => {
  const styles = imageStyles({});
  return (
    <figure className={styles.base({})}>
      <img className={styles.img({})} loading="lazy" alt={alt} src={src} />
      {title && <figcaption className={styles.caption({})}>{title}</figcaption>}
    </figure>
  );
};
