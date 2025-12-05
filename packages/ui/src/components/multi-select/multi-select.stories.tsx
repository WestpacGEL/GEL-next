import { type Meta, StoryFn } from '@storybook/react-vite';
import { useState } from 'react';

import { Field } from '../index.js';

import { MultiSelect, MultiSelectItem, Section } from './multi-select.component.js';

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/Multiselect',
  component: MultiSelect,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;

const OPTIONS = [
  { id: 1, name: 'Aerospace' },
  { id: 2, name: 'Mechanical' },
  { id: 3, name: 'Civil' },
  { id: 4, name: 'Biomedical' },
  { id: 5, name: 'Nuclear' },
  { id: 6, name: 'Industrial' },
  { id: 7, name: 'Chemical' },
  { id: 8, name: 'Agricultural' },
  { id: 9, name: 'Electrical' },
];
const OTHER_OPTIONS = [
  { id: 11, name: 'Other Aerospace' },
  { id: 12, name: 'Other Mechanical' },
  { id: 13, name: 'Other Civil' },
  { id: 14, name: 'Other Biomedical' },
  { id: 15, name: 'Other Nuclear' },
  { id: 16, name: 'Other Industrial' },
  { id: 17, name: 'Other Chemical' },
  { id: 18, name: 'Other Agricultural' },
  { id: 19, name: 'Other Electrical' },
];

/**
 * > Default usage example
 */
export const Default = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  return (
    <div className="flex flex-col gap-2">
      <MultiSelect
        listBoxProps={{ 'aria-label': 'multiselect options' }}
        selectedKeys={selectedKeys}
        onSelectionChange={keys => setSelectedKeys(keys as Set<string>)}
        items={OPTIONS}
      >
        {option => (
          <MultiSelectItem key={option.id} textValue={option.name} description="Supporting information or description">
            {option.name}
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
        <Section title="Transaction" items={OPTIONS}>
          {option => (
            <MultiSelectItem
              key={option.id}
              textValue={option.name}
              description="Supporting information or description"
            >
              {option.name}
            </MultiSelectItem>
          )}
        </Section>
        <Section title="Savings" items={OTHER_OPTIONS}>
          {option => (
            <MultiSelectItem
              key={option.id}
              textValue={option.name}
              description="Supporting information or description"
            >
              {option.name}
            </MultiSelectItem>
          )}
        </Section>
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
            <Section title="Transaction" items={OPTIONS}>
              {option => (
                <MultiSelectItem
                  key={option.id}
                  textValue={option.name}
                  description="Supporting information or description"
                >
                  {option.name}
                </MultiSelectItem>
              )}
            </Section>
            <Section title="Savings" items={OTHER_OPTIONS}>
              {option => (
                <MultiSelectItem
                  key={option.id}
                  textValue={option.name}
                  description="Supporting information or description"
                >
                  {option.name}
                </MultiSelectItem>
              )}
            </Section>
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
            <Section title="Transaction" items={OPTIONS}>
              {option => (
                <MultiSelectItem
                  key={option.id}
                  textValue={option.name}
                  description="Supporting information or description"
                >
                  {option.name}
                </MultiSelectItem>
              )}
            </Section>
            <Section title="Savings" items={OTHER_OPTIONS}>
              {option => (
                <MultiSelectItem
                  key={option.id}
                  textValue={option.name}
                  description="Supporting information or description"
                >
                  {option.name}
                </MultiSelectItem>
              )}
            </Section>
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
        <Section title="Transaction" items={OPTIONS}>
          {option => (
            <MultiSelectItem
              key={option.id}
              textValue={option.name}
              description="Supporting information or description"
            >
              {option.name}
            </MultiSelectItem>
          )}
        </Section>
        <Section title="Savings" items={OTHER_OPTIONS}>
          {option => (
            <MultiSelectItem
              key={option.id}
              textValue={option.name}
              description="Supporting information or description"
            >
              {option.name}
            </MultiSelectItem>
          )}
        </Section>
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
        <Section title="Transaction" items={OPTIONS}>
          {option => (
            <MultiSelectItem
              key={option.id}
              textValue={option.name}
              description="Supporting information or description"
            >
              {option.name}
            </MultiSelectItem>
          )}
        </Section>
        <Section title="Savings" items={OTHER_OPTIONS}>
          {option => (
            <MultiSelectItem
              key={option.id}
              textValue={option.name}
              description="Supporting information or description"
            >
              {option.name}
            </MultiSelectItem>
          )}
        </Section>
      </MultiSelect>
    </Field>
  );
};

export const Testing = () => {
  const [selectedKeysMulti, setSelectedKeysMulti] = useState<Set<string>>(new Set());
  const [selectedKeysSingle, setSelectedKeysSingle] = useState<Set<string>>(new Set());

  return (
    <div className="flex flex-col gap-2">
      <p>Multiple selection</p>
      <Field label="Select a fruit topping" hintMessage="If there is hint text, it can go here">
        <MultiSelect
          listBoxProps={{ 'aria-label': 'multiselect options' }}
          selectedKeys={selectedKeysMulti}
          onSelectionChange={keys => setSelectedKeysMulti(keys as Set<string>)}
        >
          <Section title="Transaction" items={OPTIONS}>
            {option => (
              <MultiSelectItem
                key={option.id}
                textValue={option.name}
                description="Supporting information or description"
              >
                {option.name}
              </MultiSelectItem>
            )}
          </Section>
          <Section title="Savings" items={OTHER_OPTIONS}>
            {option => (
              <MultiSelectItem
                key={option.id}
                textValue={option.name}
                description="Supporting information or description"
              >
                {option.name}
              </MultiSelectItem>
            )}
          </Section>
        </MultiSelect>
      </Field>
      <p>Single selection</p>
      <Field label="Select a fruit topping" hintMessage="If there is hint text, it can go here">
        <MultiSelect
          selectionMode="single"
          selectedKeys={selectedKeysSingle}
          onSelectionChange={keys => setSelectedKeysSingle(keys as Set<string>)}
        >
          <Section title="Transaction" items={OPTIONS}>
            {option => (
              <MultiSelectItem
                key={option.id}
                textValue={option.name}
                description="Supporting information or description"
              >
                {option.name}
              </MultiSelectItem>
            )}
          </Section>
          <Section title="Savings" items={OTHER_OPTIONS}>
            {option => (
              <MultiSelectItem
                key={option.id}
                textValue={option.name}
                description="Supporting information or description"
              >
                {option.name}
              </MultiSelectItem>
            )}
          </Section>
        </MultiSelect>
      </Field>
    </div>
  );
};
