import { type AriaModalOverlayProps } from 'react-aria';
import { type OverlayTriggerState } from 'react-stately';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './backdrop.styles.js';

export type BackdropProps = {
  /**
   * Inner part of backdrop
   */
  children: React.ReactNode;
  /**
   * Clasname
   */
  className?: string;
  /**
   * OverlayTriggerState props
   */
  state: OverlayTriggerState;
  /**
   * zIndex of content inside
   */
  zIndex?: number;
} & VariantProps<typeof styles> &
  AriaModalOverlayProps;
