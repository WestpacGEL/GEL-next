import { type Meta, StoryFn } from '@storybook/react-vite';
import { useEffect, useState } from 'react';

import { FIXED_WIDTHS } from '../../constants/input-widths.js';
import { Field, FlexiCell } from '../index.js';

import { MultiSelectValue } from './multi-select.types.js';

import { MultiSelect, MultiSelectItem, MultiSelectSection } from './index.js';

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/Multiselect',
  component: MultiSelect,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;

const OPTIONS: MultiSelectValue[] = [
  { key: 1, textValue: 'Aerospace' },
  { key: 2, textValue: 'Mechanical' },
  { key: 3, textValue: 'Civil' },
  { key: 4, textValue: 'Biomedical' },
  { key: 5, textValue: 'Nuclear' },
  { key: 6, textValue: 'Industrial' },
  { key: 7, textValue: 'Chemical' },
  { key: 8, textValue: 'Agricultural' },
  { key: 9, textValue: 'Electrical' },
];
const LONG_OPTIONS = [
  { key: 1, textValue: 'Aerospace Aerospace Aerospace Aerospace Aerospace Aerospace' },
  { key: 2, textValue: 'Mechanical Mechanical Mechanical Mechanical Mechanical Mechanical' },
  { key: 3, textValue: 'Civil Civil Civil Civil Civil Civil' },
  { key: 4, textValue: 'Biomedical Biomedical Biomedical Biomedical Biomedical Biomedical' },
  { key: 5, textValue: 'Nuclear Nuclear Nuclear Nuclear Nuclear Nuclear' },
  { key: 6, textValue: 'Industrial Industrial Industrial Industrial Industrial Industrial' },
  { key: 7, textValue: 'Chemical Chemical Chemical Chemical Chemical Chemical' },
  { key: 8, textValue: 'Agricultural Agricultural Agricultural Agricultural Agricultural Agricultural' },
  { key: 9, textValue: 'Electrical Electrical Electrical Electrical Electrical Electrical' },
];
const OTHER_OPTIONS = [
  { key: 11, textValue: 'Other Aerospace' },
  { key: 12, textValue: 'Other Mechanical' },
  { key: 13, textValue: 'Other Civil' },
  { key: 14, textValue: 'Other Biomedical' },
  { key: 15, textValue: 'Other Nuclear' },
  { key: 16, textValue: 'Other Industrial' },
  { key: 17, textValue: 'Other Chemical' },
  { key: 18, textValue: 'Other Agricultural' },
  { key: 19, textValue: 'Other Electrical' },
];

/**
 * > Default usage example
 */
export const Default = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  return (
    <div className="flex flex-col gap-2">
      <MultiSelect
        items={OPTIONS}
        listBoxProps={{ 'aria-label': 'multiselect options' }}
        selectedKeys={selectedKeys}
        onSelectionChange={keys => setSelectedKeys(keys as Set<string>)}
      >
        {option => (
          <MultiSelectItem
            key={option.key}
            textValue={option.textValue}
            description="Supporting information or description"
          >
            {option.textValue}
          </MultiSelectItem>
        )}
      </MultiSelect>
    </div>
  );
};

/**
 * > No filter example
 */
export const NoFilter = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  return (
    <div className="flex flex-col gap-2">
      <MultiSelect
        items={OPTIONS}
        listBoxProps={{ 'aria-label': 'multiselect options' }}
        selectedKeys={selectedKeys}
        onSelectionChange={keys => setSelectedKeys(keys as Set<string>)}
        hideFilter
      >
        {option => (
          <MultiSelectItem
            key={option.key}
            textValue={option.textValue}
            description="Supporting information or description"
          >
            {option.textValue}
          </MultiSelectItem>
        )}
      </MultiSelect>
    </div>
  );
};

/**
 * > No Select All Example
 */
export const NoSelectAll = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  return (
    <div className="flex flex-col gap-2">
      <MultiSelect
        items={OPTIONS}
        listBoxProps={{ 'aria-label': 'multiselect options' }}
        selectedKeys={selectedKeys}
        onSelectionChange={keys => setSelectedKeys(keys as Set<string>)}
        hideSelectAll
      >
        {option => (
          <MultiSelectItem
            key={option.key}
            textValue={option.textValue}
            description="Supporting information or description"
          >
            {option.textValue}
          </MultiSelectItem>
        )}
      </MultiSelect>
    </div>
  );
};

