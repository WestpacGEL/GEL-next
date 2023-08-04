import { Accordion } from '@westpac/ui';
import { clsx } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { getPathWithoutGetParameters } from '../../utils/url';
import { NavItem } from '../layout/sidebar';

import { ListProps } from './list.types';

type ListItemProps = {
  brand: ListProps['brand'];
  item: NavItem;
};
export const ListItem = ({ item, brand }: ListItemProps) => {
  const router = useRouter();
  const pathWithourGetParams = getPathWithoutGetParameters(router.asPath);
  const isHighlighted =
    item.href === '/' ? pathWithourGetParams === '/' : pathWithourGetParams.indexOf(item.href || '') > -1;
  return (
    <Link
      href={brand ? `${item.href}?brand=${brand}` : item.href}
      className={clsx(
        'typography-body-10 flex items-center gap-4 rounded-md px-3 py-2 transition-colors duration-300 hover:bg-light focus:outline-focus',
        {
          'text-link': isHighlighted,
          'text-text': !isHighlighted,
        },
      )}
    >
      {!!item.icon && item.icon} {item.label}{' '}
    </Link>
  );
};

export const List = ({ brand, items }: ListProps) => {
  return (
    <>
      {items.map(item =>
        item.children?.length && !item.href ? (
          <Accordion look="material" key={item.label}>
            <Accordion.Item
              key={item.href}
              title={<div className="typography-body-10">{item.label}</div>}
              textValue={item.label}
            >
              <div className="-m-3 pl-3">
                <List items={item.children} brand={brand} />
              </div>
            </Accordion.Item>
          </Accordion>
        ) : (
          <ListItem item={item} brand={brand} key={item.label} />
        ),
      )}
    </>
  );
};
