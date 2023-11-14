import { styles as heroImageStyles } from './hero-image.style';
import { type HeroImageProps } from './hero-image.types';

export const HeroImage = ({ heroImage, alt }: HeroImageProps) => {
  const styles = heroImageStyles({});
  return (
    <figure className={styles.base({})}>
      <img className={styles.img({})} loading="lazy" alt={alt} src={heroImage} />
    </figure>
  );
};
