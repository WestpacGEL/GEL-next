export const generateAriaDescription = (id: string, selected: string, length: number, results: number) => {
  if (id === selected) return `${id} of ${length} filters. ${results} results found.`;
  return `${id} of ${length} filters. Double tap to activate. ${results} results found.`;
};
