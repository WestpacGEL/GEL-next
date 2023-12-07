import { styles } from './image-caption.style';
import { type ImageCaptionProps } from './image-caption.types';

export const ImageCaption = ({ text }: ImageCaptionProps) => {
  return <p className={styles({})}>{text}</p>;
};
