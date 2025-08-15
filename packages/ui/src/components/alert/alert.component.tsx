'use client';

import { AnimatePresence, LazyMotion, m } from 'motion/react';
import React, { useCallback, useEffect, useState, useMemo } from 'react';

import { Button } from '../button/button.component.js';
import { AlertIcon, CloseIcon, InfoIcon, LimitIcon, SuccessIcon, WarningIcon } from '../icon/index.js';

import { styles as alertStyles } from './alert.styles.js';
import { type AlertProps, type Look } from './alert.types.js';

const loadAnimations = () => import('./alert.utils.js').then(res => res.default);

export function Alert({
  look = 'info',
  mode = 'box',
  heading,
  headingTag: HeadingTag = 'h2',
  dismissible = false,
  open: isOpen = true,
  onClose,
  icon,
  iconSize,
  tag: Tag = 'div',
  className,
  children,
  ...props
}: AlertProps) {
  const [open, setOpen] = useState(isOpen);

  const iconMap: Record<Look, React.ElementType> = {
    info: InfoIcon,
    success: SuccessIcon,
    warning: WarningIcon,
    danger: AlertIcon,
    system: LimitIcon,
  };

  // A11y: Only info look allows a custom icon
  const Icon = look === 'info' && icon ? icon : iconMap[look];

  const styles = alertStyles({ look, mode, dismissible, iconSize });

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [onClose]);

  const iconColor = useMemo(() => {
    if (look === 'system') {
      return 'system-error-dark';
    }
    return look;
  }, [look]);

  return (
    <LazyMotion features={loadAnimations}>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            key="alert"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Tag className={styles.base({ className })} {...props}>
              <span className={styles.icon({ hasSize: iconSize ? true : false })}>
                <Icon
                  size={iconSize ? iconSize : { initial: 'small', xsl: 'medium' }}
                  look="outlined"
                  color={iconColor}
                />
              </span>
              <div className={styles.body()}>
                {!!heading && <HeadingTag className={styles.heading()}>{heading}</HeadingTag>}
                {children}
              </div>
              {dismissible && mode !== 'text' && (
                <Button
                  look="unstyled"
                  type="button"
                  className={styles.close()}
                  onClick={handleClose}
                  aria-label="Close alert"
                >
                  <CloseIcon size="small" color={iconColor} />
                </Button>
              )}
            </Tag>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
