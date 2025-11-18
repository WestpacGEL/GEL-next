import { type Meta, StoryFn } from '@storybook/react-vite';
import { Key, useState } from 'react';

import { TickIcon } from '../icon/index.js';
import { type PaginationProps } from '../index.js';

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
        <Section title="Transaction">
          {OPTIONS.map(option => (
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
export const Sizes = (props: PaginationProps) => {
  const otherOptions = [
    { id: 11, name: 'new Aerospace' },
    { id: 12, name: 'new Mechanical' },
    { id: 13, name: 'new Civil' },
    { id: 14, name: 'new Biomedical' },
    { id: 15, name: 'new Nuclear' },
    { id: 16, name: 'new Industrial' },
    { id: 17, name: 'new Chemical' },
    { id: 18, name: 'new Agricultural' },
    { id: 19, name: 'new Electrical' },
  ];
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  return (
    <div className="flex flex-col gap-2">
      {(['small', 'medium', 'large', 'xlarge'] as const).map(size => (
        <MultiSelect
          key={size}
          size={size}
          selectedKeys={selectedKeys}
          onSelectionChange={keys => setSelectedKeys(keys as Set<string>)}
        >
          <Section title="Transaction">
            {options.map(option => (
              <Item key={option.id} textValue={option.name}>
                {option.name} <p>My paragraph s</p>
              </Item>
            ))}
          </Section>
          <Section title="Savings">
            {otherOptions.map(option => (
              <Item key={option.id} textValue={option.name}>
                {option.name} <p>My paragraph</p>
              </Item>
            ))}
          </Section>
          {/* {item => (
            <Item key={item.id}>
              {item.name} <p>kasjdkljda s</p>
            </Item>
          )} */}
        </MultiSelect>
      ))}
    </div>
  );
};
