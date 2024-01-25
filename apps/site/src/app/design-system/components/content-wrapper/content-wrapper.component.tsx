'use client';

import { useEffect, useRef } from 'react';

import { useSidebar } from '../sidebar/sidebar.context';

export function ContentWrapper({ children }: { children: React.ReactNode }) {
  const { linkClicked, setLinkClicked } = useSidebar();
  const contentRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (linkClicked) {
      contentRef.current?.focus();
      setLinkClicked(false);
    }
  }, [linkClicked, setLinkClicked]);

  return (
    <div
      className="mb-8 flex flex-1 flex-col focus:outline-none lg:ml-[18.75rem]"
      id="content"
      ref={contentRef}
      tabIndex={-1}
    >
      {children}
    </div>
  );
}
