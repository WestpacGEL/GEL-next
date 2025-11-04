import { clsx } from 'clsx';
import { AnimatePresence, LazyMotion, m } from 'motion/react';
import { useRef } from 'react';
import { DismissButton, Overlay, usePopover } from 'react-aria';

import { PopoverProps } from './popover.types';

const loadAnimations = () => import('./popover.utils').then(res => res.default);

export function Popover(props: PopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { popoverRef = ref, state, children, className, isNonModal, portalContainer } = props;
  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef,
    },
    state,
  );

  return (
    <Overlay portalContainer={portalContainer}>
      {!isNonModal && <div {...underlayProps} className="fixed inset-0" />}
      <div {...popoverProps} ref={popoverRef} className={clsx(`z-10 bg-background-white-pale shadow-lg`, className)}>
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
