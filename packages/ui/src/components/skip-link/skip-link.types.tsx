import { AnchorHTMLAttributes, HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './skip-link.styles.js';

export type SkipLinkProps = (
  | {
      /**
       * Tag to render
       */
      tag?: keyof Omit<JSX.IntrinsicElements, 'a'>;
    }
  | {
      /**
       * href
       */
      href: string;
      /**
       * Tag to render
       */
      tag?: keyof Pick<JSX.IntrinsicElements, 'a'>;
    }
) &
  VariantProps<typeof styles> &
  HTMLAttributes<Element>;
