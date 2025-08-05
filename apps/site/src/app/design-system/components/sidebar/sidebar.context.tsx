'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

type SidebarContextType = { open: boolean | null; setOpen: Dispatch<SetStateAction<boolean>> };

const SidebarContext = createContext<SidebarContextType | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('Cannot call useSidebarContext from outside of SidebarContextProvider');
  }

  return context;
};

export function SidebarContextProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return <SidebarContext.Provider value={{ open, setOpen }}>{children}</SidebarContext.Provider>;
}
