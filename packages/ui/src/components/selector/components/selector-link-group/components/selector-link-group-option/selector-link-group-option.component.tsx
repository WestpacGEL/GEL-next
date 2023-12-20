import React, { forwardRef, useContext, useId, useRef } from 'react';
import { mergeProps, useFocusRing, useLink } from 'react-aria';

import { FlexiCell } from '../../../../../../index.js';
import {
  FlexiCellAdornment,
  FlexiCellBody,
  FlexiCellButton,
  FlexiCellCircle,
  FlexiCellFooter,
  FlexiCellHint,
  FlexiCellLabel,
} from '../../../../../flexi-cell/index.js';
import { ArrowRightIcon } from '../../../../../icon/index.js';
import { SelectorLinkContext } from '../../selector-link-group.component.js';

import { styles as SelectorLinkGroupOptionStyles } from './selector-link-group-option.styles.js';
import { type SelectorLinkGroupOptionProps } from './selector-link-group-option.types.js';

function BaseSelectorLinkGroupOption(
  {
    className,
    children,
    withBorder = true,
    withArrow,
    after,
    before,
    isDisabled = false,
    href,
    ...props
  }: SelectorLinkGroupOptionProps,
  ref: any,
) {
  const id = useId();
  const localRef = useRef(ref);
  const state = useContext(SelectorLinkContext);
  const { linkProps } = useLink({ ...props }, localRef);
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = SelectorLinkGroupOptionStyles({
    className,
    isFocusVisible,
    isDisabled: state.isDisabled ? state.isDisabled : isDisabled,
  });

  return (
    <FlexiCell
      after={
        <div className="flex gap-2">
          {after}
          <ArrowRightIcon aria-hidden="true" className={styles.icon({})} />
        </div>
      }
      before={before}
      withBorder={withBorder}
      withArrow={withArrow}
      tag="a"
      ref={ref}
      className={styles.base({})}
      id={id}
      href={href}
      disabled={isDisabled}
      {...mergeProps(linkProps, focusProps)}
    >
      {children}
    </FlexiCell>
  );
}

export const SelectorLinkGroupOption = forwardRef(BaseSelectorLinkGroupOption) as React.ForwardRefExoticComponent<
  SelectorLinkGroupOptionProps & React.RefAttributes<unknown>
> & {
  Adornment: typeof FlexiCell.Adornment;
  Body: typeof FlexiCell.Body;
  Button: typeof FlexiCell.Button;
  Circle: typeof FlexiCell.Circle;
  Footer: typeof FlexiCell.Footer;
  Hint: typeof FlexiCell.Hint;
  Label: typeof FlexiCell.Label;
};

SelectorLinkGroupOption.Body = FlexiCellBody;
SelectorLinkGroupOption.Footer = FlexiCellFooter;
SelectorLinkGroupOption.Adornment = FlexiCellAdornment;
SelectorLinkGroupOption.Hint = FlexiCellHint;
SelectorLinkGroupOption.Label = FlexiCellLabel;
SelectorLinkGroupOption.Button = FlexiCellButton;
SelectorLinkGroupOption.Circle = FlexiCellCircle;
