export const iconTemplate = (
  name: string,
  ariaLabel: string,
  filledSVG: string,
  outlinedSVG: string,
  addFragment: boolean,
) => `import React${addFragment ? ', { Fragment }' : ''} from 'react';

import { Icon } from "../icon.component.js";
import { type IconProps } from "../icon.types.js";

export function ${name}Icon({
  look = "filled",
  "aria-label": ariaLabel = '${ariaLabel}',
  copyrightYear = "2020",
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === "filled" ? ${filledSVG} : ${outlinedSVG}}
    </Icon>
  );
}`;
