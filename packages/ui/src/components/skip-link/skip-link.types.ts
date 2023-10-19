import { HTMLAttributes } from 'react';

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
  HTMLAttributes<Element>;
