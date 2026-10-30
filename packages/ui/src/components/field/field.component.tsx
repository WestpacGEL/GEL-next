'use client';

import React, { Children, ReactNode, cloneElement, isValidElement, useCallback } from 'react';
import { useField } from 'react-aria';

import { ErrorMessage, Hint, Label } from '../index.js';

import { type FieldProps } from './field.types.js';

export function Field({
  className,
  label,
  tag: Tag = 'div',
  children,
  hintMessage,
  errorTitle,
  errorMessage,
  announceError = false,
  labelElementType,
  labelSize,
  id,
  ...props
}: FieldProps) {
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = useField({
    ...props,
    description: hintMessage,
    errorMessage,
    id,
    label,
    labelElementType,
  });

  const renderChildren = useCallback(() => {
    return Children.map<ReactNode, ReactNode>(children, child => {
      if (isValidElement(child)) {
        return cloneElement(child, fieldProps);
      }
    });
  }, [children, fieldProps]);

  const error = errorMessage && <ErrorMessage {...errorMessageProps} errorTitle={errorTitle} message={errorMessage} />;

  return (
    <Tag className={className} {...props}>
      {label && (
        <Label size={labelSize} {...labelProps}>
          {label}
        </Label>
      )}
      {hintMessage && <Hint {...descriptionProps}>{hintMessage}</Hint>}
      {announceError ? (
        // Keep the live region mounted before errors appear so updates can be announced.
        <div aria-live="polite" aria-atomic="true">
          {error}
        </div>
      ) : (
        error
      )}
      {renderChildren()}
    </Tag>
  );
}
