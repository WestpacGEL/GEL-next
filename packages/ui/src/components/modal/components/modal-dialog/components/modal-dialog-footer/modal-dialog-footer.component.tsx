'use client';

import React from 'react';

import { Button } from '../../../../../button/index.js';
import { useModalDialogContext } from '../../modal-dialog.component.js';

import { styles as modalFooterStyles } from './modal-dialog-footer.styles.js';
import { type ModalDialogFooterProps } from './modal-dialog-footer.types.js';

export function ModalDialogFooter({
  className,
  primaryLabel,
  primaryOnClick,
  secondaryLabel,
  secondaryOnClick,
  ...props
}: ModalDialogFooterProps) {
  // TODO: Remove commented code
  const { size, reducePadding, canScroll } = useModalDialogContext();
  const styles = modalFooterStyles({ size, reducePadding, canScroll });

  // const { scrollY } = useScroll({ container: scrollingRef?.current ? scrollingRef : undefined });

  // pixel amounts based on spacing values
  // const initialPaddingBottom = canScroll ? '30px' : '0px';
  // switch (size) {
  //   case 'lg':
  //     initialPaddingBottom = '72px';
  //     break;
  //   case 'full':
  //     initialPaddingBottom = '18px';
  //     break;
  //   case 'md':
  //     initialPaddingBottom = '42px';
  //     break;
  //   case 'sm':
  //   case 'fluid':
  //   default:
  //     initialPaddingBottom = '30px';
  //     break;
  // }

  // const paddingBottom = useTransform(scrollY, [0, 100], [initialPaddingBottom, '12px']);
  // const [currPaddingBottom, setCurrPaddingBottom] = React.useState(''); // used for updating key so animation works

  // useMotionValueEvent(paddingBottom, 'change', latest => {
  //   setCurrPaddingBottom(latest);
  // });

  return (
    <div
      // key={`footer-${currPaddingBottom}`}
      className={styles.base({ className })}
      // style={{ paddingBottom: initialPaddingBottom }}
      {...props}
    >
      <Button look="primary" size="large" className={styles.primaryBtn()} onClick={primaryOnClick}>
        {primaryLabel}
      </Button>
      {secondaryLabel && (
        <Button look="link" size="large" className={styles.secondaryBtn()} onClick={secondaryOnClick}>
          {secondaryLabel}
        </Button>
      )}
    </div>
  );
}
