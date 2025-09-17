import { type Meta, StoryFn } from '@storybook/react-vite';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { Form, FormGroup, Hint, Input, Label } from '../index.js';

import { Compacta } from './compacta.component.js';
import { CompactaItem } from './components/compacta-item/compacta-item.component.js';

const meta: Meta<typeof Compacta> = {
  title: 'Components/Compacta',
  component: Compacta,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  args: {},
};

export default meta;

type Inputs = {
  items: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
  }[];
};

/**
 * > Default usage example
 */
export const Default = () => {
  const { register, watch, setValue } = useForm<Inputs>({ defaultValues: { items: [] } });
  const items = watch('items');

  const handleAdd = useCallback(() => {
    setValue('items', [...items, { primary: '', secondary: '', tertiary: '' }]);
  }, [items, setValue]);

  return (
    <Form>
      <Compacta onAdd={handleAdd}>
        {items.map((item, index) => (
          <CompactaItem
            key={index}
            title={{ primary: item.primary, secondary: item.secondary, tertiary: item.tertiary }}
            onRemove={() => {
              setValue('items', [...items.slice(0, index), ...items.slice(index + 1)]);
            }}
          >
            <FormGroup>
              <Label htmlFor={`primary[${index}]`}>Primary</Label>
              <Hint id={`primary-hint`}>Primary title text</Hint>
              <Input aria-describedby={`primary-hint`} {...register(`items.${index}.primary`)} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor={`secondary[${index}]`}>Secondary</Label>
              <Hint id={`secondary-hint`}>Secondary title text</Hint>
              <Input aria-describedby={`secondary-hint`} {...register(`items.${index}.secondary`)} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor={`tertiary[${index}]`}>Tertiary</Label>
              <Hint id={`tertiary-hint`}>Tertiary title text</Hint>
              <Input aria-describedby={`tertiary-hint`} id={`tertiary`} {...register(`items.${index}.tertiary`)} />
            </FormGroup>
          </CompactaItem>
        ))}
      </Compacta>
    </Form>
  );
};
