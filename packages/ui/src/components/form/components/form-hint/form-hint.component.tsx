import React from 'react';

import { Hint as GelFormHint, type HintProps } from '../../../index.js';
import { useFormContext } from '../../form.component.js';

export function FormHint({ ...props }: HintProps) {
  const { spacing } = useFormContext();

  return <GelFormHint spacing={spacing} {...props} />;
}
