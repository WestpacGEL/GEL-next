import { type Meta, StoryFn } from '@storybook/react-vite';
import { useState } from 'react';

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
      {(['small', 'medium', 'large', 'xlarge'] as const).map(size => (
        <div key={size}>
          <p className="mb-2 typography-body-10 font-bold text-text-body uppercase">{size}</p>
          <MultiSelect
            size={size}
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
      ))}
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

export const Testing = () => {
  const [selectedKeysMulti, setSelectedKeysMulti] = useState<Set<string>>(new Set());
  const [selectedKeysMultiNoSection, setSelectedKeysMultiNoSection] = useState<Set<string>>(new Set());
  const [selectedKeysSingle, setSelectedKeysSingle] = useState<Set<string>>(new Set());
  const [selectedKeysSingleNoSection, setSelectedKeysSingleNoSection] = useState<Set<string>>(new Set());

  return (
    <div className="flex flex-col gap-2">
      <p>Multiple selection</p>
      <Field label="Select a fruit topping" hintMessage="If there is hint text, it can go here">
        <MultiSelect
          listBoxProps={{ 'aria-label': 'multiselect options' }}
          selectedKeys={selectedKeysMulti}
          onSelectionChange={keys => setSelectedKeysMulti(keys as Set<string>)}
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
      <p>Multiple selection no sections</p>
      <Field label="Select a fruit topping" hintMessage="If there is hint text, it can go here">
        <MultiSelect
          listBoxProps={{ 'aria-label': 'multiselect options' }}
          selectedKeys={selectedKeysMultiNoSection}
          onSelectionChange={keys => setSelectedKeysMultiNoSection(keys as Set<string>)}
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
      </Field>
      <p>Single selection</p>
      <Field label="Select a fruit topping" hintMessage="If there is hint text, it can go here">
        <MultiSelect
          selectionMode="single"
          selectedKeys={selectedKeysSingle}
          onSelectionChange={keys => setSelectedKeysSingle(keys as Set<string>)}
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
      <p>Single selection no sections</p>
      <Field label="Select a fruit topping" hintMessage="If there is hint text, it can go here">
        <MultiSelect
          selectionMode="single"
          selectedKeys={selectedKeysSingleNoSection}
          onSelectionChange={keys => setSelectedKeysSingleNoSection(keys as Set<string>)}
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
      </Field>
    </div>
  );
};
