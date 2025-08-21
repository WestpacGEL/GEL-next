import { BREAKPOINTS, Breakpoint } from '../../tailwind/constants/index.js';

const BREAKPOINTS_DECRESCENT = Object.keys(BREAKPOINTS).reverse();
export function getSiblingOrBoundaryCount(
  count: Partial<Record<Breakpoint | 'initial', number>>,
  breakpoint: Breakpoint | 'initial',
) {
  const currentBreakpointIndex = BREAKPOINTS_DECRESCENT.findIndex(bp => bp === breakpoint);
  const finalBreakPoint = [breakpoint, ...BREAKPOINTS_DECRESCENT.slice(currentBreakpointIndex), 'initial'].find(
    currentBreakpoint => count[currentBreakpoint as Breakpoint | 'initial'] !== undefined,
  ) as Breakpoint | 'initial';
  return count[finalBreakPoint] || 0;
}
