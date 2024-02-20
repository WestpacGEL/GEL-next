import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { Fragment, useMemo } from 'react';
import { useOverlayTriggerState } from 'react-stately';

import { Button, ModalBody, ModalFooter } from '../index.js';

import { Modal } from './modal.component.js';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
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
  render: ({ children, ...props }) => {
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
export const WithFooter: Story = {
  args: {
    children: `I'm children`,
    title: 'Title',
    isDismissable: true,
  },
  render: ({ children, ...props }) => {
    const state = useOverlayTriggerState({});

    return (
      <>
        <Modal {...props} state={state} aria-label="Modal title">
          <ModalBody>{children}</ModalBody>
          <ModalFooter
            primaryLabel="Label"
            primaryOnClick={state.close}
            secondaryLabel="Label"
            secondaryOnClick={state.close}
          />
        </Modal>
        <Button onClick={state.open}>Open Modal</Button>
      </>
    );
  },
};

/**
 * > All sizes usage example
 */
export const Sizes: Story = {
  args: {
    children: `Type something but keep it simple. Modals should be easy to digest so that the user can quickly get back to what they were doing.`,
    title: 'Title',
    isDismissable: true,
  },
  render: ({ children, ...props }) => {
    const stateSM = useOverlayTriggerState({});
    const stateMD = useOverlayTriggerState({});
    const stateLG = useOverlayTriggerState({});
    const stateFull = useOverlayTriggerState({});
    const stateFluid = useOverlayTriggerState({});

    const states = useMemo(() => {
      return {
        sm: stateSM,
        md: stateMD,
        lg: stateLG,
        full: stateFull,
        fluid: stateFluid,
      };
    }, [stateSM, stateMD, stateLG, stateFull, stateFluid]);

    return (
      <div className="flex gap-2">
        {(['sm', 'md', 'lg', 'full', 'fluid'] as const).map(size => (
          <Fragment key={size}>
            <Modal {...props} size={size} state={states[size]} title={`Modal ${size}`}>
              <ModalBody>{children}</ModalBody>
              <ModalFooter
                primaryLabel="Label"
                primaryOnClick={states[size].close}
                secondaryLabel="Label"
                secondaryOnClick={states[size].close}
              />
            </Modal>
            <Button onClick={states[size].open}>Open Modal {size}</Button>
          </Fragment>
        ))}
      </div>
    );
  },
};

/**
 * > Not dismissable example
 */
export const NotDismissible: Story = {
  args: {
    children: `I'm children`,
    title: 'Title',
    isDismissable: false,
  },
  render: ({ children, ...props }) => {
    const state = useOverlayTriggerState({});

    return (
      <>
        <Modal {...props} state={state} aria-label="Modal title">
          <ModalBody>{children}</ModalBody>
          <ModalFooter
            primaryLabel="Label"
            primaryOnClick={state.close}
            secondaryLabel="Label"
            secondaryOnClick={state.close}
          />
        </Modal>
        <Button onClick={state.open}>Open Modal</Button>
      </>
    );
  },
};

/**
 * > Responsive modal example, fluid on mobile and different sizes on desktop
 */
export const Responsive: Story = {
  args: {
    children: `I'm children`,
    title: 'Title',
    isDismissable: true,
  },
  render: ({ children, ...props }) => {
    const state = useOverlayTriggerState({});

    return (
      <>
        <Modal
          {...props}
          size={{ initial: 'fluid', md: 'sm', lg: 'md', xl: 'lg' }}
          state={state}
          aria-label="Modal title"
        >
          <ModalBody>{children}</ModalBody>
          <ModalFooter
            primaryLabel="Label"
            primaryOnClick={state.close}
            secondaryLabel="Label"
            secondaryOnClick={state.close}
          />
        </Modal>
        <Button onClick={state.open}>Open Modal</Button>
      </>
    );
  },
};
