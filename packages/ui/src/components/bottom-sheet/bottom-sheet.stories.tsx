import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useOverlayTriggerState } from 'react-stately';

import { Button } from '../index.js';

import { BottomSheet } from './bottom-sheet.component.js';
import { BottomSheetProps } from './bottom-sheet.types.js';

const StoryBottomSheet = ({ children, ...props }: BottomSheetProps) => {
  const bottomSheetState = useOverlayTriggerState({});

  return (
    <>
      <Button onClick={() => bottomSheetState.open()}> Open Bottom Sheet </Button>
      <BottomSheet {...props} state={bottomSheetState}>
        {children}
      </BottomSheet>
    </>
  );
};

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: StoryBottomSheet,
  tags: ['autodocs'],
  argTypes: {
    state: {
      description: 'The Bottom Sheet opening and closing state, should use OverlayTriggerState from react-stately',
      type: { name: 'other', value: 'OverlayTriggerState' },
    },
    children: { description: 'Body content of Bottom Sheet' },
    isDismissable: {
      description: 'Whether to close the modal when the user interacts outside it',
      type: { name: 'boolean' },
    },
    height: {
      description: 'Height of the Modal',
      type: { name: 'string' },
    },
    portalContainer: {
      description: 'Element where the modal will be rendered, by default it will be into the body',
      type: { name: 'other', value: 'Element' },
    },
    width: {
      description: 'Width of the Modal',
      type: { name: 'string' },
    },
    title: { description: 'Title for bottom sheet', type: { name: 'string' } },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const DefaultWithDismiss: Story = {
  args: {
    title: 'Heading',
    primaryLabel: 'Label',
    secondaryLabel: 'Label',
    primaryOnClick: () => null,
    secondaryOnClick: () => null,
    isDismissable: true,
    children: (
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam ullam atque dignissimos ab quaerat nobis rem a
        ad blanditiis laborum labore repellendus, vero nihil ducimus, aliquam culpa explicabo doloremque corporis.
      </p>
    ),
  },
};

/**
 * > No footer example
 */
export const NoFooter: Story = {
  args: {
    title: 'Heading',
    isDismissable: true,
    children: (
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam ullam atque dignissimos ab quaerat nobis rem a
        ad blanditiis laborum labore repellendus, vero nihil ducimus, aliquam culpa explicabo doloremque corporis.
      </p>
    ),
  },
};

/**
 * > No close button example
 */
export const NoCloseButton: Story = {
  args: {
    title: 'Heading',
    primaryLabel: 'Label',
    secondaryLabel: 'Label',
    primaryOnClick: () => null,
    secondaryOnClick: () => null,
    children: (
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam ullam atque dignissimos ab quaerat nobis rem a
        ad blanditiis laborum labore repellendus, vero nihil ducimus, aliquam culpa explicabo doloremque corporis.
      </p>
    ),
  },
};

/**
 * > Example showing how to use an onClose callback with the modal to be called when Bottom Sheet is closed
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
      <BottomSheet title="Title" isDismissable state={state} aria-label="Bottom Sheet title">
        {`
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem corporis saepe sapiente officia inventore eligendi dolores delectus vitae veritatis repudiandae, unde alias, ipsa a consequatur assumenda perferendis, commodi rem voluptates?
    `}
      </BottomSheet>
      <Button onClick={() => state.open()}>Open Bottom Sheet</Button>
    </>
  );
};
