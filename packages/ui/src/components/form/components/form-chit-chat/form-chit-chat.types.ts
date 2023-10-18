import { HTMLAttributes } from 'react';

export type FormChitChatProps = {
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;
