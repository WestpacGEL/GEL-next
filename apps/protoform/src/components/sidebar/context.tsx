'use client';

import { ProgressRopeProps } from '@westpac/ui';
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

type SidebarContextType = {
  open: boolean | null;
  ropeData: ProgressRopeProps['data'];
  ropeStep: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setRopeData: Dispatch<SetStateAction<ProgressRopeProps['data']>>;
  setRopeStep: Dispatch<SetStateAction<number>>;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('Cannot call useSidebarContext from outside of SidebarContextProvider');
  }

  return context;
};

export function SidebarContextProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  const [ropeData, setRopeData] = useState<ProgressRopeProps['data']>(undefined);
  const [ropeStep, setRopeStep] = useState<number>(0);

  return (
    <SidebarContext.Provider value={{ open, setOpen, ropeData, setRopeData, ropeStep, setRopeStep }}>
      {children}
    </SidebarContext.Provider>
  );
}
