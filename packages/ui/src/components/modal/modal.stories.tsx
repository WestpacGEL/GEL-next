import { type Meta, StoryFn } from '@storybook/react-vite';
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

/**
 * > Default usage example
 */
export const Default = () => {
  const state = useOverlayTriggerState({});
  return (
    <>
      <Modal title="Title" isDismissable state={state} aria-label="Modal title" body>
        {`
   Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
    `}
      </Modal>
      <Button onClick={() => state.open()}>Open Modal</Button>
    </>
  );
};

/**
 * > WithFooter usage example
 */
export const WithFooter = () => {
  const state = useOverlayTriggerState({});

  return (
    <>
      <Modal title="Title" isDismissable state={state} aria-label="Modal title">
        <ModalBody>{`I'm children`}</ModalBody>
        <ModalFooter
          primaryLabel="Label"
          primaryOnClick={() => state.close()}
          secondaryLabel="Label"
          secondaryOnClick={() => state.close()}
        />
      </Modal>
      <Button onClick={() => state.open()}>Open Modal</Button>
    </>
  );
};

/**
 * > All sizes usage example
 */
export const Sizes = () => {
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
          <Modal isDismissable size={size} state={states[size]} title={`Modal ${size}`}>
            <ModalBody>{`
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
    `}</ModalBody>
            <ModalFooter
              primaryLabel="Label"
              primaryOnClick={() => states[size].close()}
              secondaryLabel="Label"
              secondaryOnClick={() => states[size].close()}
            />
          </Modal>
          <Button onClick={() => states[size].open()}>Open Modal {size}</Button>
        </Fragment>
      ))}
    </div>
  );
};

/**
 * > Not dismissable example
 */
export const NotDismissible = () => {
  const state = useOverlayTriggerState({});

  return (
    <>
      <Modal title="title" isDismissable={false} state={state} aria-label="Modal title">
        <ModalBody>{`I'm children`}</ModalBody>
        <ModalFooter
          primaryLabel="Label"
          primaryOnClick={() => state.close()}
          secondaryLabel="Label"
          secondaryOnClick={() => state.close()}
        />
      </Modal>
      <Button onClick={() => state.open()}>Open Modal</Button>
    </>
  );
};

/**
 * > Responsive modal example, fluid on mobile and different sizes on desktop
 */
export const Responsive = () => {
  const state = useOverlayTriggerState({});

  return (
    <>
      <Modal
        title="title"
        isDismissable
        size={{ initial: 'fluid', md: 'sm', lg: 'md', xl: 'lg' }}
        state={state}
        aria-label="Modal title"
      >
        <ModalBody>{`I'm children`}</ModalBody>
        <ModalFooter
          primaryLabel="Label"
          primaryOnClick={() => state.close()}
          secondaryLabel="Label"
          secondaryOnClick={() => state.close()}
        />
      </Modal>
      <Button onClick={() => state.open()}>Open Modal</Button>
    </>
  );
};

/**
 * > Example showing how to use an onClose callback with the modal to be called when Modal is closed
 */
export const WithOnCloseCallback = () => {
  const onClose = () => {
    // eslint-disable-next-line no-console
    console.log('Modal closed');
  };
  const state = useOverlayTriggerState({
    onOpenChange: isOpen => {
      if (!isOpen) onClose();
    },
  });
  return (
    <>
      <Modal title="Title" isDismissable state={state} aria-label="Modal title" body>
        {`
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
    `}
      </Modal>
      <Button onClick={() => state.open()}>Open Modal</Button>
    </>
  );
};
