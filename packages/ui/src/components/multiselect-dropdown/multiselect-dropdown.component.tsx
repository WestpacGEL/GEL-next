import Select, { components } from 'react-select';

import { MultiselectMultiValueContainer } from './components/multiselect-multi-value-container/multiselect-multi-value-container.component.js';
import { MultiselectOption } from './components/multiselect-option/multiselect-option.component.js';

const options = [
  { value: 'platinum', label: 'Altitude Platinum Rewards Card' },
  { value: 'black', label: 'Altitude Black Rewards Card' },
  { value: 'low-rate', label: 'Low Rate Credit Card' },
  { value: 'lite', label: 'Lite Credit Card' },
  { value: 'choice', label: 'Choice Bank Account with Debit Card' },
  { value: 'esaver', label: 'eSaver Online Savings Account' },
  { value: 'long', label: 'Very Long Titled Bank Account For Example Purposes' },
];

export function MultiselectDropdown({ textMultivalue }: { textMultivalue?: boolean }) {
  return (
    <Select
      options={options}
      isMulti
      // isSearchable={false}
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
      components={{
        MultiValueContainer: props => <MultiselectMultiValueContainer textMultivalue={textMultivalue} {...props} />,
        Input: components.Input,
        Option: MultiselectOption,
      }}
      // styles={
      //   {
      //     // valueContainer: provided => ({ ...provided, whiteSpace: 'nowrap', overflow: 'hidden', flexWrap: 'nowrap' }),
      //     // input: provided => ({
      //     //   ...provided,
      //     //   minWidth: '20%',
      //     // }),
      //     // multiValue: provided => ({
      //     //   ...provided,
      //     //   flexShrink: 0,
      //     //   background: textMultivalue ? 'none' : provided.background,
      //     // }),
      //     // multiValueLabel: provided => ({ ...provided, overflow: 'visible' }),
      //     // option: (provided, state) => ({
      //     //   ...provided,
      //     //   whiteSpace: 'nowrap',
      //     //   overflow: 'hidden',
      //     // }),
      //   }
      // }
    />
  );
}
