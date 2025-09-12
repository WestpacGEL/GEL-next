import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';
import { Breakpoint } from '../../tailwind/constants/index.js';

export function getSiblingOrBoundaryCount(
  count: Partial<Record<Breakpoint | 'initial', number>>,
  breakpoint: Breakpoint | 'initial',
) {
  return resolveResponsiveVariant(count, breakpoint) || 0;
}
