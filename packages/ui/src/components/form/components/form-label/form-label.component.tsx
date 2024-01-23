import React from 'react';

import { type LabelProps } from '../../../../index.js';
import { Label as GELFormLabel } from '../../../index.js';
import { useFormContext } from '../../form.component.js';

export function FormLabel({ spacing, children, ...props }: LabelProps) {
  const context = useFormContext();
  const finalSpacing = spacing || context?.spacing || 'medium';

  return (
    <GELFormLabel {...props} spacing={finalSpacing}>
      {children}
    </GELFormLabel>
  );
}
