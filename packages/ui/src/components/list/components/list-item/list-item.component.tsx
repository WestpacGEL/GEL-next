'use client';

import React, { Ref, forwardRef, useContext, useMemo } from 'react';
import { useFocusRing } from 'react-aria';

import { ListContext } from '../../list.component.js';
import { getStateValues } from '../../list.utils.js';

import { styles as itemStyles } from './list-item.styles.js';
import { type ListItemProps } from './list-item.types.js';

export function BaseListItem(
  { className, children, href, target, look, type, spacing, icon, linkComponent, ...props }: ListItemProps,
  ref: Ref<HTMLAnchorElement>,
) {
  const state = useContext(ListContext);

  const stateValues = getStateValues({ look, type, spacing, state, icon });

  look = stateValues.look;
  type = stateValues.type;
  const Icon = stateValues.icon;
  const { isFocusVisible, focusProps } = useFocusRing();

  const styles = itemStyles({
    look,
    type,
    spacing: stateValues.spacing,
    icon: !!Icon,
    nested: (state.nested && state.nested > 0) || false,
    isFocusVisible,
  });

  const bulletToRender = () => {
    if (type === 'ordered' || type === 'unstyled') {
      return null;
    }
    if ((type === 'icon' || type === 'link') && Icon) {
      return (
        <Icon size="small" className={styles.bullet()} color={look === 'link' ? 'primary' : look} data-testid={type} />
      );
    }
    return <div className={styles.bullet()} data-testid={type} />;
  };

  const LinkComponent = useMemo(() => {
    return linkComponent || 'a';
  }, [linkComponent]);

  return (
    <li className={styles.base({ className })} {...props} key={state.nested}>
      {bulletToRender()}
      {type === 'link' ? (
        <LinkComponent href={href} target={target} className={styles.link()} ref={ref} {...focusProps}>
          {children}
        </LinkComponent>
      ) : (
        children
      )}
    </li>
  );
}

export const ListItem = forwardRef(BaseListItem);
ListItem.displayName = 'ListItem';
