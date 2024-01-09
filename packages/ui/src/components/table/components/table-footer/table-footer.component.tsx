import React, { useContext } from 'react';

import { TableContext } from '../../table.component.js';

import { styles as footerStyles } from './table-footer.styles.js';
import { type TableFooterProps } from './table-footer.types.js';

export function TableFooter({ className, children, colspan, ...props }: TableFooterProps) {
  const { bordered } = useContext(TableContext);
  const styles = footerStyles({ bordered });
  return (
    <tfoot {...props}>
      <tr>
        <td className={styles.base({ className })} colSpan={colspan}>
          {children}
        </td>
      </tr>
    </tfoot>
  );
}

TableFooter.displayName = 'Table.Footer';
