import { type BrandKey } from '@/app/types/brand.types';

export type Item = {
  children?: Item[];
  label: string;
  path?: string;
};

export type NavigationProps = {
  brand: BrandKey;
  items: Item[];
};
export type ListProps = {
  brand: BrandKey;
  crumbs: string[];
  items: Item[];
  level?: number;
};

export type ItemProps = {
  brand: BrandKey;
  crumbs: string[];
  label: string;
  level: number;
  path: string | undefined;
};

export type GroupProps = {
  children: React.ReactNode;
  crumbs: string[];
  label: string;
  level: number;
};

export type Level = '0' | '1' | '2';
