'use client';

import { Breakpoint, BREAKPOINTS } from '@westpac/style-config/constants';
import { useEffect } from 'react';
import { create } from 'zustand';

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

type BreakpointState = {
  breakpoint: Breakpoint | 'initial';
  mediaQueryListeners:
    | {
        mq: MediaQueryList;
        listener: (e: MediaQueryListEvent) => void;
      }[]
    | null;
  initialised: boolean;
  ensureInitialized: () => void;
  removeListeners: () => void;
};

<<<<<<< HEAD
export const useThemeStore = create<BreakpointState>()((set, get) => ({
=======
const useBreakpointStore = create<BreakpointState>()((set, get) => ({
>>>>>>> main
  breakpoint: 'initial',
  mediaQueryListeners: null,
  initialised: false,
  ensureInitialized: () => {
    if (get().initialised) {
      return;
    }
    const listeners = Object.entries(BREAKPOINTS_MEDIA).map(([label, query]) => {
      const mq = window.matchMedia(query);
      const listener = (e: MediaQueryListEvent) => {
        if (e.matches) {
          set({ breakpoint: label as Breakpoint });
        }
      };
      mq.addEventListener('change', listener);
      return {
        mq,
        listener,
      };
    });
    set({ mediaQueryListeners: listeners, initialised: true, breakpoint: checkBreakpoint() });
  },
  removeListeners: () => {
    get().mediaQueryListeners?.forEach(({ mq, listener }) => {
      mq.removeEventListener('change', listener);
    });
  },
}));

export function useBreakpoint() {
<<<<<<< HEAD
  const { breakpoint, ensureInitialized: initIfNotInitialised } = useThemeStore();
  useEffect(() => {
    initIfNotInitialised();
    // eslint-disable-next-line react-hooks/exhaustive-deps
=======
  const { breakpoint, ensureInitialized: initIfNotInitialised } = useBreakpointStore();
  useEffect(() => {
    initIfNotInitialised();
>>>>>>> main
  }, []);

  return breakpoint;
}
