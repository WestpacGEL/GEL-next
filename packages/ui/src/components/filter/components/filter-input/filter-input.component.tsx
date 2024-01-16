import React from 'react';

import { SearchIcon } from '../../../icon/index.js';
import { Input as GELInput, InputGroup, type InputProps } from '../../../index.js';

export function FilterInput({ onChange, ...props }: InputProps) {
  return (
    <InputGroup className="mb-0" before={{ icon: SearchIcon }}>
      <GELInput {...props} placeholder="Search" onChange={onChange} />
    </InputGroup>
  );
}
