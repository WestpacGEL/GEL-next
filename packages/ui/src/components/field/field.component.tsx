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
  errorMessage,
  labelElementType,
  labelSize,
  ...props
}: FieldProps) {
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = useField({
    ...props,
    description: hintMessage,
    errorMessage,
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

  return (
    <Tag className={className} {...props}>
      {label && (
        <Label size={labelSize} {...labelProps}>
          {label}
        </Label>
      )}
      {hintMessage && <Hint {...descriptionProps}>{hintMessage}</Hint>}
      {errorMessage && <ErrorMessage {...errorMessageProps} message={errorMessage} />}
      {renderChildren()}
    </Tag>
  );
}
