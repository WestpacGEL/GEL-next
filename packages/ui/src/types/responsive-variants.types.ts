import { Breakpoint } from '@westpac/style-config/constants';

export type ResponsiveVariants<T> = Partial<Record<Breakpoint | 'initial', T>> | T;
