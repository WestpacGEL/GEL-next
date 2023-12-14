import React from 'react';

import { BottomSheetProps } from './bottom-sheet.types.js';
import { Dialog } from './components/dialog/dialog.component.js';
import { Modal } from './components/modal/modal.component.js';

/**
 * Bottom sheet component
 */
export function BottomSheet({ children, state, ...props }: BottomSheetProps) {
  return (
    <Modal state={state} {...props}>
      <Dialog onClose={state.close}>{children}</Dialog>
    </Modal>
  );
}
