'use client';

import React, { Children, createContext, isValidElement, useContext, useMemo } from 'react';

import { useBreakpoint } from '../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';
import { Button } from '../button/index.js';
import { AddCircleIcon, IconProps } from '../icon/index.js';

import { type RepeaterProps } from './repeater.types.js';

type RepeaterContextType = {
  totalItems: number;
  separator?: boolean;
};

const RepeaterContext = createContext<RepeaterContextType | null>(null);

export const useRepeater = () => {
  const context = useContext(RepeaterContext);
  if (!context) {
    throw new Error('Cannot call useRepeaterContext from outside of RepeaterContextProvider');
  }
  return context;
};

export function Repeater({ children, onAdd, addText = 'Add another item', separator, ...props }: RepeaterProps) {
  const breakpoint = useBreakpoint();
  const resolvedSeparator = resolveResponsiveVariant(separator, breakpoint);

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
    <RepeaterContext.Provider value={{ totalItems: finalChildren?.length || 0, separator: resolvedSeparator }}>
      <div {...props}>
        <ul className="m-0 list-none pl-0">{finalChildren}</ul>
        {onAdd && (
          <Button
            type="button"
            className="mt-2 h-auto p-0 no-underline hover:underline"
            iconBefore={(props: IconProps) => <AddCircleIcon {...props} aria-hidden look="outlined" />}
            look="link"
            size="small"
            soft
            onClick={() => onAdd()}
          >
            {addText}
          </Button>
        )}
      </div>
    </RepeaterContext.Provider>
  );
}
