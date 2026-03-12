import { ButtonProps } from '../../../../components/button/button.types.js';

import type { AriaToggleButtonGroupItemProps } from '@react-types/button';

export type ButtonGroupButtonProps = AriaToggleButtonGroupItemProps &
  Omit<ButtonProps, 'justify' | 'look' | 'size' | 'soft'>;
