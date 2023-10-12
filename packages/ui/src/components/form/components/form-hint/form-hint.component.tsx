import React from 'react';

import { type FormHintProps, FormHint as GelFormHint } from '../../../index.js';
import { useFormContext } from '../../form.component.js';

export function FormHint({ ...props }: FormHintProps) {
  const { spacing } = useFormContext();

  return <GelFormHint spacing={spacing} {...props} />;
}
