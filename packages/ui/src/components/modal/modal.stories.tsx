import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { Fragment, useMemo } from 'react';
import { useOverlayTriggerState } from 'react-stately';

import { Button } from '../index.js';

import { Modal } from './modal.component.js';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const DefaultStory: Story = {
  args: {
    children: `
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
    `,
    title: 'Title',
    isDismissable: true,
  },
  render: ({ children, ...props }: any) => {
    const state = useOverlayTriggerState({});
    return (
      <>
        <Modal {...props} state={state} aria-label="Modal title" body>
          {children}
        </Modal>
        <Button onClick={state.open}>Open Modal</Button>
      </>
    );
  },
};

/**
 * > WithFooter usage example
 */
export const WithFooterStory: Story = {
  args: {
    children: `I'm children`,
    title: 'Title',
    isDismissable: true,
  },
  render: ({ children, ...props }: any) => {
    const state = useOverlayTriggerState({});

    return (
      <>
        <Modal {...props} state={state} aria-label="Modal title">
          <Modal.Body>{children}</Modal.Body>
          <Modal.Footer>
            <p>Lorem, ipsum dolor</p>
          </Modal.Footer>
        </Modal>
        <Button onClick={state.open}>Open Modal</Button>
      </>
    );
  },
};

/**
 * > All sizes usage example
 */
export const AllSizesStory: Story = {
  args: {
    children: `I'm children`,
    title: 'Title',
    isDismissable: true,
  },
  render: ({ children, ...props }: any) => {
    const stateSM = useOverlayTriggerState({});
    const stateMD = useOverlayTriggerState({});
    const stateLG = useOverlayTriggerState({});

    const states = useMemo(() => {
      return {
        sm: stateSM,
        md: stateMD,
        lg: stateLG,
      };
    }, [stateSM, stateMD, stateLG]);

    return (
      <div className="flex gap-2">
        {['sm', 'md', 'lg'].map((size: string) => (
          <Fragment key={size}>
            <Modal {...props} size={size} state={states[size as 'sm' | 'md' | 'lg']} title={`Modal ${size}`}>
              <Modal.Body>{children}</Modal.Body>
              <Modal.Footer>
                <p>Lorem, ipsum dolor</p>
              </Modal.Footer>
            </Modal>
            <Button onClick={states[size as 'sm' | 'md' | 'lg'].open}>Open Modal {size}</Button>
          </Fragment>
        ))}
      </div>
    );
  },
};

/**
 * > Not dismissable example
 */
export const NotDismissibleStory: Story = {
  args: {
    children: `I'm children`,
    title: 'Title',
    isDismissable: false,
  },
  render: ({ children, ...props }: any) => {
    const state = useOverlayTriggerState({});

    return (
      <>
        <Modal {...props} state={state} aria-label="Modal title">
          <Modal.Body>{children}</Modal.Body>
          <Modal.Footer className="flex justify-end gap-2">
            <Button look="faint" onClick={state.close}>
              Close
            </Button>
            <Button look="primary">Submit</Button>
          </Modal.Footer>
        </Modal>
        <Button onClick={state.open}>Open Modal</Button>
      </>
    );
  },
};
