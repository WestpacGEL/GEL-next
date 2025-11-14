import { Breakpoint, BREAKPOINTS } from '@westpac/style-config/constants';

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

type Key = string | number | symbol;

// eslint-disable-next-line sonarjs/function-return-type
export function resolveSimpleResponsiveVariant<T extends Key = Key>(
  value: Partial<Record<Breakpoint | 'initial', T>> | T | undefined,
  variant: Record<Breakpoint | 'initial', Partial<Record<T, string>>>,
) {
  if (!value) {
    return '';
  }
  if (typeof value !== 'object') {
    return variant['initial'][value];
  }
  return Object.entries(value).reduce((acc, [key, value]) => {
    const finalValue = variant[key as Breakpoint | 'initial'][value];
    return [acc, finalValue].join(' ');
  }, '');
}
