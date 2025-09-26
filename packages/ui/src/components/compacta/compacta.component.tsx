'use client';

import React, { Children, createContext, isValidElement, useContext, useMemo } from 'react';

import { Button } from '../button/index.js';
import { AddCircleIcon, IconProps } from '../icon/index.js';

import { type CompactaProps } from './compacta.types.js';

type CompactaContextType = {
  totalItems: number;
};

const CompactaContext = createContext<CompactaContextType | null>(null);

export const useCompacta = () => {
  const context = useContext(CompactaContext);
  if (!context) {
    throw new Error('Cannot call useCompactaContext from outside of CompactaContextProvider');
  }
  return context;
};

export function Compacta({ children, onAdd, addText = 'Add another', ...props }: CompactaProps) {
  const finalChildren = useMemo(() => {
    return Children.map(children, (child, index) => {
      if (isValidElement(child)) {
        return {
          ...child,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          props: { ...child.props, index },
          index,
        };
      }
      return null;
    })?.filter(item => item);
  }, [children]);

  return (
    <CompactaContext.Provider value={{ totalItems: finalChildren?.length || 0 }}>
      <div {...props}>
        {finalChildren}
        {onAdd && (
          <Button
            type="button"
            className="h-auto p-0 no-underline hover:underline"
            iconBefore={(props: IconProps) => <AddCircleIcon {...props} aria-hidden look="outlined" />}
            look="link"
            size="small"
            soft
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
            onClick={() => onAdd()}
          >
            {addText}
          </Button>
        )}
      </div>
    </CompactaContext.Provider>
  );
}
