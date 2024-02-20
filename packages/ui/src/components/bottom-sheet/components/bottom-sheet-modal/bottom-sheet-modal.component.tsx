import { clsx } from 'clsx';
import { PanInfo, motion, useAnimation } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Overlay, useModalOverlay } from 'react-aria';

import { BREAKPOINTS } from '../../../../tailwind/constants/index.js';

import { styles as bottomSheetModalStyles } from './bottom-sheet-modal.styles.js';
import { ModalProps } from './bottom-sheet-modal.types.js';

const isBrowser = typeof window !== 'undefined';

const DISMISS_OFFSET = 45;
const VELOCITY_DISMISS = 45;

function checkIfItIsMobile(breakpoint: number) {
  if (typeof window !== 'undefined') {
    return window.innerWidth <= breakpoint;
  }
}

const MEDIUM_BREAKPOINT_AS_NUMBER = +BREAKPOINTS.md.replace('px', '');

// TODO: discuss about the animation
export function BottomSheetModal({ state, height, width, children, portalContainer, ...props }: ModalProps) {
  const styles = bottomSheetModalStyles({});
  const ref = useRef(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(checkIfItIsMobile(MEDIUM_BREAKPOINT_AS_NUMBER));

  useEffect(() => {
    function handleResize() {
      setIsMobile(checkIfItIsMobile(MEDIUM_BREAKPOINT_AS_NUMBER));
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (state.isOpen) {
      controls.start('visible');
      return;
    }
    controls.start('hidden');
  }, [state.isOpen]);

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const shouldClose =
        info.velocity.y > VELOCITY_DISMISS || (info.velocity.y >= 0 && info.offset.y > DISMISS_OFFSET);
      if (shouldClose) {
        controls.start('hidden');
        state.close();
        return;
      }
      controls.start('visible');
      state.open();
    },
    [controls],
  );

  if (!isBrowser || !state.isOpen) {
    return null;
  }

  return (
    <Overlay portalContainer={portalContainer}>
      <div className={styles.underlay()} {...underlayProps}>
        <motion.div
          animate={controls}
          dragElastic={0}
          initial="hidden"
          onDragEnd={onDragEnd}
          transition={{
            type: 'spring',
            damping: 40,
            stiffness: 400,
          }}
          dragConstraints={{
            top: 0,
          }}
          drag={isMobile && 'y'}
          variants={{
            visible: { y: 0 },
            hidden: { y: '100%' },
          }}
          className={styles.motionWrapper()}
        >
          <div className={styles.modal()} {...modalProps} ref={ref} style={{ height, width }}>
            {children}
          </div>
        </motion.div>
      </div>
    </Overlay>
  );
}
