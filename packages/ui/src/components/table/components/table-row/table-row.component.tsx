import React, { Children, ReactElement, cloneElement, useContext } from 'react';

import { TableContext } from '../../table.component.js';

import { styles as rowStyles } from './table-row.styles.js';
import { type TableRowProps } from './table-row.types.js';

const generateHighlightMap = (highlighted: unknown[], tdCount: number): boolean[] => {
  const map = Array(tdCount).fill(false) as boolean[];

  highlighted.forEach(highlight => {
    if (typeof highlight === 'number') {
      map[highlight] = true;
    } else if (Array.isArray(highlight)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      map.fill(true, highlight[0], highlight[1] + 1);
    }
  });

  return map;
};

export function TableRow({ className, children, highlighted, ...props }: TableRowProps) {
  let highlightedChildren;
  const highlightedRow = typeof highlighted === 'boolean';

  if (Array.isArray(highlighted)) {
    const highlightMap = generateHighlightMap(highlighted, Children.count(children));

    // eslint-disable-next-line sonarjs/function-return-type
    highlightedChildren = Children.map(children, (child, index) => {
      if (highlightMap[index] === true) {
        if (index === 0 || highlightMap[index - 1] === false) {
          return cloneElement(child as ReactElement, { highlightStart: true, highlighted: true });
        } else {
          return cloneElement(child as ReactElement, { highlighted: true });
        }
      } else {
        return child;
      }
    });
  }

  const { striped } = useContext(TableContext);
  const styles = rowStyles({ striped, highlightedRow });
  return (
    <tr className={styles.base({ className })} {...props}>
      {highlightedChildren || children}
    </tr>
  );
}
