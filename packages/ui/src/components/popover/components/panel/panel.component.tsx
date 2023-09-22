import React from 'react';
import { FocusScope } from 'react-aria';

import { Button } from '../../../button/index.js';
import { CloseIcon } from '../../../icon/index.js';

import { styles as panelStyles } from './panel.styles.js';
import { type PanelProps } from './panel.types.js';

export function Panel({ state, heading, headingTag: Tag = 'h1', content, placement = 'top', id }: PanelProps) {
  const styles = panelStyles({ placement });

  return (
    <FocusScope restoreFocus>
      <div className={styles.popover()} id={id}>
        <div className={styles.content()}>
          <Tag className={styles.heading()}>{heading}</Tag>
          <div className={styles.body()}>{content}</div>
          <Button
            look="link"
            onClick={state.close}
            className={styles.closeBtn()}
            iconAfter={() => <CloseIcon color="muted" size="small" aria-hidden />}
            aria-label="Close popover"
          />
        </div>
        <div aria-hidden className={styles.arrow()} />
      </div>
    </FocusScope>
  );
}
