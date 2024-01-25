'use client';

import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

type SidebarContextType = {
  linkClicked: boolean | null;
  open: boolean | null;
  setLinkClicked: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
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
  const [open, setOpen] = useState(false);
  const [linkClicked, setLinkClicked] = useState(false);

  return (
    <SidebarContext.Provider value={{ linkClicked, setLinkClicked, open, setOpen }}>{children}</SidebarContext.Provider>
  );
}
