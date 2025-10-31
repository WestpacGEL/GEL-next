import { type Meta, StoryFn } from '@storybook/react-vite';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { Field, Input } from '../index.js';

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
  const { register, watch, setValue } = useForm<Inputs>({
    defaultValues: { items: [{ primary: '', secondary: '', tertiary: '' }] },
  });
  const items = watch('items');

  const handleAdd = useCallback(() => {
    setValue('items', [...items, { primary: '', secondary: '', tertiary: '' }]);
  }, [items, setValue]);

  return (
    <form>
      <Compacta onAdd={handleAdd}>
        {items.map((item, index) => (
          <CompactaItem
            key={index}
            title={{ primary: item.primary, secondary: item.secondary, tertiary: item.tertiary }}
            onRemove={() => {
              setValue('items', [...items.slice(0, index), ...items.slice(index + 1)]);
            }}
          >
            <Field label="Primary" hintMessage="Primary title text">
              <Input {...register(`items.${index}.primary`)} />
            </Field>
            <Field label="Secondary" hintMessage="Secondary title text">
              <Input {...register(`items.${index}.secondary`)} />
            </Field>
            <Field label="Tertiary" hintMessage="Tertiary title text">
              <Input {...register(`items.${index}.tertiary`)} />
            </Field>
          </CompactaItem>
        ))}
      </Compacta>
    </form>
  );
};
