import { BrandKey } from '@/app/types/brand.types';

type Item = {
  children?: Item[];
  label: string;
  path?: string;
};

export type SidebarProps = {
  brand: BrandKey;
  items: Item[];
};
