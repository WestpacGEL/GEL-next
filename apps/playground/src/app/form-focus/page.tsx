'use client';

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  ButtonGroup,
  ButtonGroupButton,
  CheckboxGroup,
  DatePicker,
  type DatePickerProps,
  Field,
  Input,
  MultiSelect,
  MultiSelectItem,
  type MultiSelectValue,
  RadioGroup,
  Select,
  Selector,
  SelectorButtonOption,
  SelectorCheckbox,
  SelectorLabel,
  SelectorRadio,
  Switch,
  Textarea,
} from '@westpac/ui';
import { type FocusEvent, useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type DateValue = NonNullable<DatePickerProps['value']>;

type FormValues = {
  givenName: string;
  title: string;
  about: string;
  animal: string | null;
  colour: string | null;
  fruits: string[];
  account: string | null;
  features: string[];
  plan: string;
  period: string | null;
  dob: DateValue | null;
  interests: string[];
  terms: boolean;
};

type FieldName = keyof FormValues;

const FIELD_LABELS: Record<FieldName, string> = {
  givenName: 'Input',
  title: 'Select',
  about: 'Textarea',
  animal: 'Autocomplete',
  colour: 'RadioGroup',
  fruits: 'CheckboxGroup',
  account: 'Selector (radio)',
  features: 'Selector (checkbox)',
  plan: 'Selector (button)',
  period: 'ButtonGroup',
  dob: 'DatePicker',
  interests: 'MultiSelect',
  terms: 'Switch',
};

const FIELD_ORDER = Object.keys(FIELD_LABELS) as FieldName[];

const DEFAULT_VALUES: FormValues = {
  givenName: '',
  title: '',
  about: '',
  animal: null,
  colour: null,
  fruits: [],
  account: null,
  features: [],
  plan: '',
  period: null,
  dob: null,
  interests: [],
  terms: false,
};

const INTERESTS: MultiSelectValue[] = [
  { key: 'sport', textValue: 'Sport' },
  { key: 'music', textValue: 'Music' },
  { key: 'travel', textValue: 'Travel' },
];

const REQUIRED_MESSAGE = 'This field is required';

function isEmpty(value: unknown) {
  if (value === null || value === undefined || value === '' || value === false) return true;
  return Array.isArray(value) && value.length === 0;
}

function describeElement(element: Element | null) {
  if (!element) return 'nothing';
  const tag = element.tagName.toLowerCase();
  const attrs = ['type', 'role', 'name', 'value', 'id', 'aria-label']
    .map(name => {
      const value = element.getAttribute(name);
      return value ? `${name}="${value}"` : null;
    })
    .filter(Boolean)
    .join(' ');
  const text = element.textContent?.trim().slice(0, 30);
  const parts = [`<${tag}`, attrs, '>', text ? `"${text}"` : ''].filter(Boolean);
  return parts.join(' ');
}

export default function FormFocusPage() {
  const [required, setRequired] = useState<Record<FieldName, boolean>>(
    () => Object.fromEntries(FIELD_ORDER.map(name => [name, true])) as Record<FieldName, boolean>,
  );
  // Validation closures read the ref so toggling "required" does not need re-registration.
  const requiredRef = useRef(required);
  requiredRef.current = required;

  const [lastFocused, setLastFocused] = useState('nothing yet');
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, submitCount },
  } = useForm<FormValues>({ defaultValues: DEFAULT_VALUES });

  const rules = useCallback(
    (name: FieldName) => ({
      validate: (value: unknown) => !requiredRef.current[name] || !isEmpty(value) || REQUIRED_MESSAGE,
    }),
    [],
  );

  const onFocus = (event: FocusEvent<HTMLFormElement>) => {
    setLastFocused(describeElement(event.target));
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 p-8">
      <h1 className="typography-body-6 font-bold">react-hook-form focus-on-error</h1>
      <p>
        Submit with invalid values: react-hook-form calls <code>focus()</code> on the <code>ref</code> of the first
        invalid field. Untick fields below to make them optional so the first error lands on the component you want to
        test.
      </p>

      <fieldset className="flex flex-wrap gap-3 border p-4">
        <legend className="px-1 font-bold">Required fields</legend>
        {FIELD_ORDER.map(name => (
          <label key={name} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={required[name]}
              onChange={event => setRequired(prev => ({ ...prev, [name]: event.target.checked }))}
            />
            {FIELD_LABELS[name]}
          </label>
        ))}
        <div className="flex w-full gap-2">
          <button
            type="button"
            className="underline"
            onClick={() => setRequired(Object.fromEntries(FIELD_ORDER.map(n => [n, true])) as typeof required)}
          >
            All
          </button>
          <button
            type="button"
            className="underline"
            onClick={() => setRequired(Object.fromEntries(FIELD_ORDER.map(n => [n, false])) as typeof required)}
          >
            None
          </button>
        </div>
      </fieldset>

      <div className="border bg-surface-primary p-4" aria-live="polite">
        {/* Single line: this box sits above the form, so a height change here would shift every field (and any
            open dropdown positioned against them) each time focus moves. */}
        <p className="flex gap-1">
          <strong className="shrink-0">Last focused:</strong>
          <code data-testid="last-focused" className="min-w-0 truncate" title={lastFocused}>
            {lastFocused}
          </code>
        </p>
        <p>
          <strong>Submit count:</strong> {submitCount} · <strong>Errors:</strong>{' '}
          {Object.keys(errors).length ? Object.keys(errors).join(', ') : 'none'}
        </p>
      </div>

      <form
        className="flex flex-col gap-6"
        noValidate
        onFocus={onFocus}
        onSubmit={event => {
          void handleSubmit(values => setSubmitted(values))(event);
        }}
      >
        <Field label="Input" errorMessage={errors.givenName?.message} id="givenName">
          <Input {...register('givenName', rules('givenName'))} id="givenName" invalid={!!errors.givenName} />
        </Field>

        <Field label="Select" errorMessage={errors.title?.message} id="title">
          <Select {...register('title', rules('title'))} id="title" invalid={!!errors.title}>
            <option value="">Select</option>
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
          </Select>
        </Field>

        <Field label="Textarea" errorMessage={errors.about?.message} id="about">
          <Textarea {...register('about', rules('about'))} id="about" invalid={!!errors.about} />
        </Field>

        <Controller
          control={control}
          name="animal"
          rules={rules('animal')}
          render={({ field, fieldState }) => (
            <Autocomplete
              ref={field.ref}
              label="Autocomplete"
              selectedKey={field.value}
              onSelectionChange={key => field.onChange(key === null ? null : String(key))}
              onBlur={field.onBlur}
              invalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
            >
              <AutocompleteItem key="cat">Cat</AutocompleteItem>
              <AutocompleteItem key="dog">Dog</AutocompleteItem>
              <AutocompleteItem key="bird">Bird</AutocompleteItem>
            </Autocomplete>
          )}
        />

        <Controller
          control={control}
          name="colour"
          rules={rules('colour')}
          render={({ field, fieldState }) => (
            <RadioGroup
              ref={field.ref}
              label="RadioGroup"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              radios={[
                { value: 'red', label: 'Red', isDisabled: true },
                { value: 'green', label: 'Green' },
                { value: 'blue', label: 'Blue' },
              ]}
            />
          )}
        />

        <Controller
          control={control}
          name="fruits"
          rules={rules('fruits')}
          render={({ field, fieldState }) => (
            <CheckboxGroup
              ref={field.ref}
              label="CheckboxGroup"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              checkboxes={[
                { value: 'apple', label: 'Apple', isDisabled: true },
                { value: 'pear', label: 'Pear' },
                { value: 'plum', label: 'Plum' },
              ]}
            />
          )}
        />

        <Controller
          control={control}
          name="account"
          rules={rules('account')}
          render={({ field, fieldState }) => (
            <Selector
              type="radio"
              ref={field.ref}
              label="Selector (radio)"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
            >
              <SelectorRadio value="everyday" isDisabled>
                <SelectorLabel>Everyday (disabled)</SelectorLabel>
              </SelectorRadio>
              <SelectorRadio value="savings">
                <SelectorLabel>Savings</SelectorLabel>
              </SelectorRadio>
              <SelectorRadio value="offset">
                <SelectorLabel>Offset</SelectorLabel>
              </SelectorRadio>
            </Selector>
          )}
        />

        <Controller
          control={control}
          name="features"
          rules={rules('features')}
          render={({ field, fieldState }) => (
            <Selector
              type="checkbox"
              ref={field.ref}
              label="Selector (checkbox)"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
            >
              <SelectorCheckbox value="card" isDisabled>
                <SelectorLabel>Debit card (disabled)</SelectorLabel>
              </SelectorCheckbox>
              <SelectorCheckbox value="paywave">
                <SelectorLabel>PayWave</SelectorLabel>
              </SelectorCheckbox>
              <SelectorCheckbox value="cheque">
                <SelectorLabel>Cheque book</SelectorLabel>
              </SelectorCheckbox>
            </Selector>
          )}
        />

        <Controller
          control={control}
          name="plan"
          rules={rules('plan')}
          render={({ field, fieldState }) => (
            <Selector
              type="button"
              ref={field.ref}
              label="Selector (button)"
              value={field.value}
              onChange={field.onChange}
              errorMessage={fieldState.error?.message}
            >
              <SelectorButtonOption id="basic" isDisabled>
                <SelectorLabel>Basic (disabled)</SelectorLabel>
              </SelectorButtonOption>
              <SelectorButtonOption id="plus">
                <SelectorLabel>Plus</SelectorLabel>
              </SelectorButtonOption>
              <SelectorButtonOption id="premium">
                <SelectorLabel>Premium</SelectorLabel>
              </SelectorButtonOption>
            </Selector>
          )}
        />

        <Controller
          control={control}
          name="period"
          rules={rules('period')}
          render={({ field, fieldState }) => (
            <Field label="ButtonGroup" errorMessage={fieldState.error?.message} id="period">
              <ButtonGroup
                ref={field.ref}
                id="period"
                selectedKeys={field.value ?? undefined}
                onSelectionChange={key => field.onChange(String(key))}
              >
                <ButtonGroupButton id="weekly" isDisabled>
                  Weekly (disabled)
                </ButtonGroupButton>
                <ButtonGroupButton id="fortnightly">Fortnightly</ButtonGroupButton>
                <ButtonGroupButton id="monthly">Monthly</ButtonGroupButton>
              </ButtonGroup>
            </Field>
          )}
        />

        <Controller
          control={control}
          name="dob"
          rules={rules('dob')}
          render={({ field, fieldState }) => (
            <Field errorMessage={fieldState.error?.message} id="dob">
              <DatePicker
                ref={field.ref}
                id="dob"
                label="DatePicker"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                isInvalid={fieldState.invalid}
              />
            </Field>
          )}
        />

        <Controller
          control={control}
          name="interests"
          rules={rules('interests')}
          render={({ field, fieldState }) => (
            <Field label="MultiSelect" errorMessage={fieldState.error?.message} id="interests">
              <MultiSelect
                ref={field.ref}
                id="interests"
                items={INTERESTS}
                listBoxProps={{ 'aria-label': 'MultiSelect' }}
                selectedKeys={field.value}
                onSelectionChange={keys =>
                  field.onChange(keys === 'all' ? INTERESTS.map(item => String(item.key)) : [...keys].map(String))
                }
              >
                {item => (
                  <MultiSelectItem key={item.key} textValue={item.textValue}>
                    {item.textValue}
                  </MultiSelectItem>
                )}
              </MultiSelect>
            </Field>
          )}
        />

        <Controller
          control={control}
          name="terms"
          rules={rules('terms')}
          render={({ field, fieldState }) => (
            <Field errorMessage={fieldState.error?.message} id="terms">
              <Switch
                ref={field.ref}
                id="terms"
                label="Switch – I accept the terms"
                isSelected={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            </Field>
          )}
        />

        <div className="sticky bottom-0 -mx-8 flex gap-3 border-t bg-background-white px-8 py-4">
          <Button type="submit" look="primary">
            Submit
          </Button>
          <Button
            type="button"
            look="link"
            onClick={() => {
              reset(DEFAULT_VALUES);
              setSubmitted(null);
              setLastFocused('nothing yet');
            }}
          >
            Reset
          </Button>
        </div>
      </form>

      {submitted && (
        <pre className="overflow-auto border bg-surface-primary p-4 text-sm">
          {JSON.stringify({ ...submitted, dob: submitted.dob?.toString() ?? null }, null, 2)}
        </pre>
      )}
    </main>
  );
}