/**
 * > Multiselect Widths
 */
export const Widths = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  return (
    <div className="flex flex-col gap-2">
      {FIXED_WIDTHS.map(width => (
        <MultiSelect
          key={width}
          width={width}
          selectedKeys={selectedKeys}
          onSelectionChange={keys => setSelectedKeys(keys as Set<string>)}
          items={OPTIONS}
        >
          {option => (
            <MultiSelectItem
              key={option.key}
              textValue={option.textValue}
              description="Supporting information or description"
            >
              {option.textValue}
            </MultiSelectItem>
          )}
        </MultiSelect>
      ))}
    </div>
  );
};

export const WidthsWithLongOptions = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  return (
    <div className="flex flex-col gap-2">
      {FIXED_WIDTHS.map(width => (
        <MultiSelect
          key={width}
          width={width}
          selectedKeys={selectedKeys}
          onSelectionChange={keys => setSelectedKeys(keys as Set<string>)}
          items={LONG_OPTIONS}
        >
          {option => (
            <MultiSelectItem
              key={option.key}
              textValue={option.textValue}
              description="Supporting information or description"
            >
              {option.textValue}
            </MultiSelectItem>
          )}
        </MultiSelect>
      ))}
    </div>
  );
};

export const WithSection = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  return (
    <div className="flex flex-col gap-2">
      <MultiSelect
        listBoxProps={{ 'aria-label': 'multiselect options' }}
        selectedKeys={selectedKeys}
        onSelectionChange={keys => setSelectedKeys(keys as Set<string>)}
      >
        <MultiSelectSection key={'section-1'} title="Transaction" items={OPTIONS}>
          {option => (
            <MultiSelectItem
              key={option.key}
              textValue={option.textValue}
              description="Supporting information or description"
            >
              {option.textValue}
            </MultiSelectItem>
          )}
        </MultiSelectSection>
        <MultiSelectSection key={'section-2'} title="Savings" items={OTHER_OPTIONS}>
          {option => (
            <MultiSelectItem
              key={option.key}
              textValue={option.textValue}
              description="Supporting information or description"
            >
              {option.textValue}
            </MultiSelectItem>
          )}
        </MultiSelectSection>
      </MultiSelect>
    </div>
  );
};
/**
 * > Sizes example
 */

const SIZES = ['small', 'medium', 'large', 'xlarge'] as const;
export const Sizes = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  return (
    <div className="flex flex-col gap-2">
      {SIZES.map(size => (
        <div key={size}>
          <p className="mb-2 typography-body-10 font-bold text-text-body uppercase">{size}</p>
          <MultiSelect
            key={size}
            size={size}
            selectedKeys={selectedKeys}
            onSelectionChange={keys => {
              setSelectedKeys(keys as Set<string>);
            }}
          >
            <MultiSelectSection key={'section-1'} title="Transaction" items={OPTIONS}>
              {option => (
                <MultiSelectItem
                  key={option.key}
                  textValue={option.textValue}
                  description="Supporting information or description"
                >
                  {option.textValue}
                </MultiSelectItem>
              )}
            </MultiSelectSection>
            <MultiSelectSection key={'section-2'} title="Savings" items={OTHER_OPTIONS}>
              {option => (
                <MultiSelectItem
                  key={option.key}
                  textValue={option.textValue}
                  description="Supporting information or description"
                >
                  {option.textValue}
                </MultiSelectItem>
              )}
            </MultiSelectSection>
          </MultiSelect>
        </div>
      ))}
    </div>
  );
};

/**
 * > SingleSelect example
 */
