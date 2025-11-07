import { type Meta, StoryFn } from '@storybook/react-vite';
import { useCallback, useMemo, useState } from 'react';

import { ClearIcon, RefreshIcon, SearchIcon, VisibilityIcon, VisibilityOffIcon } from '../icon/index.js';
import { Button, Input, Select, Textarea } from '../index.js';

import { InputGroup } from './input-group.component.js';

const FRENCH_FLAG = (
  <svg className="size-4" viewBox="0 0 640 480" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="French flag">
    <path d="M0 0H640V480H0V0Z" fill="white" />
    <path d="M0 0H213.3V480H0V0Z" fill="#002654" />
    <path d="M426.7 0H640V480H426.7V0Z" fill="#CE1126" />
  </svg>
);

const AMERICAN_FLAG = (
  <svg xmlns="http://www.w3.org/2000/svg" className="size-4" aria-label="American flag" viewBox="0 0 6000 3900">
    <path d="M0,0h7410v3900H0" fill="#b31942" />
    <path d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0" stroke="#FFF" stroke-width="300" />
    <path d="M0,0h2964v2100H0" fill="#0a3161" />
    <g fill="#FFF">
      <g id="s18">
        <g id="s9">
          <g id="s5">
            <g id="s4">
              <path id="s" d="M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z" />
              <use xlinkHref="#s" y="420" />
              <use xlinkHref="#s" y="840" />
              <use xlinkHref="#s" y="1260" />
            </g>
            <use xlinkHref="#s" y="1680" />
          </g>
          <use xlinkHref="#s4" x="247" y="210" />
        </g>
        <use xlinkHref="#s9" x="494" />
      </g>
      <use xlinkHref="#s18" x="988" />
      <use xlinkHref="#s9" x="1976" />
      <use xlinkHref="#s5" x="2470" />
    </g>
  </svg>
);

const meta: Meta<typeof InputGroup> = {
  title: 'Components/InputGroup/Scenarios',
  component: InputGroup,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;

/**
 * > Number of dependents
 */
export const NumberStepper = () => {
  const [numberOfDependents, setNumberOfDependents] = useState(0);
  const minusButton = useCallback(() => setNumberOfDependents(state => --state), []);
  const plusButton = useCallback(() => setNumberOfDependents(state => ++state), []);

  return (
    <InputGroup
      label="Number of dependents"
      before={<Button onClick={minusButton}>-</Button>}
      after={<Button onClick={plusButton}>+</Button>}
    >
      <Input value={numberOfDependents} />
    </InputGroup>
  );
};

/**
 * > Masked characters in field
 */
export const MaskedCharacters = () => {
  const [typeInput, setTypeInput] = useState<'password' | 'text'>('password');
  const toggleType = useCallback(() => setTypeInput(state => (state === 'password' ? 'text' : 'password')), []);

  return (
    <InputGroup
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
    </InputGroup>
  );
};

/**
 * > Search with left icon and clear button
 */
export const SearchWithLeftIconAndClearButton = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const clearInput = useCallback(() => setInputValue(''), []);

  return (
    <InputGroup
      label="Search"
      before={{
        icon: SearchIcon,
      }}
      after={{
        inset: true,
        element: <Button onClick={clearInput} look="link" iconAfter={ClearIcon} iconColor="muted" />,
      }}
    >
      <Input onChange={({ target: { value } }) => setInputValue(value)} value={inputValue} />
    </InputGroup>
  );
};

/**
 * > Inline field validation flow
 */
export const InlineFieldValidationFlow = () => {
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
    <InputGroup
      label="Enter ABA routing number"
      hint="For a valid response use: 647453, all other numbers will show the invalid response"
      after={validating ? { icon: RefreshIcon } : <Button onClick={validate}>Check</Button>}
      errorMessage={error}
    >
      <Input invalid={!!error} onChange={({ target: { value } }) => setInputValue(value)} value={inputValue} />
    </InputGroup>
  );
};

/**
 * > Search Currency and frequency
 */
export const CurrencyAndFrequency = () => {
  const [inputSalaryValue, setInputSalaryValue] = useState<string>('');
  const [inputPaymentValue, setInputPaymentValue] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('EUR');

  const selectCurrency = (
    <div className="flex flex-row items-center justify-center rounded-l border border-border-muted-strong pl-2 focus-within:focus-outline">
      <span>{selectedCurrency === 'USD' ? AMERICAN_FLAG : FRENCH_FLAG}</span>
      <Select
        className="border-none !outline-none"
        value={selectedCurrency}
        onChange={e => setSelectedCurrency(e.target.value)}
      >
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
      </Select>
    </div>
  );

  return (
    <>
      <InputGroup
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
        <Input onChange={({ target: { value } }) => setInputSalaryValue(value)} value={inputSalaryValue} />
      </InputGroup>
      <InputGroup label="Payment Amount" before={selectCurrency}>
        <Input onChange={({ target: { value } }) => setInputPaymentValue(value)} value={inputPaymentValue} />
      </InputGroup>
    </>
  );
};

/**
 * > Search Textarea with character count.
 */
const MAX_LENGTH = 250;
export const TextareaWithCharacterCount = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const counterText = useMemo(() => {
    const lengthLeft = MAX_LENGTH - inputValue.length;
    return `${lengthLeft} remaining`;
  }, [inputValue]);

  return (
    <InputGroup label="Comments" hint="I am a hint" supportingText={counterText}>
      <Textarea onChange={({ target: { value } }) => setInputValue(value)} value={inputValue} />
    </InputGroup>
  );
};
