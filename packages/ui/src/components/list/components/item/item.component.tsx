import React, { useContext } from 'react';

import { ListContext } from '../../list.component.js';
import { getStateValues } from '../../list.utils.js';

import { styles as itemStyles } from './item.styles.js';
import { type ItemProps } from './item.types.js';

export function Item({ className, children, href, look, type, spacing, icon, ...props }: ItemProps) {
  const state = useContext(ListContext);

  const stateValues = getStateValues({ look, type, spacing, state, icon });

  look = stateValues.look;
  type = stateValues.type;
  const Icon = stateValues.icon;

  const styles = itemStyles({
    look,
    type,
    spacing: stateValues.spacing,
    icon: !!Icon,
    nested: (state.nested && state.nested > 0) || false,
  });

  const bulletToRender = () => {
    if (type === 'ordered' || type === 'unstyled') {
      return null;
    }
    if ((type === 'icon' || type === 'link') && Icon) {
      return <Icon size="small" className={styles.bullet()} color={look} data-testid={type} />;
    }
    return <div className={styles.bullet()} data-testid={type} />;
  };

  return (
    <div className={styles.wrapper()} key={state.nested}>
      {bulletToRender()}
      <li className={styles.base({ className })} {...props}>
        {type === 'link' ? (
          <a href={href} className={styles.link()}>
            {children}
          </a>
        ) : (
          children
        )}
      </li>
    </div>
  );
}
