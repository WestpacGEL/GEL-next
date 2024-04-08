'use client';

import React, { ReactNode, useContext, useRef } from 'react';
import { VisuallyHidden, useFocusRing, useRadio } from 'react-aria';

import { FlexiCell, FlexiCellButton } from '../../flexi-cell/index.js';
import { Label } from '../../label/index.js';
import { FaceHappyPictogram } from '../../pictogram/index.js';
import { FlexiFieldContext } from '../flexi-group.component.js';
import { FlexiFieldGroupProps } from '../flexi-group.types.js';

export function FlexiFieldComponent({
  className,
  label,
  pictogram = <FaceHappyPictogram />,
  ...props
}: FlexiFieldGroupProps & { pictogram: ReactNode }) {
  const { state } = useContext(FlexiFieldContext);
  const ref = useRef(null);
  const { inputProps, isSelected, isDisabled } = useRadio({ ...props, children: label }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  // const styles = buttonStyles({ isDisabled, isFocusVisible });
  console.log({ inputProps });
  return (
    <label className={className}>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <FlexiCell
        tag="button"
        withBorder
        className={'w-full text-left'}
        disabled={isDisabled}
        aria-selected={isSelected}
      >
        {pictogram}
        <Label>{label}</Label>
      </FlexiCell>
    </label>
  );
}