export const SingleSelect = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  return (
    <div className="flex flex-col gap-2">
      <MultiSelect
        size="medium"
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={keys => setSelectedKeys(keys as Set<string>)}
      >
        <MultiSelectSection key={'section-1'} title="Transaction" items={OPTIONS}>
          {option => (
            <MultiSelectItem
              key={option.key}
              textValue={option.textValue}
              description="Supporting information or description"
            >
              {option.textValue}
            </MultiSelectItem>
          )}
        </MultiSelectSection>
        <MultiSelectSection key={'section-2'} title="Savings" items={OTHER_OPTIONS}>
          {option => (
            <MultiSelectItem
              key={option.key}
              textValue={option.textValue}
              description="Supporting information or description"
            >
              {option.textValue}
            </MultiSelectItem>
          )}
        </MultiSelectSection>
      </MultiSelect>
    </div>
  );
};

/**
 * > SingleSelect example that shows section title with selection
 */
export const SingleSelectWithSectionTitle = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  return (
    <div className="flex flex-col gap-2">
      <MultiSelect
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={keys => setSelectedKeys(keys as Set<string>)}
        showSingleSectionTitle
      >
        <MultiSelectSection key={'section-1'} title="Transaction" items={OPTIONS}>
          {option => (
            <MultiSelectItem
              key={option.key}
              textValue={option.textValue}
              description="Supporting information or description"
            >
              {option.textValue}
            </MultiSelectItem>
          )}
        </MultiSelectSection>
        <MultiSelectSection key={'section-2'} title="Savings" items={OTHER_OPTIONS}>
          {option => (
            <MultiSelectItem
              key={option.key}
              textValue={option.textValue}
              description="Supporting information or description"
            >
              {option.textValue}
            </MultiSelectItem>
          )}
        </MultiSelectSection>
      </MultiSelect>
    </div>
  );
};

const COUNTRY_CODE_OPTIONS: MultiSelectValue[] = [
  { key: 'AU', textValue: 'Australia +61', displayValue: 'AU +61' },
  { key: 'NZ', textValue: 'New Zealand +64', displayValue: 'NZ +64' },
  { key: 'GB', textValue: 'United Kingdom +44', displayValue: 'GB +44' },
  { key: 'US', textValue: 'United States +1', displayValue: 'US +1' },
  { key: 'CA', textValue: 'Canada +1', displayValue: 'CA +1' },
  { key: 'IN', textValue: 'India +91', displayValue: 'IN +91' },
  { key: 'CN', textValue: 'China +86', displayValue: 'CN +86' },
  { key: 'SG', textValue: 'Singapore +65', displayValue: 'SG +65' },
  { key: 'JP', textValue: 'Japan +81', displayValue: 'JP +81' },
  { key: 'FJ', textValue: 'Fiji +679', displayValue: 'FJ +679' },
];

/**
 * > SingleSelect example using displayValue to show alternative text in the input when an item is selected
 */
export const SingleSelectWithDisplayValue = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  return (
    <Field label="Country code">
      <MultiSelect
        items={COUNTRY_CODE_OPTIONS}
        selectionMode="single"
        placeholder="Select country"
        width={10}
        listBoxProps={{ 'aria-label': 'country code options' }}
        selectedKeys={selectedKeys}
        onSelectionChange={keys => setSelectedKeys(keys as Set<string>)}
      >
        {option => (
          <MultiSelectItem key={option.key} textValue={option.textValue} displayValue={option.displayValue}>
            {option.textValue}
          </MultiSelectItem>
        )}
      </MultiSelect>
    </Field>
  );
};

/**
 * > Field example
 */
export const UsingField = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  return (
    <Field label="Select a fruit topping" hintMessage="If there is hint text, it can go here">
      <MultiSelect
        listBoxProps={{ 'aria-label': 'multiselect options' }}
        selectedKeys={selectedKeys}
        onSelectionChange={keys => setSelectedKeys(keys as Set<string>)}
      >
        <MultiSelectSection key={'section-1'} title="Transaction" items={OPTIONS}>
          {option => (
            <MultiSelectItem
              key={option.key}
              textValue={option.textValue}
              description="Supporting information or description"
            >
              {option.textValue}
            </MultiSelectItem>
          )}
        </MultiSelectSection>
        <MultiSelectSection key={'section-2'} title="Savings" items={OTHER_OPTIONS}>
          {option => (
            <MultiSelectItem
              key={option.key}
              textValue={option.textValue}
              description="Supporting information or description"
            >
              {option.textValue}
            </MultiSelectItem>
          )}
        </MultiSelectSection>
      </MultiSelect>
    </Field>
  );
};

