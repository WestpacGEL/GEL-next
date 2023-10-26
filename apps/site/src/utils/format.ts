export function formatComponentSlug(component: string) {
  const name = component[0].toUpperCase() + component.slice(1);
  return name.replace(/-/g, ' ');
}

export function formatNavItems(navList: string[]) {
  return navList.map(component => {
    return {
      label: component,
      path: `components/${component}`,
    };
  });
}
