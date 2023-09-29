import { GetStateValuesProps } from './list.types.js';

export const getStateValues = (props: GetStateValuesProps) => {
  const { state } = props;
  let { type, look, spacing, icon } = props;

  type = type || (state && state.type) || 'bullet';
  look = look || (state && state.look) || (type === 'link' && 'link') || 'hero';
  spacing = spacing || (state && state.spacing) || 'medium';
  icon = icon || (state && state.icon);

  return { type, look, spacing, icon };
};
