export function formatComponentSlug(component: string) {
  const name = component[0].toUpperCase() + component.slice(1);
  return name.replace(/-/g, ' ');
}

export function formatNavItems(navList: string[]) {
  const navItems: any[] = [];
  navList.forEach(path => {
    const params = path.split('/');
    let curr = navItems;
    params.forEach((param, i) => {
      if (i === params.length - 1) {
        curr.push({ label: param, path });
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
