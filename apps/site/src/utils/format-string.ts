export function pascalToKebab(str: string) {
  // Insert a hyphen before each capital letter, then convert to lowercase
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
