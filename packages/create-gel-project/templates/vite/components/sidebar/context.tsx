'use client';

import { type ProgressRopeProps } from '@westpac/ui';
import { create } from 'zustand';

type SidebarContextType = {
  open: boolean;
  ropeData?: ProgressRopeProps['data'];
  ropeStep: number;
  sidebarScrolled: boolean;
  setOpen: (open: boolean) => unknown;
  setRopeData: (ropeData: ProgressRopeProps['data']) => unknown;
  setRopeStep: (ropeStep: number) => unknown;
  setSidebarScrolled: (sidebarScrolled: boolean) => unknown;
};

export const useSidebar = create<SidebarContextType>(set => ({
  open: false,
  ropeData: undefined,
  ropeStep: 0,
  sidebarScrolled: false,
  setOpen: (open: boolean) => set({ open }),
  setRopeData: (ropeData: ProgressRopeProps['data']) => set({ ropeData }),
  setRopeStep: (ropeStep: number) => set({ ropeStep }),
  setSidebarScrolled: (sidebarScrolled: boolean) => set({ sidebarScrolled }),
}));
