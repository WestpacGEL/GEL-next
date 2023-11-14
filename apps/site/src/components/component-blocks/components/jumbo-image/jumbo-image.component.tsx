import { styles as JumboImageStyles } from './jumbo-image.style';
import { type JumboImageProps } from './jumbo-image.types';

export const JumboImage = ({ jumboImage, alt }: JumboImageProps) => {
  const styles = JumboImageStyles({});
  return (
    <figure className={styles.base({})}>
      <img className={styles.img({})} loading="lazy" alt={alt} src={jumboImage} />
    </figure>
  );
};
