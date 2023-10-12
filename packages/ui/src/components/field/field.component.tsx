import React, { Children, ReactNode, cloneElement, isValidElement, useCallback } from 'react';
import { useField } from 'react-aria';

import { ErrorMessage, FormHint, FormLabel } from '../index.js';

import { styles } from './field.styles.js';
import { type FieldProps } from './field.types.js';

export function Field({
  className,
  label,
  tag: Tag = 'div',
  children,
  hintMessage,
  errorMessage,
  labelElementType,
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
  }, [children]);

  return (
    <Tag className={styles({ className })} {...props}>
      <FormLabel {...labelProps}>{label}</FormLabel>
      {hintMessage && <FormHint {...descriptionProps}>{hintMessage}</FormHint>}
      {errorMessage && <ErrorMessage {...errorMessageProps} message={errorMessage} />}
      {renderChildren()}
    </Tag>
  );
}
