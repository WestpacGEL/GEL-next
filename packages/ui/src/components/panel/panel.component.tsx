import React from 'react';

import { PanelBody, PanelFooter } from './components/index.js';
import { styles as panelStyles } from './panel.styles.js';
import { type PanelProps } from './panel.types.js';

export function Panel({ className, children, heading, headingTag: Tag = 'h1', look = 'hero', ...props }: PanelProps) {
  const styles = panelStyles({ look });
  return (
    <div className={styles.base({ className })} {...props}>
      <Tag className={styles.header()}>{heading}</Tag>
      {children}
    </div>
  );
}
Panel.Body = PanelBody;
Panel.Footer = PanelFooter;