/**
 * > The dropdown stays attached to the trigger when the layout shifts while it is open, e.g. when content is
 * > conditionally rendered based on the selection. Select "Chemical" to render extra content in the card.
 */
export const LayoutShiftWhileOpen = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<number>>(new Set());
  const showExtraContent = selectedKeys.has(7);
  const selectedOptions = Array.from(selectedKeys).map(key => {
    return OPTIONS.find(option => option.key === Number(key));
  });

  return (
    <div className="flex h-[30rem] items-center overflow-auto bg-surface-muted-faint p-4">
      <div className="flex w-full flex-col gap-4 rounded-sm border border-border-muted-soft bg-background-white p-6">
        <Field label="Engineering discipline" hintMessage='Select "Chemical" to show additional content'>
          <MultiSelect
            items={OPTIONS}
            listBoxProps={{ 'aria-label': 'multiselect options' }}
            selectedKeys={selectedKeys}
            onSelectionChange={keys => setSelectedKeys(keys as Set<number>)}
          >
            {option => <MultiSelectItem key={option.key}>{option.textValue}</MultiSelectItem>}
          </MultiSelect>
        </Field>
        {showExtraContent && (
          <p className="rounded-sm border border-border-muted-soft bg-surface-muted-faint p-6 typography-body-10">
            Additional content rendered because &quot;Chemical&quot; is selected. This grows the card, moving the select
            above.
          </p>
        )}
        <div className="flex flex-row flex-wrap gap-2">
          {selectedOptions.map(selectedOption => (
            <FlexiCell withBorder className="flex flex-col typography-body-10 font-bold" key={selectedOption?.key}>
              {selectedOption?.textValue}
            </FlexiCell>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * A notice that appears and disappears on its own timer. It owns its state, so toggling it re-renders only
 * this component, not the MultiSelect next to it.
 */
const BlinkingNotice = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => setIsVisible(visible => !visible), 3000);
    return () => clearInterval(interval);
  }, []);
  if (!isVisible) return null;
  return (
    <p className="rounded-sm border border-border-muted-soft bg-background-white p-6 typography-body-10">
      A notice that appears every few seconds. It is rendered outside the card, inside a fixed-height scrolling
      container, so nothing the select lives in changes size when it pushes the card down.
    </p>
  );
};

/**
 * > The dropdown also follows the trigger when the layout shift is not caused by a render of the select: here a
 * > sibling with its own state pushes the card down inside a fixed-height scrolling container, so no container of
 * > the select changes size. Open the dropdown and wait a few seconds.
 */
export const LayoutShiftFromSiblingWhileOpen = () => {
  return (
    <div className="flex h-[30rem] flex-col gap-4 overflow-auto bg-surface-muted-faint p-4">
      <BlinkingNotice />
      <div className="flex w-full flex-col gap-4 rounded-sm border border-border-muted-soft bg-background-white p-6">
        <Field label="Engineering discipline" hintMessage="Open the dropdown and wait for the notice above to appear">
          <MultiSelect items={OPTIONS} listBoxProps={{ 'aria-label': 'multiselect options' }}>
            {option => <MultiSelectItem key={option.key}>{option.textValue}</MultiSelectItem>}
          </MultiSelect>
        </Field>
      </div>
    </div>
  );
};

/**
 * Example with manually adding MultiSelecItems
 */
export const ManualUsage = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  return (
    <MultiSelect
      selectedKeys={selectedKeys}
      onSelectionChange={keys => {
        setSelectedKeys(keys as Set<string>);
      }}
    >
      <MultiSelectItem key={'aerospace'} textValue={'Aerospace'} description="Supporting information or description">
        Aerospace
      </MultiSelectItem>
      <MultiSelectItem key={'mechanical'} textValue={'Mechanical'} description="Supporting information or description">
        Mechanical
      </MultiSelectItem>
      <MultiSelectItem key={'civil'} textValue={'Civil'} description="Supporting information or description">
        Civil
      </MultiSelectItem>
    </MultiSelect>
  );
};
