import React from 'react';

import { type FormLabelProps } from '../../../../index.js';
import { FormLabel as GELFormLabel } from '../../../index.js';
import { useFormContext } from '../../form.component.js';

export function FormLabel({ spacing, children, ...props }: FormLabelProps) {
  const context = useFormContext();
  const finalSpacing = spacing || context?.spacing || 'medium';

  return (
    <GELFormLabel {...props} spacing={finalSpacing}>
      {children}
    </GELFormLabel>
  );
}
