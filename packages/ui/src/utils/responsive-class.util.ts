import { type Breakpoint } from '@westpac/style-config/constants';

type ResponsiveMap = Record<'initial' | Breakpoint, Record<string | number, string>>;

type ResponsiveValue<T extends string | number> = Partial<Record<Breakpoint | 'initial', T>> | T | undefined;

function resolveClasses<T extends string | number>(breakpoints: ResponsiveValue<T>, map: ResponsiveMap): string {
  if (breakpoints == null) return '';

  if (typeof breakpoints !== 'object') {
    return map.initial[breakpoints] ?? '';
  }

  const classes: string[] = [];

  for (const [breakpoint, val] of Object.entries(breakpoints)) {
    if (val == null) continue;
    const className = map[breakpoint as 'initial' | Breakpoint]?.[val];
    if (className) classes.push(className);
  }

  return classes.join(' ');
}

/**
 * This function is to be used when you need responsive classes that are based on a defined map of values to classes for each breakpoint, it will resolve the correct classes based on the provided value and map.
 * This is useful for components like the Grid where managing styles with JS can cause issues with SSR and things visually jumping on the client after hydration when the correct breakpoint classes are applied.
 * @param entries - [breakpoints, map] tuples where breakpoints is the responsive value to resolve and map is the mapping of values to classes for each breakpoint
 * @param className - any additional classes to include
 * @returns a string of resolved class names based on the provided breakpoints and maps
 */
export function responsiveClasses(
  entries: [breakpoints: ResponsiveValue<string | number>, map: ResponsiveMap][],
  className?: string,
): string {
  return [...entries.map(([breakpoints, map]) => resolveClasses(breakpoints, map)), className]
    .filter(Boolean)
    .join(' ');
}
