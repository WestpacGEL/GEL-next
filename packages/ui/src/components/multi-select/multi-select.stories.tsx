import { type Meta, StoryFn } from '@storybook/react-vite';
import { useState } from 'react';

import { Field, type PaginationProps } from '../index.js';

import { Item, MultiSelect, Section } from './multi-select.component.js';

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
export const Default = (props: PaginationProps) => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  return (
    <div className="flex flex-col gap-2">
      <MultiSelect
        listBoxProps={{ 'aria-label': 'multiselect options' }}
        selectedKeys={selectedKeys}
        onSelectionChange={keys => setSelectedKeys(keys as Set<string>)}
      >
        {OPTIONS.map(option => (
          <Item key={option.id} textValue={option.name}>
            {option.name} <p>My paragraph s</p>
          </Item>
        ))}
      </MultiSelect>
    </div>
  );
};

export const WithSection = (props: PaginationProps) => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  return (
    <div className="flex flex-col gap-2">
      <MultiSelect
        listBoxProps={{ 'aria-label': 'multiselect options' }}
        selectedKeys={selectedKeys}
        onSelectionChange={keys => setSelectedKeys(keys as Set<string>)}
      >
        <Section title="Transaction">
          {OPTIONS.map(option => (
            <Item key={option.id} textValue={option.name}>
              {option.name} <p>My paragraph s</p>
            </Item>
          ))}
        </Section>
        <Section title="Another Section">
          {OTHER_OPTIONS.map(option => (
            <Item key={option.id} textValue={option.name}>
              {option.name} <p>My paragraph s</p>
            </Item>
          ))}
        </Section>
      </MultiSelect>
    </div>
  );
};
/**
 * > Sizes example
 */

const SIZES = ['small', 'medium', 'large', 'xlarge'] as const;
export const Sizes = (props: PaginationProps) => {
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
            <Section title="Transaction">
              {OPTIONS.map(option => (
                <Item key={option.id} textValue={option.name}>
                  {option.name} <p>My paragraph s</p>
                </Item>
              ))}
            </Section>
            <Section title="Savings">
              {OTHER_OPTIONS.map(option => (
                <Item key={option.id} textValue={option.name}>
                  {option.name} <p>My paragraph</p>
                </Item>
              ))}
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
export const SingleSelect = (props: PaginationProps) => {
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
            <Section title="Transaction">
              {OPTIONS.map(option => (
                <Item key={option.id} textValue={option.name}>
                  {option.name} <p>My paragraph</p>
                </Item>
              ))}
            </Section>
            <Section title="Savings">
              {OTHER_OPTIONS.map(option => (
                <Item key={option.id} textValue={option.name}>
                  {option.name} <p>My paragraph</p>
                </Item>
              ))}
            </Section>
          </MultiSelect>
        </div>
      ))}
    </div>
  );
};

/**
 * > Field example
 */
export const UsingField = (props: PaginationProps) => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  return (
    <Field label="Select a fruit topping" hintMessage="If there is hint text, it can go here">
      <MultiSelect
        listBoxProps={{ 'aria-label': 'multiselect options' }}
        selectedKeys={selectedKeys}
        onSelectionChange={keys => setSelectedKeys(keys as Set<string>)}
      >
        <Item textValue="other key">
          Other name <p>My paragraph s</p>
        </Item>
        <Section title="Transaction">
          {OPTIONS.map(option => (
            <Item key={option.id} textValue={option.name}>
              {option.name} <p>My paragraph s</p>
            </Item>
          ))}
        </Section>
        <Section title="Other section">
          {OTHER_OPTIONS.map(option => (
            <Item key={option.id} textValue={option.name}>
              {option.name} <p>My paragraph s</p>
            </Item>
          ))}
        </Section>
      </MultiSelect>
    </Field>
  );
};

export const Testing = () => {
  const [selectedKeysMulti, setSelectedKeysMulti] = useState<Set<string>>(new Set());
  const [selectedKeysSingle, setSelectedKeysSingle] = useState<Set<string>>(new Set());
  const [selectedKeysField, setSelectedKeysField] = useState<Set<string>>(new Set());

  return (
    <div className="flex flex-col gap-2">
      <p>Multiple selection</p>
      <MultiSelect
        listBoxProps={{ 'aria-label': 'multiselect options' }}
        selectedKeys={selectedKeysMulti}
        onSelectionChange={keys => setSelectedKeysMulti(keys as Set<string>)}
      >
        {OPTIONS.map(option => (
          <Item key={option.id} textValue={option.name}>
            {option.name} <p>My paragraph s</p>
          </Item>
        ))}
      </MultiSelect>
      <p>Single selection</p>
      <MultiSelect
        selectionMode="single"
        selectedKeys={selectedKeysSingle}
        onSelectionChange={keys => setSelectedKeysSingle(keys as Set<string>)}
      >
        <Section title="Transaction">
          {OPTIONS.map(option => (
            <Item key={option.id} textValue={option.name}>
              {option.name} <p>My paragraph</p>
            </Item>
          ))}
        </Section>
        <Section title="Savings">
          {OTHER_OPTIONS.map(option => (
            <Item key={option.id} textValue={option.name}>
              {option.name} <p>My paragraph</p>
            </Item>
          ))}
        </Section>
      </MultiSelect>
      <p>Field</p>
      <Field label="Select a fruit topping" hintMessage="If there is hint text, it can go here">
        <MultiSelect
          listBoxProps={{ 'aria-label': 'multiselect options' }}
          selectedKeys={selectedKeysField}
          onSelectionChange={keys => setSelectedKeysField(keys as Set<string>)}
        >
          <Item textValue="other key">
            Other name <p>My paragraph s</p>
          </Item>
          <Section title="Transaction">
            {OPTIONS.map(option => (
              <Item key={option.id} textValue={option.name}>
                {option.name} <p>My paragraph s</p>
              </Item>
            ))}
          </Section>
          <Section title="Other section">
            {OTHER_OPTIONS.map(option => (
              <Item key={option.id} textValue={option.name}>
                {option.name} <p>My paragraph s</p>
              </Item>
            ))}
          </Section>
        </MultiSelect>
      </Field>
    </div>
  );
};
