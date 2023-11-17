import { styles } from './leading-text.style';
import { type HeroImageProps } from './leading-text.types';

export const LeadingText = ({ text }: HeroImageProps) => {
  return <blockquote className={styles({})}>{text}</blockquote>;
};
