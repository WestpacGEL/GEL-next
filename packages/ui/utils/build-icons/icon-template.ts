export const iconTemplate = (
  name: string,
  ariaLabel: string,
  children: string,
  addFragment: boolean,
  sameSVG: boolean,
) => `import React${addFragment ? ', { Fragment }' : ''} from 'react';

import { Icon } from "../icon.component.js";
import { type IconProps } from "../icon.types.js";

export function ${name}Icon({
  ${sameSVG ? '' : 'look = "filled",'}
  "aria-label": ariaLabel = '${ariaLabel}',
  copyrightYear = "2020",
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      ${children}
    </Icon>
  );
}`;
