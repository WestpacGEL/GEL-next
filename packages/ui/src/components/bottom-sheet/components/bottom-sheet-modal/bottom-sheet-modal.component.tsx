import { clsx } from 'clsx';
import { PanInfo, motion, useAnimation } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Overlay, useModalOverlay } from 'react-aria';

import { BREAKPOINTS } from '../../../../tailwind/constants/index.js';

import { ModalProps, Sizes } from './bottom-sheet-modal.types.js';

const isBrowser = typeof window !== 'undefined';

const DISMISS_OFFSET = 45;
const VELOCITY_DISMISS = 45;

function checkIfItIsMobile(breakpoint: number) {
  if (typeof window !== 'undefined') {
    return window.innerWidth <= breakpoint;
  }
}

const SIZES: Record<Sizes, string> = {
  xs: 'md:w-[20rem]',
  sm: 'md:w-[32.25rem]',
  md: 'md:w-[44.5rem]',
  lg: 'md:w-[56.75rem]',
  xl: 'md:w-[79rem]',
  full: 'md:h-full md:w-full',
};

const MEDIUM_BREAKPOINT_AS_NUMBER = +BREAKPOINTS.md.replace('px', '');

// TODO: discuss about the animation
export function BottomSheetModal({
  state,
  height,
  width,
  children,
  size = 'md',
  portalContainer,
  ...props
}: ModalProps) {
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
      <div
        className="fixed inset-0 z-10 flex animate-fadeIn flex-col justify-end bg-black/50 transition-all md:items-center md:justify-center"
        {...underlayProps}
      >
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
          className={clsx('flex flex-col', SIZES[size])}
        >
          <div className="flex w-full flex-col" {...modalProps} ref={ref} style={{ height, width }}>
            {children}
          </div>
        </motion.div>
      </div>
    </Overlay>
  );
}
