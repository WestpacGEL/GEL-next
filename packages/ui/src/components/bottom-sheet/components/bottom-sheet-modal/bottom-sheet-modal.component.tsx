import { BREAKPOINTS } from '@westpac/style-config/constants';
import { PanInfo, motion, useAnimation } from 'motion/react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Overlay, useModalOverlay } from 'react-aria';

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
export function BottomSheetModal({
  zIndex = 10,
  state,
  height,
  width,
  children,
  portalContainer,
  ...props
}: ModalProps) {
  const styles = bottomSheetModalStyles({});
  const ref = useRef(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(checkIfItIsMobile(MEDIUM_BREAKPOINT_AS_NUMBER));

  // This is required so branding applies correctly by default due to portal location, can be overridden with portalContainer prop
  const brandContainer = useMemo(() => {
    if (isBrowser) {
      return (
        document.querySelector('[data-theme]') ||
        document.querySelector('[class^="theme-"], [class*=" theme-"]') ||
        document.body
      );
    }
  }, []);

  useEffect(() => {
    function handleResize() {
      setIsMobile(checkIfItIsMobile(MEDIUM_BREAKPOINT_AS_NUMBER));
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (state.isOpen) {
      void controls.start('visible');
      return;
    }
    void controls.start('hidden');
  }, [controls, state.isOpen]);

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const shouldClose =
        info.velocity.y > VELOCITY_DISMISS || (info.velocity.y >= 0 && info.offset.y > DISMISS_OFFSET);
      if (shouldClose) {
        void controls.start('hidden');
        state.close();
        return;
      }
      void controls.start('visible');
      state.open();
    },
    [controls, state],
  );

  if (!isBrowser || !state.isOpen) {
    return null;
  }

  return (
    <Overlay portalContainer={portalContainer || brandContainer}>
      <div className={styles.underlay()} style={{ zIndex }} {...underlayProps}>
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
