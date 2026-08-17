/* eslint-disable sonarjs/function-return-type */
'use client';
import { BREAKPOINTS } from '@westpac/style-config/constants';
import { Button, Flyout, ProgressRope } from '@westpac/ui';
import { MoreVertIcon } from '@westpac/ui/icon';
import { clsx } from 'clsx';
import throttle from 'lodash.throttle';
import { usePathname } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { useSidebar } from './context';

export function Sidebar({ children }: { children?: ReactNode }) {
  const { open, setOpen, ropeData, ropeStep } = useSidebar();
  const [scrolled, setScrolled] = useState(false);
  const [isSmallBreakpoint, setIsSmallBreakpoint] = useState(false);
  const [isMaxWidth, setIsMaxWidth] = useState(true);

  const handleScroll = throttle(() => {
    let hasScrolled = false;
    if (window.scrollY > 5) {
      hasScrolled = true;
    }
    setScrolled(hasScrolled);
  }, 10);

  const pathName = usePathname();
  const isDashboard = pathName === '/';
  const currStep = ropeStep + 1;

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const updateOpen = useCallback(() => {
    const isSmall = window.innerWidth < parseInt(BREAKPOINTS.md);
    setIsSmallBreakpoint(isSmall);
    setIsMaxWidth(window.innerWidth >= 1920);
    setOpen(!isSmall);
  }, [setOpen]);

  useEffect(() => {
    if (ropeData) setOpen(true);
    setIsMaxWidth(window.innerWidth >= 1920);
    updateOpen();

    window.addEventListener('resize', updateOpen);
    return () => window.removeEventListener('resize', updateOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalSteps = useMemo(() => {
    const ropeType = ropeData && ropeData[0].type;
    let stepCount = 0;
    if (ropeData) {
      ropeData.forEach(rope => {
        if ('steps' in rope) {
          stepCount += rope.steps.length;
        } else if (ropeType === 'group') {
          stepCount += 1;
        } else {
          stepCount++;
        }
      });
    }
    return stepCount;
  }, [ropeData]);

  const flyoutState = useMemo(
    () => ({
      isOpen: open && isSmallBreakpoint,
      setOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      toggle: () => setOpen(!open),
    }),
    [isSmallBreakpoint, open, setOpen],
  );

  return (
    !isDashboard && (
      <>
        <div
          className={clsx(
            'sticky top-0 z-10 -mb-9 flex h-9 items-center justify-between bg-surface-mono px-2 py-3 after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:z-10 after:block after:h-1 after:bg-gradient-to-b after:from-black/[.2] after:from-0% after:opacity-0 after:transition-all after:duration-200 after:will-change-[opacity] xsl:px-4 sm:px-5 md:hidden',
            { 'after:opacity-100': scrolled },
          )}
        >
          <p className="typography-body-10 font-medium">{`Step ${currStep} of ${totalSteps}`}</p>
          {!open && (
            <Button
              look="link"
              iconAfter={MoreVertIcon}
              className="px-0 typography-body-10 no-underline"
              onClick={() => setOpen(true)}
            >
              Show all steps
            </Button>
          )}
        </div>

        <Flyout
          backdropClassName="md:hidden"
          className="w-[300px] md:hidden"
          closeAssistiveText="Close all steps"
          heading={`Step ${currStep} of ${totalSteps}`}
          state={flyoutState}
        >
          <div className="py-10">
            {ropeData && <ProgressRope className="pl-5" current={ropeStep} data={ropeData} />}
            {children}
          </div>
        </Flyout>

        <div
          className={clsx(
            'fixed inset-y-0 mt-11 hidden w-[300px] overflow-auto overscroll-contain border-l border-border-muted-soft bg-white md:block',
            {
              'ml-[1620px]': isMaxWidth,
              'right-[2px]': !isMaxWidth,
            },
          )}
          id="sidebar-content"
        >
          <div>
            {/* Return to dashboard button hidden by request, keeping code here for future implementation */}
            {/* <Button
              iconBefore={props => <HouseIcon {...props} size="medium" look="outlined" />}
              look="link"
              className="pb-5 pl-4 pr-0 pt-10 font-normal no-underline"
            >
              Return to dashboard
            </Button> */}
            <div className="py-10">
              {ropeData && <ProgressRope className="pl-5" current={ropeStep} data={ropeData} />}
              {children}
            </div>
          </div>
        </div>
      </>
    )
  );
}
