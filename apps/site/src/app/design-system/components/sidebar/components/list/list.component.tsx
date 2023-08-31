'use client';

import { Accordion } from '@westpac/ui';
import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { getPathWithoutGetParameters } from '../../../../../../utils/url';
import { NavItem } from '../../sidebar.component';

import { ListProps } from './list.types';

type ListItemProps = {
  brand: ListProps['brand'];
  item: NavItem;
};
export const ListItem = ({ item, brand }: ListItemProps) => {
  const pathName = usePathname();
  const pathWithourGetParams = getPathWithoutGetParameters(pathName);
  const isHighlighted =
    item.href === '/' ? pathWithourGetParams === '/' : pathWithourGetParams.indexOf(item.href || '') > -1;
  return (
    <Link
      // href={brand ? `${item.href}?brand=${brand}` : item.href}
      href={brand ? `${item.href}?brand=${brand}` : '/'}
      className={clsx(
        'typography-body-10 block py-[14px] pl-6 pr-5 transition-colors duration-300 hover:bg-background focus:outline-focus',
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

// TODO: Re-write to properly style nested items, also using Accordion style which has a new style(material) which is currently not in GEL
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
              className="text-[pink]"
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
