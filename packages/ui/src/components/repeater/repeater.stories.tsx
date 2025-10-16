/* eslint-disable no-console */
import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { Form, FormGroup, Hint, Input, Label } from '../index.js';

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
      <FormGroup>
        <Label htmlFor={`test`}>Primary</Label>
        <Hint>Primary title text</Hint>
        <Input className="w-full" name="test" onChange={e => console.log(e)} />
      </FormGroup>
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
      <Form>
        <Repeater onAdd={handleAdd}>
          {items.map((item, index) => (
            <RepeaterItem
              key={index}
              onRemove={() => {
                setValue('items', [...items.slice(0, index), ...items.slice(index + 1)]);
              }}
            >
              <FormGroup spacing="none">
                <Label htmlFor={`primary[${index}]`}>Primary</Label>
                <Hint id={`primary-hint`}>Primary title text</Hint>
                <Input aria-describedby={`primary-hint`} {...register(`items.${index}`)} />
              </FormGroup>
            </RepeaterItem>
          ))}
        </Repeater>
      </Form>
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
      <Form>
        <Repeater separator onAdd={handleAdd}>
          {items.map((item, index) => (
            <RepeaterItem
              key={index}
              onRemove={() => {
                setValue('items', [...items.slice(0, index), ...items.slice(index + 1)]);
              }}
            >
              <FormGroup spacing="none">
                <Label htmlFor={`primary[${index}]`}>Primary</Label>
                <Hint id={`primary-hint`}>Primary title text</Hint>
                <Input aria-describedby={`primary-hint`} {...register(`items.${index}`)} />
              </FormGroup>
            </RepeaterItem>
          ))}
        </Repeater>
      </Form>
    );
  },
};
