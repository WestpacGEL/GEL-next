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
  ...props
}: BottomSheetProps) {
  return (
    <BottomSheetModal state={state} {...props}>
      <BottomSheetDialog
        primaryLabel={primaryLabel}
        secondaryLabel={secondaryLabel}
        primaryOnClick={primaryOnClick}
        secondaryOnClick={secondaryOnClick}
        onClose={() => state.close()}
        title={title}
      >
        {children}
      </BottomSheetDialog>
    </BottomSheetModal>
  );
}
