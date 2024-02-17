'use client';

import { Button, ProgressRope } from '@westpac/ui';
import { CloseIcon, MoreVertIcon } from '@westpac/ui/icon';
import { BREAKPOINTS } from '@westpac/ui/themes-constants';
import { clsx } from 'clsx';
import throttle from 'lodash.throttle';
import { usePathname } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useLayoutEffect, useState } from 'react';

import { useSidebar } from './context';

export function Sidebar({ children }: { children?: ReactNode }) {
  const { open, setOpen, ropeData, ropeStep } = useSidebar();
  const [scrolled, setScrolled] = useState(false);
  const [sidebarScrolled, setSidebarScrolled] = useState(false);
  const [totalSteps, setTotalSteps] = useState(0);
  const [sidebarContent, setSidebarContent] = useState<HTMLElement | null>(null);

  const handleScroll = throttle(() => {
    let hasScrolled = false;
    if (window.scrollY > 5) {
      hasScrolled = true;
    }
    setScrolled(hasScrolled);
  }, 10);

  const handleSidebarScroll = throttle(() => {
    let hasScrolled = false;
    if (sidebarContent && sidebarContent.scrollTop > 5) {
      hasScrolled = true;
    }
    setSidebarScrolled(hasScrolled);
  }, 10);

  const pathName = usePathname();
  const isDashboard = pathName === '/';
  const currStep = ropeStep + 1;

  useLayoutEffect(() => {
    setSidebarContent(document.getElementById('sidebar-content'));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    sidebarContent?.addEventListener('scroll', handleSidebarScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sidebarContent?.removeEventListener('scroll', handleSidebarScroll);
    };
  }, [handleScroll, handleSidebarScroll, sidebarContent]);

  const updateOpen = useCallback(() => {
    setOpen(window.innerWidth >= parseInt(BREAKPOINTS.md));
  }, [setOpen]);

  useEffect(() => {
    if (ropeData) setOpen(true);
    updateOpen();

    window.addEventListener('resize', updateOpen);
    return () => window.removeEventListener('resize', updateOpen);
  }, [ropeData, setOpen, updateOpen]);

  useEffect(() => {
    const ropeType = ropeData && ropeData[0].type;
    let stepCount = 0;
    ropeData &&
      ropeData.forEach(rope => {
        if ('steps' in rope) {
          stepCount += rope.steps.length;
        } else if (ropeType === 'group') {
          stepCount += 1;
        } else {
          stepCount += ropeData.length;
        }
      });
    setTotalSteps(stepCount);
  }, [ropeData]);

  return (
    !isDashboard && (
      <>
        <div
          className={clsx(
            'sticky top-0 z-10 flex h-9 justify-between bg-white px-2 py-3 after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:z-10 after:block after:h-1 after:bg-gradient-to-b after:from-black/[.2] after:from-0% after:opacity-0 after:transition-all after:duration-200 after:will-change-[opacity] xsl:px-4 sm:px-5 md:hidden',
            { 'after:opacity-100': scrolled },
          )}
        >
          <p className="typography-body-10 font-medium">{`Step ${currStep} of ${totalSteps}`}</p>
          {!open && (
            <Button
              look="link"
              iconAfter={MoreVertIcon}
              className="typography-body-10 no-underline"
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
                'fixed inset-y-0 left-auto right-0 w-[300px] overflow-auto border-l-[1px] border-l-border bg-white transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] after:pointer-events-none after:fixed after:left-[calc(100%-300px)] after:right-0 after:top-[66px] after:z-10 after:block after:h-1 after:bg-gradient-to-b after:from-black/[.2] after:from-0% after:opacity-0 after:transition-all after:duration-200 after:will-change-[opacity] max-md:z-[100] md:mt-11',
                {
                  'after:opacity-100': sidebarScrolled,
                  'translate-x-full': !open,
                },
              )}
              id="sidebar-content"
            >
              <div
                className={clsx({
                  'max-md:hidden': !open,
                })}
              >
                <div className="flex flex-row justify-between px-2 py-2.5 md:hidden">
                  <p className="typography-body-10 py-[5px] font-medium">{`Step ${currStep} of ${totalSteps}`}</p>
                  <Button
                    look="link"
                    iconBefore={CloseIcon}
                    size="large"
                    className="p-0"
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
