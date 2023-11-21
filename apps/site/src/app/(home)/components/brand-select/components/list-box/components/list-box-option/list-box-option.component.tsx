import { type Node } from '@react-types/shared';
import Link from 'next/link';
import * as React from 'react';
import { AriaLinkOptions, useLink, useOption } from 'react-aria';
import { type ListState } from 'react-stately';

import { styles as listBoxStyles } from './list-box-option.styles';

type OptionProps<T = any> = {
  item: Node<AriaLinkOptions>;
  state: ListState<T>;
};

export function Option({ item, state }: OptionProps) {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const { isDisabled, isSelected, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref,
  );
  const { linkProps } = useLink(item.props, ref);
  const styles = listBoxStyles({ isFocused, isSelected, isDisabled });

  return (
    <li className={styles.base({})}>
      <Link {...linkProps} href={item.props.href} className={styles.link({})} ref={ref}>
        {item.rendered}
      </Link>
    </li>
  );
}
