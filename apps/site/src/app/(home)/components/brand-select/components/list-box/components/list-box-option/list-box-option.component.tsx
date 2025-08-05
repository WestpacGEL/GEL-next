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
      key: item.key as string | number,
    },
    state,
    ref,
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { linkProps } = useLink(item.props, ref);
  const styles = listBoxStyles({ isFocused, isSelected, isDisabled });

  return (
    <li className={styles.base({})}>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <Link {...linkProps} href={item.props.href as string} className={styles.link({})} ref={ref}>
        {item.rendered}
      </Link>
    </li>
  );
}
