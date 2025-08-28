/* eslint-disable @next/next/no-img-element */
import { useMemo } from 'react';

import { useThemeMode } from '@/hooks/theme-mode.hook';

import { styles as imageStyles } from './image.style';
import { type ImageProps } from './image.types';

export const Image = ({ alt, src, darkModeSrc, title, className }: ImageProps) => {
  const { mode } = useThemeMode();

  const styles = imageStyles({});

  const finalSrc = useMemo(() => {
    if (mode === 'dark') {
      return darkModeSrc || src;
    }
    return src;
  }, [darkModeSrc, mode, src]);

  return (
    <figure className={styles.base({ className })}>
      <img className={styles.img({})} loading="lazy" alt={alt} src={finalSrc} />
      {title && <figcaption className={styles.caption({})}>{title}</figcaption>}
    </figure>
  );
};
