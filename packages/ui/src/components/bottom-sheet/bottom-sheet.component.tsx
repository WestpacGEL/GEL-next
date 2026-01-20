'use client';

import React from 'react';

import { BottomSheetProps } from './bottom-sheet.types.js';
import { BottomSheetDialog } from './components/bottom-sheet-dialog/bottom-sheet-dialog.component.js';
import { BottomSheetModal } from './components/bottom-sheet-modal/bottom-sheet-modal.component.js';

/**
 * Bottom sheet component
 */
export function BottomSheet({
  children,
  state,
  title,
  primaryLabel,
  secondaryLabel,
  primaryOnClick,
  secondaryOnClick,
  isDismissable = true,
  ...props
}: BottomSheetProps) {
  return (
    <BottomSheetModal state={state} isDismissable={isDismissable} {...props}>
      <BottomSheetDialog
        primaryLabel={primaryLabel}
        secondaryLabel={secondaryLabel}
        primaryOnClick={primaryOnClick}
        secondaryOnClick={secondaryOnClick}
        onClose={isDismissable ? () => state.close() : undefined}
        title={title}
      >
        {children}
      </BottomSheetDialog>
    </BottomSheetModal>
  );
}
