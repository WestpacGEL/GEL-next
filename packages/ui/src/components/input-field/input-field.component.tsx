import React, { Children, ReactNode, cloneElement, isValidElement, useCallback, useId, useMemo } from 'react';

import { Form } from '../form/form.component.js';

import { InputAddOn } from './components/add-ons/add-ons.component.js';
import { SupportingText } from './components/index.js';
import { styles } from './input-field.styles.js';
import { type InputFieldProps } from './input-field.types.js';

export function InputField({
  label,
  hideLabel,
  size = 'medium',
  hint,
  errorMessage,
  supportingText,
  instanceId,
  after,
  before,
  children,
  tag: Tag = 'div',
  ...props
}: InputFieldProps) {
  const _id = useId();
  const id = useMemo(() => instanceId || `gel-field-${_id}`, [_id, instanceId]);

  const ariaDescribedByValue = useMemo(() => {
    const arr = [
      ...(errorMessage ? [`${id}-error`] : []),
      ...(hint ? [`${id}-hint`] : []),
      ...(before ? [`${id}-text-before`] : []),
      ...(after ? [`${id}-text-after`] : []),
      ...(supportingText ? [`${id}-supporting-text`] : []),
    ];
    return arr.join(' ');
  }, [id, hint, errorMessage, supportingText]);

  const {
    element: beforeElement,
    icon: beforeIcon,
    inset: beforeInset,
  } = useMemo(() => {
    if (
      before &&
      typeof before !== 'boolean' &&
      typeof before !== 'string' &&
      typeof before !== 'number' &&
      ('element' in before || 'icon' in before || 'inset' in before)
    ) {
      return { ...before, inset: before.inset || !!before.icon };
    }
    return { element: before as ReactNode, icon: undefined, inset: false };
  }, [before]);

  const {
    element: afterElement,
    icon: afterIcon,
    inset: afterInset,
  } = useMemo(() => {
    if (
      after &&
      typeof after !== 'boolean' &&
      typeof after !== 'string' &&
      typeof after !== 'number' &&
      ('element' in after || 'icon' in after || 'inset' in after)
    ) {
      return { ...after, inset: after.inset || !!after.icon };
    }
    return { element: after as ReactNode, icon: undefined, inset: false };
  }, [after]);

  const renderChildren = useCallback(() => {
    return Children.map<ReactNode, ReactNode>(children, child => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          size,
          'aria-describedby': ariaDescribedByValue,
        } as any);
      }
    });
  }, [children, ariaDescribedByValue]);

  const isFieldset = useMemo(() => Tag === 'fieldset', [Tag]);

  return (
    <Tag className={styles({ before: !!before, after: !!after, afterInset, beforeInset })} {...props}>
      {label && (
        <Form.Label srOnly={hideLabel} tag={isFieldset ? 'legend' : 'label'} {...(!isFieldset && { htmlFor: id })}>
          {label}
        </Form.Label>
      )}
      {hint && <Form.Hint id={`${id}-hint`}>{hint}</Form.Hint>}
      {errorMessage && <Form.ErrorMessage id={`${id}-error`} message={errorMessage} />}
      <div className="relative flex">
        {before && (
          <InputAddOn position="before" size={size} inset={beforeInset} icon={beforeIcon} id={id}>
            {beforeElement}
          </InputAddOn>
        )}
        {renderChildren()}
        {after && (
          <InputAddOn position="after" size={size} inset={afterInset} icon={afterIcon} id={id}>
            {afterElement}
          </InputAddOn>
        )}
      </div>
      {supportingText && <SupportingText id={`${id}-supporting-text`}>{supportingText}</SupportingText>}
    </Tag>
  );
}
