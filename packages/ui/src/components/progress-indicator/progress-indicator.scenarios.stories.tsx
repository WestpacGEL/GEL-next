import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
import { useOverlayTriggerState } from 'react-stately';

import { Button } from '../button/button.component.js';
import { ClearIcon, DropDownIcon } from '../icon/index.js';
import { Input } from '../input/input.component.js';
import { InputGroup } from '../input-group/input-group.component.js';
import { ModalBody } from '../modal/index.js';
import { Modal } from '../modal/modal.component.js';

import { ProgressIndicator } from './progress-indicator.component.js';

const meta: Meta<typeof ProgressIndicator> = {
  title: 'Components/ProgressIndicator/Scenarios',
  component: ProgressIndicator,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * >Default usage example
 */
export const Default: Story = {
  args: { size: 'large' },
};

/**
 * >Usage in buttons
 */

export const ButtonsUsage = () => {
  return (
    <div>
      {(['large', 'medium', 'small'] as const).map(size => (
        <>
          <h3 className="font-bold">{size.charAt(0).toUpperCase() + size.slice(1)}</h3>
          <div className="flex gap-2 py-2">
            {(['primary', 'hero', 'faint'] as const).map(look => (
              <Button
                size={size}
                look={look}
                key={`${size}-${look}`}
                iconAfter={ProgressIndicator}
                iconSize={size === 'small' ? 'xsmall' : 'small'}
                iconColor={look === 'faint' ? 'hero' : 'white'}
              >
                Loading...{'  '}
              </Button>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};

/**
 * > Usage in input
 */

export const InputUsage = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const clearInput = useCallback(() => setInputValue(''), []);

  return (
    <>
      <InputGroup
        label="Input with left progress indicator"
        before={{
          icon: ProgressIndicator,
        }}
        after={{
          inset: true,
          element: <Button onClick={clearInput} look="link" iconAfter={ClearIcon} iconColor="muted" />,
        }}
      >
        <Input onChange={({ target: { value } }) => setInputValue(value)} value={inputValue} />
      </InputGroup>
      <InputGroup
        label="Input with right progress indicator"
        before={{
          inset: true,
          element: <Button onClick={clearInput} look="link" iconAfter={DropDownIcon} iconColor="muted" />,
        }}
        after={{
          icon: ProgressIndicator,
        }}
      >
        <Input onChange={({ target: { value } }) => setInputValue(value)} value={inputValue} />
      </InputGroup>
    </>
  );
};

/**
 * > Usage in loading overlay
 */
export const LoadingOverlayUsage = () => {
  const state = useOverlayTriggerState({});

  return (
    <>
      <Modal size="full" state={state} aria-label="Loading overlay" className="bg-transparent">
        <ModalBody
          onClick={() => state.close()}
          className="align-center min-h-100vh min-w-100vw flex flex-col justify-center"
        >
          <ProgressIndicator color="white" size="large" label="Loading..." />
        </ModalBody>
      </Modal>
      <Button onClick={() => state.open()}>Open Loader</Button>
    </>
  );
};
