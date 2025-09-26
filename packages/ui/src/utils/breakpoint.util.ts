import { Breakpoint, BREAKPOINTS } from '../tailwind/constants/index.js';

const BREAKPOINTS_DECRESCENT = Object.keys(BREAKPOINTS).reverse();

export function ensureBreakpoint(breakpointsProvided: (Breakpoint | 'initial')[], breakpoint: Breakpoint | 'initial') {
  const currentBreakpointIndex = BREAKPOINTS_DECRESCENT.findIndex(bp => bp === breakpoint);
  const finalBreakPoint = [breakpoint, ...BREAKPOINTS_DECRESCENT.slice(currentBreakpointIndex), 'initial'].find(
    currentBreakpoint => breakpointsProvided.includes(currentBreakpoint as Breakpoint | 'initial'),
  ) as Breakpoint | 'initial';
  return finalBreakPoint;
}

export function resolveResponsiveVariant<T = any>(
  variant: Partial<Record<Breakpoint | 'initial', T>> | T,
  breakpoint: Breakpoint | 'initial',
) {
  if (typeof variant !== 'object') {
    return variant;
  }
  const finalBreakpoint = ensureBreakpoint(
    Object.keys(variant as Record<Breakpoint | 'initial', T>) as (Breakpoint | 'initial')[],
    breakpoint,
  );
  return (variant as Record<Breakpoint | 'initial', T>)[finalBreakpoint];
}
