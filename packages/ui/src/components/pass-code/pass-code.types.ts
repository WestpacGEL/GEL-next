import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './pass-code.styles.js';

export type PassCodeProps = {
  innerRef?: React.Ref<{ updatePasscode: (newPasscode: string) => void }>;
  length: number;
  onComplete: (passcode: string) => void;
} & VariantProps<typeof styles> &
  HTMLAttributes<Element>;
