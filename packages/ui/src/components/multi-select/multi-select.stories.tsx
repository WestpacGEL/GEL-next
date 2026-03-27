import { type Meta, StoryFn } from '@storybook/react-vite';
import { useState } from 'react';

import { FIXED_WIDTHS } from '../../constants/input-widths.js';
import { Field } from '../index.js';

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
