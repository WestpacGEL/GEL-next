import { Breakpoint } from '@westpac/style-config/constants';

import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';

export function getSiblingOrBoundaryCount(
  count: Partial<Record<Breakpoint | 'initial', number>>,
  breakpoint: Breakpoint | 'initial',
) {
  return resolveResponsiveVariant(count, breakpoint) || 0;
}
