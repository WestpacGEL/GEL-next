import { AriaPopoverProps } from 'react-aria';
import { OverlayTriggerState } from 'react-stately';

export type MenuPopoverProps = Omit<AriaPopoverProps, 'popoverRef'> & {
  children: React.ReactNode;
  state: OverlayTriggerState;
  style?: React.CSSProperties;
};
