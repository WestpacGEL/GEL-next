import { type Meta, StoryFn } from '@storybook/react-vite';
import { ChangeEvent, useState } from 'react';

import { Form, FormGroup, Hint, Input, Label } from '../index.js';

import { Compacta } from './compacta.component.js';

const meta: Meta<typeof Compacta> = {
  title: 'Components/Compacta',
  component: Compacta,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  args: {},
};

export default meta;

/**
 * > Default usage example
 */
export const Default = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: object) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Compacta>
      {({ id, setPrimaryTitle, setSecondaryTitle, setTertiaryTitle }) => (
        <Form>
          <FormGroup>
            <Label htmlFor={`primary-${id}`}>Primary</Label>
            <Hint id={`primary-hint-${id}`}>Primary title text</Hint>
            <Input
              aria-describedby={`primary-hint-${id}`}
              name={`primary-${id}`}
              id={`primary-${id}`}
              value={inputs[`primary-${id}` as keyof typeof inputs] || ''}
              onChange={e => {
                handleChange(e);
                setPrimaryTitle(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor={`secondary-${id}`}>Secondary</Label>
            <Hint id={`secondary-hint-${id}`}>Secondary title text</Hint>
            <Input
              aria-describedby={`secondary-hint-${id}`}
              name={`secondary-${id}`}
              id={`secondary-${id}`}
              value={inputs[`secondary-${id}` as keyof typeof inputs] || ''}
              onChange={e => {
                handleChange(e);
                setSecondaryTitle(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor={`tertiary-${id}`}>Tertiary</Label>
            <Hint id={`tertiary-hint-${id}`}>Tertiary title text</Hint>
            <Input
              aria-describedby={`tertiary-hint-${id}`}
              name={`tertiary-${id}`}
              id={`tertiary-${id}`}
              value={inputs[`tertiary-${id}` as keyof typeof inputs] || ''}
              onChange={e => {
                handleChange(e);
                setTertiaryTitle(e.target.value);
              }}
            />
          </FormGroup>
        </Form>
      )}
    </Compacta>
  );
};

/**
 * > With onAdd and onRemove callbacks
 */
export const WithCallbacks = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: object) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Compacta onAdd={() => console.log('added')} onRemove={(id, index) => console.log('removed', id, index)}>
      {({ id, setPrimaryTitle, setSecondaryTitle, setTertiaryTitle }) => (
        <Form>
          <FormGroup>
            <Label htmlFor={`primary-${id}`}>Primary</Label>
            <Hint id={`primary-hint-${id}`}>Primary title text</Hint>
            <Input
              aria-describedby={`primary-hint-${id}`}
              name={`primary-${id}`}
              id={`primary-${id}`}
              value={inputs[`primary-${id}` as keyof typeof inputs] || ''}
              onChange={e => {
                handleChange(e);
                setPrimaryTitle(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor={`secondary-${id}`}>Secondary</Label>
            <Hint id={`secondary-hint-${id}`}>Secondary title text</Hint>
            <Input
              aria-describedby={`secondary-hint-${id}`}
              name={`secondary-${id}`}
              id={`secondary-${id}`}
              value={inputs[`secondary-${id}` as keyof typeof inputs] || ''}
              onChange={e => {
                handleChange(e);
                setSecondaryTitle(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor={`tertiary-${id}`}>Tertiary</Label>
            <Hint id={`tertiary-hint-${id}`}>Tertiary title text</Hint>
            <Input
              aria-describedby={`tertiary-hint-${id}`}
              name={`tertiary-${id}`}
              id={`tertiary-${id}`}
              value={inputs[`tertiary-${id}` as keyof typeof inputs] || ''}
              onChange={e => {
                handleChange(e);
                setTertiaryTitle(e.target.value);
              }}
            />
          </FormGroup>
        </Form>
      )}
    </Compacta>
  );
};

/**
 * > Usage with initial compactas.
 */
export const WithInitialCompactas = () => {
  // Imagine this is saved data
  const [inputs, setInputs] = useState<Record<string, string>>({
    'primary-1234': 'test',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <p className="font-bold">
        All the initial compactas should have a unique id passed that is associated with a compacta if you want to
        pre-fill information in inputs based on input IDs
      </p>
      <br />
      <Compacta
        initialCompactas={[
          {
            // Unique ID for the individual compacta, doesn't need to be the same as original. Could be saved from provided id from compacta
            id: '1234',
            title: { primary: inputs[`primary-1234`] },
          },
          // Represents a second compacta with no initial values, doesn't need an id if you don't want to pre-fill values
          {},
        ]}
      >
        {({ id, setPrimaryTitle, setSecondaryTitle, setTertiaryTitle }) => (
          <Form>
            <FormGroup>
              <Label htmlFor={`primary-${id}`}>Primary</Label>
              <Hint id={`primary-hint-${id}`}>Primary title text</Hint>
              <Input
                aria-describedby={`primary-hint-${id}`}
                name={`primary-${id}`}
                id={`primary-${id}`}
                value={inputs[`primary-${id}`] || ''}
                onChange={e => {
                  handleChange(e);
                  setPrimaryTitle(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor={`secondary-${id}`}>Secondary</Label>
              <Hint id={`secondary-hint-${id}`}>Secondary title text</Hint>
              <Input
                aria-describedby={`secondary-hint-${id}`}
                name={`secondary-${id}`}
                id={`secondary-${id}`}
                value={inputs[`secondary-${id}`] || ''}
                onChange={e => {
                  handleChange(e);
                  setSecondaryTitle(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor={`tertiary-${id}`}>Tertiary</Label>
              <Hint id={`tertiary-hint-${id}`}>Tertiary title text</Hint>
              <Input
                aria-describedby={`tertiary-hint-${id}`}
                name={`tertiary-${id}`}
                id={`tertiary-${id}`}
                value={inputs[`tertiary-${id}`] || ''}
                onChange={e => {
                  handleChange(e);
                  setTertiaryTitle(e.target.value);
                }}
              />
            </FormGroup>
          </Form>
        )}
      </Compacta>
    </>
  );
};
