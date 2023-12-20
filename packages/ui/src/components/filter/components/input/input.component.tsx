import React from 'react';

import { SearchIcon } from '../../../icon/index.js';
import { Input as GELInput, InputField, type InputProps } from '../../../index.js';

export function Input({ onChange, ...props }: InputProps) {
  return (
    <InputField className="mb-0" before={{ icon: SearchIcon }}>
      <GELInput {...props} placeholder="Search" onChange={onChange} />
    </InputField>
  );
}
