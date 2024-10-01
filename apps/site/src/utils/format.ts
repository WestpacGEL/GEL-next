import { Item } from '@/app/design-system/components/sidebar/components/navigation/navigation.types';

export function formatComponentSlug(component: string) {
  const label = component.replace('-', ' ');
  return label[0].toUpperCase() + label.slice(1);
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

function orderMenu(menuItems: Item[], order: string[]) {
  const orderedMenu: Item[] = [];
  order.forEach(item =>
    menuItems.forEach(menuItem => {
      if (item === menuItem.label.toLowerCase()) {
        orderedMenu.push(menuItem);
      }
    }),
  );
  return orderedMenu;
}

// This had to be made as a separate function as adding some to formatNavItems too cognitively complex
export function sortMenu(menuItems: Item[]) {
  const topLevelMenuOrder = [
    'home',
    'get-started',
    'foundation',
    'components',
    'guides',
    'patterns',
    'accessibility',
    'content',
    'design tokens',
  ];

  return orderMenu(menuItems, topLevelMenuOrder);
}

export function sortDeveloperMenu(menuItems: Item[]) {
  const developersMenuOrder = ['set up', 'using components', 'using brands', 'eslint configuration', 'unit testing'];

  return orderMenu(menuItems, developersMenuOrder);
}
