'use client';

import { ProgressRopeProps } from '@westpac/ui';
import { create } from 'zustand';

type SidebarContextType = {
  open: boolean;
  ropeData?: ProgressRopeProps['data'];
  ropeStep: number;
  setOpen: (open: boolean) => unknown;
  setRopeData: (ropeData: ProgressRopeProps['data']) => unknown;
  setRopeStep: (ropeStep: number) => unknown;
};

export const useSidebar = create<SidebarContextType>(set => ({
  open: false,
  ropeData: undefined,
  ropeStep: 0,
  setOpen: (open: boolean) => set({ open }),
  setRopeData: (ropeData: ProgressRopeProps['data']) => set({ ropeData }),
  setRopeStep: (ropeStep: number) => set({ ropeStep }),
}));
