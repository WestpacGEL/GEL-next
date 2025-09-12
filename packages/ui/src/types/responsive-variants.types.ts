import { Breakpoint } from 'src/tailwind/index.js';

export type ResponsiveVariants<T> = Partial<Record<Breakpoint | 'initial', T>> | T;
