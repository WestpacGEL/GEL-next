/* eslint-disable sonarjs/function-return-type */
'use client';
import { BREAKPOINTS } from '@westpac/style-config/constants';
import { Button, ProgressRope } from '@westpac/ui';
import { CloseIcon, MoreVertIcon } from '@westpac/ui/icon';
import { clsx } from 'clsx';
import throttle from 'lodash.throttle';
import { usePathname } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useSidebar } from './context';

export function Sidebar({ children }: { children?: ReactNode }) {
  const { open, setOpen, ropeData, ropeStep, sidebarScrolled, setSidebarScrolled } = useSidebar();
  const [scrolled, setScrolled] = useState(false);
  const [isMaxWidth, setIsMaxWidth] = useState(true);
  const sidebarContent = useRef<HTMLDivElement>(null);

  const handleScroll = throttle(() => {
    let hasScrolled = false;
    if (window.scrollY > 5) {
      hasScrolled = true;
    }
    setScrolled(hasScrolled);
  }, 10);

  const handleSidebarScroll = throttle(() => {
    let hasScrolled = false;
    if (sidebarContent.current && sidebarContent.current.scrollTop > 5) {
      hasScrolled = true;
    }
    setSidebarScrolled(hasScrolled);
  }, 10);

  const pathName = usePathname();
  const isDashboard = pathName === '/';
  const currStep = ropeStep + 1;

  useEffect(() => {
    const content = sidebarContent.current;
    window.addEventListener('scroll', handleScroll);
    content?.addEventListener('scroll', handleSidebarScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      content?.removeEventListener('scroll', handleSidebarScroll);
    };
  }, [handleScroll, handleSidebarScroll, sidebarContent]);

  const updateOpen = useCallback(() => {
    setIsMaxWidth(window.innerWidth >= 1920);
    setOpen(window.innerWidth >= parseInt(BREAKPOINTS.md));
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

  return (
    !isDashboard && (
      <>
        <div
          className={clsx(
            'xsl:px-4 sticky top-0 z-10 flex h-9 items-center justify-between bg-white px-2  py-3 after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:z-10 after:block after:h-1 after:bg-gradient-to-b after:from-black/[.2] after:from-0% after:opacity-0 after:transition-all after:duration-200 after:will-change-[opacity] sm:px-5 md:hidden',
            { 'after:opacity-100': scrolled },
          )}
        >
          <p className="typography-body-10 font-medium">{`Step ${currStep} of ${totalSteps}`}</p>
          {!open && (
            <Button
              look="link"
              iconAfter={MoreVertIcon}
              className="typography-body-10 px-0 no-underline"
              onClick={() => setOpen(true)}
            >
              Show all steps
            </Button>
          )}
        </div>

        <>
          <>
            <div
              className={clsx(
                'border-border fixed inset-y-0 w-[300px] overflow-auto overscroll-contain border-l bg-white transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] max-md:z-[100] md:mt-11',
                {
                  'max-md:translate-x-full': !open,
                  'ml-[1620px]': isMaxWidth,
                  'md:right-[2px] right-0': !isMaxWidth,
                },
              )}
              id="sidebar-content"
              ref={sidebarContent}
            >
              <div
                className={clsx({
                  'max-md:hidden': !open,
                })}
              >
                <div
                  className={clsx(
                    'sticky top-0 z-[100] flex h-[54px] flex-row justify-between justify-items-center bg-white px-2 py-2.5 after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:z-10 after:block after:h-1 after:bg-gradient-to-b after:from-black/[.2] after:from-0% after:opacity-0 after:transition-all after:duration-200 after:will-change-[opacity] md:hidden',
                    { 'after:opacity-100': sidebarScrolled },
                  )}
                >
                  <p className="typography-body-10 py-[5px] font-medium">{`Step ${currStep} of ${totalSteps}`}</p>
                  <Button
                    look="link"
                    iconBefore={() => <CloseIcon className="p-0" />}
                    size="large"
                    className="h-auto p-0"
                    onClick={() => setOpen(false)}
                  />
                </div>
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
          <div
            aria-hidden="true"
            className={clsx({
              'h-auto md:hidden max-md:before:bg-black/70 before:z-[59] before:top-0 before:left-0 before:right-0 before:bottom-0 before:fixed':
                open,
            })}
          />
        </>
      </>
    )
  );
}
