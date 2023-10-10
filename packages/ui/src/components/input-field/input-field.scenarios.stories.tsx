import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { useCallback, useMemo, useState } from 'react';

import { CloseIcon, RefreshIcon, SearchIcon, VisibilityIcon, VisibilityOffIcon } from '../icon/index.js';
import { Button, Input, Select, Textarea } from '../index.js';

import { InputField } from './input-field.component.js';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField/Scenarios',
  component: InputField,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Number of dependents
 */
export const NumberStepper: Story = {
  args: {},
  render: () => {
    const [numberOfDependents, setNumberOfDependents] = useState(0);
    const minusButton = useCallback(() => setNumberOfDependents(state => --state), []);
    const plusButton = useCallback(() => setNumberOfDependents(state => ++state), []);

    return (
      <InputField
        label="Number of dependents"
        before={<Button onClick={minusButton}>-</Button>}
        after={<Button onClick={plusButton}>+</Button>}
      >
        <Input value={numberOfDependents} />
      </InputField>
    );
  },
};

/**
 * > Masked characters in field
 */
export const MaskedCharacters: Story = {
  args: {},
  render: () => {
    const [typeInput, setTypeInput] = useState<'password' | 'text'>('password');
    const toggleType = useCallback(() => setTypeInput(state => (state === 'password' ? 'text' : 'password')), []);

    return (
      <InputField
        label="Password"
        after={{
          inset: true,
          element: (
            <Button
              onClick={toggleType}
              look="link"
              iconAfter={typeInput === 'password' ? VisibilityIcon : VisibilityOffIcon}
              iconColor="muted"
            />
          ),
        }}
      >
        <Input type={typeInput} />
      </InputField>
    );
  },
};

/**
 * > Search with left icon and clear button
 */
export const SearchWithLeftIconAndClearButton: Story = {
  args: {},
  render: () => {
    const [inputValue, setInputValue] = useState<string>('');
    const clearInput = useCallback(() => setInputValue(''), []);

    return (
      <InputField
        label="Search"
        before={{
          icon: SearchIcon,
        }}
        after={{
          inset: true,
          element: <Button onClick={clearInput} look="link" iconAfter={CloseIcon} iconColor="muted" />,
        }}
      >
        <Input onChange={({ target: { value } }) => setInputValue(value)} value={inputValue} />
      </InputField>
    );
  },
};

/**
 * > Inline field validation flow
 */
export const InlineFieldValidationFlow: Story = {
  args: {},
  render: () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [validating, setValidating] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const validate = useCallback(() => {
      setValidating(true);
      setError(undefined);
      setTimeout(() => {
        if (inputValue !== '647453') {
          setError('Routing number not found');
        }
        setValidating(false);
      }, 1500);
    }, [inputValue]);

    return (
      <InputField
        label="Enter ABA routing number"
        hint="For a valid response use: 647453, all other numbers will show the invalid response"
        after={validating ? { icon: RefreshIcon } : <Button onClick={validate}>Check</Button>}
        errorMessage={error}
      >
        <Input invalid={!!error} onChange={({ target: { value } }) => setInputValue(value)} value={inputValue} />
      </InputField>
    );
  },
};
/**
 * > Search Currency and frequency
 */
export const CurrencyAndFrequency: Story = {
  args: {},
  render: () => {
    const [inputValue, setInputValue] = useState<string>('');

    return (
      <InputField
        label="Salary"
        before="$AUD"
        after={
          <Select>
            <option>Select</option>
            <option>Per Year</option>
            <option>Per Month</option>
            <option>Per Week</option>
          </Select>
        }
      >
        <Input onChange={({ target: { value } }) => setInputValue(value)} value={inputValue} />
      </InputField>
    );
  },
};
/**
 * > Search Textarea with character count
 */
const MAX_LENGTH = 250;
export const TextareaWithCharacterCount: Story = {
  args: {},
  render: () => {
    const [inputValue, setInputValue] = useState<string>('');
    const counterText = useMemo(() => {
      const lengthLeft = MAX_LENGTH - inputValue.length;
      return `${lengthLeft} remaining`;
    }, [inputValue]);

    return (
      <InputField label="Comments" hint="I am a hint" supportingText={counterText}>
        <Textarea onChange={({ target: { value } }) => setInputValue(value)} value={inputValue} />
      </InputField>
    );
  },
};
