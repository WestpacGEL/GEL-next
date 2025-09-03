import { useEffect, useState } from 'react';

import { BREAKPOINTS, Breakpoint } from '../tailwind/constants/index.js';

function checkBreakpoint(): Breakpoint | 'initial' {
  if (typeof window === 'undefined') {
    return 'initial';
  }
  const breakpointsAsArray = Object.entries(BREAKPOINTS).reverse() as [Breakpoint, string][];
  const breakpoint = breakpointsAsArray.find(([, value]) => window.matchMedia(`(min-width: ${value})`).matches) as [
    Breakpoint,
    string,
  ];
  return breakpoint ? breakpoint[0] : 'initial';
}

const BREAKPOINTS_ENTRIES = Object.entries(BREAKPOINTS);
const BREAKPOINTS_MEDIA: Record<Breakpoint | 'initial', string> = BREAKPOINTS_ENTRIES.reduce(
  (acc, [key, value], index) => {
    const finalValue = (() => {
      const nextBreakpoint = BREAKPOINTS_ENTRIES[index + 1];
      if (nextBreakpoint) {
        return `(min-width: ${value}) and (max-width: ${+nextBreakpoint[1].replace('px', '') - 1}px)`;
      }
      return `(min-width: ${value})`;
    })();

    return {
      ...acc,
      [key]: finalValue,
    };
  },
  {
    initial: `(max-width: ${+BREAKPOINTS_ENTRIES[0][1].replace('px', '') - 1}px)`,
  } as Record<Breakpoint | 'initial', string>,
);

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | 'initial'>(checkBreakpoint());

  useEffect(() => {
    const listeners = Object.entries(BREAKPOINTS_MEDIA).map(([label, query]) => {
      const mq = window.matchMedia(query);
      const listener = (e: MediaQueryListEvent) => {
        if (e.matches) {
          setBreakpoint(label as Breakpoint);
        }
      };
      mq.addEventListener('change', listener);
      return {
        mq,
        listener,
      };
    });

    return () => {
      listeners.forEach(({ mq, listener }) => {
        mq.removeEventListener('change', listener);
      });
    };
  }, []);

  return breakpoint;
}
