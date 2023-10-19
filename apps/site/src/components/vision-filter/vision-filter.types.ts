import { ReactNode } from 'react';

export type VisionFilterProps = {
  children: ReactNode;
  value?:
    | 'protanopia'
    | 'protanomaly'
    | 'deuteranopia'
    | 'deuteranomaly'
    | 'tritanopia'
    | 'tritanomaly'
    | 'achromatopsia'
    | 'achromatomaly'
    | 'low-contrast';
};
