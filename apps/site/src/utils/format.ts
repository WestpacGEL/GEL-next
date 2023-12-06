import { Item } from '@/app/design-system/components/sidebar/components/navigation/navigation.types';

export function formatComponentSlug(component: string) {
  return component[0].toUpperCase() + component.slice(1);
}

export function formatNavItems(navList: { name: string; slug: string }[]) {
  const navItems: any[] = [];

  navList.forEach(({ slug, name }) => {
    const params = slug.split('/');
    let curr = navItems;
    params.forEach((param, i) => {
      if (i === params.length - 1) {
        curr.push({ label: name, path: slug });
      } else {
        let exists = false;
        curr.forEach(item => {
          if (item.label === param) {
            exists = true;
            curr = item.children;
          }
        });
        if (!exists) {
          const newNode = { label: param, children: [] };
          curr.push(newNode);
          curr = newNode.children;
        }
      }
    });
  });
  return navItems;
}

// This had to be made as a separate function as adding some to formatNavItems too cognitively complex
export function sortMenu(menuItems: Item[]) {
  const topLevelMenuOrder = [
    'accessibility',
    'foundation',
    'components',
    'patterns',
    'development',
    'content',
    'design tokens',
  ];

  const orderedMenu: Item[] = [];
  topLevelMenuOrder.forEach(item =>
    menuItems.forEach(menuItem => {
      if (item === menuItem.label.toLowerCase()) {
        orderedMenu.push(menuItem);
      }
    }),
  );
  return orderedMenu;
}
