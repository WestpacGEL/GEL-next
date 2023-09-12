import React, { Children, ReactElement, cloneElement, createContext, useContext } from 'react';

import { Item } from './components/item/index.js';
import { styles as listStyles } from './list.styles.js';
import { ListContextState, type ListProps } from './list.types.js';
import { getStateValues } from './list.utils.js';

export const ListContext = createContext<ListContextState>({});

export function List({ assistiveText, className, children, look, nested, icon, type, spacing, ...props }: ListProps) {
  const state = useContext(ListContext);
  const Tag = type === 'ordered' ? 'ol' : 'ul';
  const stateValues = getStateValues({ look, type, spacing, state, icon });

  if (typeof nested !== 'number') {
    nested = (typeof state.nested === 'number' && state.nested + 1) || 0;
  }

  assistiveText =
    (type === 'tick' || type === 'cross') && nested === 0
      ? assistiveText || `The following items are ${type === 'tick' ? 'ticked' : 'crossed'}`
      : undefined;

  const styles = listStyles({ type: stateValues.type, nested: typeof state.nested === 'number' });

  return (
    <ListContext.Provider value={{ nested, ...stateValues }}>
      <Tag className={styles.base({ className })} {...props} role="list" aria-label={assistiveText}>
        {Children.map(children, (child, index) => cloneElement(child as ReactElement, { key: index }))}
      </Tag>
    </ListContext.Provider>
  );
}

List.Item = Item;
