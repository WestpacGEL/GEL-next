import { type Meta, StoryFn } from '@storybook/react-vite';
import { Fragment, useMemo, useRef } from 'react';
import { useOverlayTriggerState } from 'react-stately';

import { Button, ModalBody, ModalFooter, ModalProps } from '../index.js';

import { Modal } from './modal.component.js';

const getSizeTitle = (size: ModalProps['size']) => {
  switch (size) {
    case 'sm':
      return 'small';
    case 'md':
      return 'medium';
    case 'lg':
      return 'large';
    default:
      return size as string;
  }
};

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
          <Modal isDismissable size={size} state={states[size]} title={`Modal ${getSizeTitle(size)}`}>
            <ModalBody>
              {`
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
    `}
            </ModalBody>
            <ModalFooter
              primaryLabel="Label"
              primaryOnClick={() => states[size].close()}
              secondaryLabel="Label"
              secondaryOnClick={() => states[size].close()}
            />
          </Modal>
          <Button onClick={() => states[size].open()}>Open Modal {getSizeTitle(size)}</Button>
        </Fragment>
      ))}
    </div>
  );
};

/**
 * > Examples of all sizes with a large amount of content
 */
export const ScrollableSizes = () => {
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
          <Modal isDismissable size={size} state={states[size]} title={`Modal ${getSizeTitle(size)}`}>
            <ModalBody>
              {`
     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque venenatis fermentum elit, non scelerisque diam sagittis eget. Nullam auctor pharetra risus eu pulvinar. Cras vel risus vel ex lobortis ullamcorper vel ut erat. Duis ornare turpis vel tempus malesuada. Nullam auctor sed risus ultricies vestibulum. Quisque suscipit eros sem, id cursus dolor porttitor sit amet. Quisque euismod risus nec est gravida aliquet. Sed sodales ante et ligula fringilla tristique.
Phasellus elementum, augue in tempor imperdiet, justo mauris porttitor elit, ac ornare mauris tellus ac ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In ante mi, rhoncus in nisl id, convallis aliquet quam. Pellentesque non sem metus. Curabitur fermentum feugiat justo, quis gravida dui convallis ut. Fusce lorem magna, fringilla id auctor eu, faucibus vitae magna. Etiam vehicula dictum lorem, vel vestibulum magna consequat sed. Fusce hendrerit diam vel massa feugiat elementum. Nunc eget diam eu tortor quam. Pellentesque non sem metus. Curabitur fermentum feugiat justo, quis gravida dui convallis ut. Fusce lorem magna, fringilla id auctor eu, faucibus vitae magna. Etiam vehicula dictum lorem, vel vestibulum magna consequat sed. Fusce hendrerit diam vel massa feugiat elementum. Nunc eget diam eu tortor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque venenatis fermentum elit, non scelerisque diam sagittis eget. Nullam auctor pharetra risus eu pulvinar. Cras vel risus vel ex lobortis ullamcorper vel ut erat. Duis ornare turpis vel tempus malesuada. Nullam auctor sed risus ultricies vestibulum. Quisque suscipit eros sem, id cursus dolor porttitor sit amet. Quisque euismod risus nec est gravida aliquet. Sed sodales ante et ligula fringilla tristique. Sed sodales ante et ligula fringilla tristique.
    `}
            </ModalBody>
            <ModalFooter
              primaryLabel="Label"
              primaryOnClick={() => states[size].close()}
              secondaryLabel="Label"
              secondaryOnClick={() => states[size].close()}
            />
          </Modal>
          <Button onClick={() => states[size].open()}>Open Modal {getSizeTitle(size)}</Button>
        </Fragment>
      ))}
    </div>
  );
};

/**
 * > Examples of all sizes with reduced padding
 */
export const CompactSizes = () => {
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
          <Modal compact isDismissable size={size} state={states[size]} title={`Modal ${getSizeTitle(size)}`}>
            <ModalBody>
              {`
     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque venenatis fermentum elit, non scelerisque diam sagittis eget. Nullam auctor pharetra risus eu pulvinar. Cras vel risus vel ex lobortis ullamcorper vel ut erat. Duis ornare turpis vel tempus malesuada. Nullam auctor sed risus ultricies vestibulum. Quisque suscipit eros sem, id cursus dolor porttitor sit amet. Quisque euismod risus nec est gravida aliquet. Sed sodales ante et ligula fringilla tristique.
Phasellus elementum, augue in tempor imperdiet, justo mauris porttitor elit, ac ornare mauris tellus ac ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In ante mi, rhoncus in nisl id, convallis aliquet quam. Pellentesque non sem metus. Curabitur fermentum feugiat justo, quis gravida dui convallis ut. Fusce lorem magna, fringilla id auctor eu, faucibus vitae magna. Etiam vehicula dictum lorem, vel vestibulum magna consequat sed. Fusce hendrerit diam vel massa feugiat elementum. Nunc eget diam eu tortor quam. Pellentesque non sem metus. Curabitur fermentum feugiat justo, quis gravida dui convallis ut. Fusce lorem magna, fringilla id auctor eu, faucibus vitae magna. Etiam vehicula dictum lorem, vel vestibulum magna consequat sed. Fusce hendrerit diam vel massa feugiat elementum. Nunc eget diam eu tortor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque venenatis fermentum elit, non scelerisque diam sagittis eget. Nullam auctor pharetra risus eu pulvinar. Cras vel risus vel ex lobortis ullamcorper vel ut erat. Duis ornare turpis vel tempus malesuada. Nullam auctor sed risus ultricies vestibulum. Quisque suscipit eros sem, id cursus dolor porttitor sit amet. Quisque euismod risus nec est gravida aliquet. Sed sodales ante et ligula fringilla tristique.
    `}
            </ModalBody>
            <ModalFooter
              primaryLabel="Label"
              primaryOnClick={() => states[size].close()}
              secondaryLabel="Label"
              secondaryOnClick={() => states[size].close()}
            />
          </Modal>
          <Button onClick={() => states[size].open()}>Open Modal {getSizeTitle(size)}</Button>
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
