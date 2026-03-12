import { List, ListItem } from '@westpac/ui';

import { type LinkListProps } from './link-list.types';

export const LinkList = ({ links }: LinkListProps) => {
  return (
    <List
      look="primary"
      className={`
        col-span-12 mb-7
        xsl:col-span-10 xsl:col-start-2 xsl:mb-9
        md:col-span-8 md:col-start-3
        [&:has(+_p,_+_ul,_+_ol)]:mb-2
      `}
    >
      {links.map(link => (
        <ListItem type="link" href={link.url} target={link.type} key={link.label}>
          {link.label}
        </ListItem>
      ))}
    </List>
  );
};
