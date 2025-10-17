import { components, OptionProps } from 'react-select';

import { styles as optionStyles } from './multiselect-options.styles.js';

export function MultiselectOption({ children, ...props }: OptionProps) {
  const { isSelected, isFocused } = props;
  const styles = optionStyles({ isSelected, isFocused });
  return (
    <components.Option {...props} className={styles}>
      <input type="checkbox" checked={isSelected} />
      {children}
    </components.Option>
  );
}
