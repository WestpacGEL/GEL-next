import React, { useContext } from 'react';

import { TableContext } from '../../table.component.js';

import { styles as footerStyles } from './footer.styles.js';
import { type FooterProps } from './footer.types.js';

export function Footer({ className, children, colspan, ...props }: FooterProps) {
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
