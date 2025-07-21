import { Breakpoint } from '../../tailwind/index.js';

export function getSiblingOrBoundaryCount(
  count: Partial<Record<Breakpoint | 'initial', number>>,
  breakpoint: Breakpoint | 'initial',
) {
  const finalBreakPoint = [breakpoint, 'initial', 'xsl', 'sm', 'md', 'lg', 'xl'].find(
    currentBreakpoint => count[currentBreakpoint as Breakpoint | 'initial'] !== undefined,
  ) as Breakpoint | 'initial';
  return count[finalBreakPoint] || 0;
}
