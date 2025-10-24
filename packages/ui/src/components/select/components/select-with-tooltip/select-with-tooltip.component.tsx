import React, { ForwardedRef, forwardRef, useState } from 'react';

import { useBreakpoint } from '../../../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../../../utils/breakpoint.util.js';
import { Tooltip } from '../../../tooltip/index.js';
import { SelectProps } from '../../select.types.js';
import { StyledSelect } from '../styled-select/styled-select.component.js';

import { styles } from './select-with-tooltip.styles.js';

function BaseSelectWithTooltip(
  { width = 'auto', size = 'medium', children, onChange, ...props }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const [selectedOption, setSelectedOption] = useState('');
  const breakpoint = useBreakpoint();
  return (
    <Tooltip
      tooltip={selectedOption}
      className={styles({
        width: resolveResponsiveVariant(width, breakpoint),
        size: resolveResponsiveVariant(size, breakpoint),
      })}
    >
      <StyledSelect
        ref={ref}
        onChange={e => {
          setSelectedOption(e.target.options[e.target.selectedIndex].text);
          onChange?.(e);
        }}
        width={width}
        {...props}
      >
        {children}
      </StyledSelect>
    </Tooltip>
  );
}

export const SelectWithTooltip = forwardRef<HTMLSelectElement, SelectProps>(BaseSelectWithTooltip);
