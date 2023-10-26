type Item = {
  children?: Item[];
  label: string;
  path?: string;
};

export type SidebarProps = {
  items: Item[];
};
