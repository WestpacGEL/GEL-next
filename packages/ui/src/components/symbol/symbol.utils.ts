import { type Align } from './symbol.types.js';

export function getTransform({ offset, align }: { align: Align; offset: (number | null)[] }) {
  const alignMap = {
    left: offset[0],
    center: offset[1],
    right: offset[2],
  };
  const translate = alignMap[align];

  return translate ? `translate(${translate})` : '';
}
