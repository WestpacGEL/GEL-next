/* eslint-disable no-console */
import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { Field, Input } from '../index.js';

import { RepeaterItem } from './components/repeater-item/repeater-item.component.js';
import { Repeater } from './repeater.component.js';

type Inputs = {
  items: string[];
};

const meta: Meta<typeof Repeater> = {
  title: 'Components/Repeater',
  component: Repeater,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  args: {
    children: (
      <Field label="Primary" hintMessage="Primary title text">
        <Input className="w-full" name="test" onChange={e => console.log(e)} />
      </Field>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {},
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { register, watch, setValue } = useForm<Inputs>({
      defaultValues: { items: [''] },
    });
    const items = watch('items');

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handleAdd = useCallback(() => {
      setValue('items', [...items, '']);
    }, [items, setValue]);

    return (
      <form>
        <Repeater onAdd={handleAdd}>
          {items.map((item, index) => (
            <RepeaterItem
              key={index}
              onRemove={() => {
                setValue('items', [...items.slice(0, index), ...items.slice(index + 1)]);
              }}
            >
              <Field label="Primary" hintMessage="Primary title text">
                <Input aria-describedby={`primary-hint`} {...register(`items.${index}`)} />
              </Field>
            </RepeaterItem>
          ))}
        </Repeater>
      </form>
    );
  },
};

/**
 * > Separator usage example
 */
export const Separator: Story = {
  args: {},
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { register, watch, setValue } = useForm<Inputs>({
      defaultValues: { items: [''] },
    });
    const items = watch('items');

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handleAdd = useCallback(() => {
      setValue('items', [...items, '']);
    }, [items, setValue]);

    return (
      <form>
        <Repeater separator onAdd={handleAdd}>
          {items.map((item, index) => (
            <RepeaterItem
              key={index}
              onRemove={() => {
                setValue('items', [...items.slice(0, index), ...items.slice(index + 1)]);
              }}
            >
              <Field label="Primary" hintMessage="Primary title text">
                <Input {...register(`items.${index}`)} />
              </Field>
            </RepeaterItem>
          ))}
        </Repeater>
      </form>
    );
  },
};
