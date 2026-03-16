import { clsx } from 'clsx';
import { AnimatePresence, LazyMotion, m } from 'motion/react';
import { useLayoutEffect, useRef } from 'react';
import { DismissButton, Overlay, useOverlayPosition } from 'react-aria';

import { PopoverProps } from './popover.types';

const loadAnimations = () => import('./popover.utils').then(res => res.default);

export function Popover(props: PopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const {
    popoverRef = ref,
    state,
    children,
    className,
    isNonModal,
    portalContainer,
    triggerRef,
    placement,
    offset,
    shouldFlip,
    containerPadding,
  } = props;

  const positionProps = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef: popoverRef,
    placement,
    offset,
    shouldFlip,
    containerPadding,
    isOpen: state.isOpen,
  });

  // Force position recalculation after content renders
  useLayoutEffect(() => {
    if (state.isOpen) {
      requestAnimationFrame(() => {
        positionProps.updatePosition();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isOpen]);

  return (
    <Overlay portalContainer={portalContainer}>
      {!isNonModal && <div className="fixed inset-0" />}
      <div
        {...positionProps.overlayProps}
        ref={popoverRef}
        className={clsx(`z-10 bg-background-white shadow-lg`, className)}
      >
        {!isNonModal && <DismissButton onDismiss={() => state.close()} />}
        <LazyMotion features={loadAnimations}>
          <AnimatePresence initial mode="wait">
            {state.isOpen && (
              <m.div
                className="overflow-hidden border border-border-muted-soft"
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: 'auto',
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {children}
              </m.div>
            )}
          </AnimatePresence>
        </LazyMotion>
        <DismissButton onDismiss={() => state.close()} />
      </div>
    </Overlay>
  );
}
