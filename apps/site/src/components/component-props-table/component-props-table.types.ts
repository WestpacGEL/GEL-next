import { ComponentProps, TableProps } from '@westpac/ui';

export type ComponentPropsTableProps = {
  caption?: string;
  componentProps: ComponentProps;
} & TableProps;
