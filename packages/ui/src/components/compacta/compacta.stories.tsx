import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { ChangeEvent, ReactNode, useState } from 'react';

import { Form, Input } from '../index.js';

import { Compacta } from './compacta.component.js';

const meta: Meta<typeof Compacta> = {
  title: 'Example/Compacta',
  component: Compacta,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="p-5">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const StoryDefault = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: object) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <Compacta>
      {({ id, setPrimaryTitle, setSecondaryTitle, setTertiaryTitle }) => (
        <Form>
          <Form.Group>
            <Form.Label htmlFor={`primary-${id}`}>Primary</Form.Label>
            <Form.Hint>Primary title text</Form.Hint>
            <Input
              name={`primary-${id}`}
              value={inputs[`primary-${id}` as keyof typeof inputs] || ''}
              onChange={e => {
                handleChange(e);
                setPrimaryTitle(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor={`secondary-${id}`}>Secondary</Form.Label>
            <Form.Hint>Secondary title text</Form.Hint>
            <Input
              name={`secondary-${id}`}
              value={inputs[`secondary-${id}` as keyof typeof inputs] || ''}
              onChange={e => {
                handleChange(e);
                setSecondaryTitle(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor={`tertiary-${id}`}>Tertiary</Form.Label>
            <Form.Hint>Tertiary title text</Form.Hint>
            <Input
              name={`tertiary-${id}`}
              value={inputs[`tertiary-${id}` as keyof typeof inputs] || ''}
              onChange={e => {
                handleChange(e);
                setTertiaryTitle(e.target.value);
              }}
            />
          </Form.Group>
        </Form>
      )}
    </Compacta>
  );
};
