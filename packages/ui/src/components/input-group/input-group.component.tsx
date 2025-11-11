'use client';

import { clsx } from 'clsx';
import React, {
  Attributes,
  Children,
  ReactNode,
  cloneElement,
  isValidElement,
  useCallback,
  useId,
  useMemo,
} from 'react';

import { ErrorMessage, Hint, Label } from '../index.js';

import { InputGroupSupportingText } from './components/index.js';
import { InputGroupAddOn } from './components/input-group-add-ons/input-group-add-ons.component.js';
import { styles as inputGroupStyles } from './input-group.styles.js';
import { type InputGroupProps } from './input-group.types.js';

export function InputGroup({
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
  className,
  width = 'full',
  id: propID,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabel,
  ...props
}: InputGroupProps) {
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
  }, [errorMessage, id, hint, before, after, supportingText]);

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
          id: propID || id,
          'aria-labelledby': ariaLabelledBy,
          'aria-describedby': ariaDescribedBy || ariaDescribedByValue,
          'aria-label': ariaLabel,
          ...(width !== 'full' ? { width: width } : {}),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
          className: clsx(child.props.className, 'focus:z-10'), // for focus ring visibility
        } as Partial<unknown> & Attributes);
      }
    });
  }, [children, size, propID, id, ariaLabelledBy, ariaDescribedBy, ariaDescribedByValue, ariaLabel, width]);

  const isFieldset = useMemo(() => Tag === 'fieldset', [Tag]);

  const styles = inputGroupStyles({
    before: !!before,
    after: !!after,
    afterInset,
    beforeInset,
    width: width,
  });

  return (
    <Tag className={styles.base({ className })} {...props}>
      {label && (
        <Label srOnly={hideLabel} tag={isFieldset ? 'legend' : 'label'} {...(!isFieldset && { htmlFor: id })}>
          {label}
        </Label>
      )}
      {hint && <Hint id={`${id}-hint`}>{hint}</Hint>}
      {errorMessage && <ErrorMessage id={`${id}-error`} message={errorMessage} />}
      <div className={styles.input()}>
        {before && (
          <InputGroupAddOn position="before" size={size} inset={beforeInset} icon={beforeIcon} id={id}>
            {beforeElement}
          </InputGroupAddOn>
        )}
        {renderChildren()}
        {after && (
          <InputGroupAddOn position="after" size={size} inset={afterInset} icon={afterIcon} id={id}>
            {afterElement}
          </InputGroupAddOn>
        )}
      </div>
      {supportingText && (
        <InputGroupSupportingText id={`${id}-supporting-text`}>{supportingText}</InputGroupSupportingText>
      )}
    </Tag>
  );
}
