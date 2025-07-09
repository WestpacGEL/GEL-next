import { useEffect, useState } from 'react';

import { BREAKPOINTS, Breakpoint } from '../tailwind/index.js';

function checkBreakpoint(): Breakpoint | 'initial' {
  const breakpointsAsArray = Object.entries(BREAKPOINTS).reverse() as [Breakpoint, string][];
  const breakpoint = breakpointsAsArray.find(([, value]) => window.matchMedia(`(min-width: ${value})`).matches) as [
    Breakpoint,
    string,
  ];
  return breakpoint ? breakpoint[0] : 'initial';
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | 'initial'>(checkBreakpoint());

  useEffect(() => {
    const listener = () => {
      const breakpoint = checkBreakpoint();
      setBreakpoint(breakpoint);
    };
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  return breakpoint;
}
