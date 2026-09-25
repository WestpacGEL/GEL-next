'use client';

import React from 'react';

import { FlyoutBackdrop, FlyoutDialog } from './components/index.js';
import { type FlyoutProps } from './flyout.types.js';

export function Flyout({
  backdropClassName,
  children,
  className,
  closeAssistiveText,
  heading,
  headingTag,
  isDismissable = true,
  isKeyboardDismissDisabled,
  portalContainer,
  position = 'right',
  shouldCloseOnInteractOutside,
  state,
  zIndex,
  ...props
}: FlyoutProps) {
  return (
    <FlyoutBackdrop
      className={backdropClassName}
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      portalContainer={portalContainer}
      shouldCloseOnInteractOutside={shouldCloseOnInteractOutside}
      state={state}
      zIndex={zIndex}
    >
      {({ flyoutRef, modalProps }) => (
        <FlyoutDialog
          {...props}
          className={className}
          closeAssistiveText={closeAssistiveText}
          flyoutRef={flyoutRef}
          heading={heading}
          headingTag={headingTag}
          isOpen={state.isOpen}
          modalProps={modalProps}
          onClose={isDismissable ? () => state.close() : undefined}
          position={position}
          key={position}
        >
          {children}
        </FlyoutDialog>
      )}
    </FlyoutBackdrop>
  );
}
