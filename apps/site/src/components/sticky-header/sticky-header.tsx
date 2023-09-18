'use client';

import { clsx } from 'clsx';
import throttle from 'lodash.throttle';
import { useEffect, useRef, useState } from 'react';

export function StickyHeader() {
  const ref = useRef();
  const [stuck, setStuck] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const cachedRef = ref.current;
    const observer = new IntersectionObserver(([e]) => setStuck(e.intersectionRatio < 1), {
      rootMargin: '-1px 0px 0px 0px',
      threshold: [1],
    });
    observer.observe(cachedRef);
    return () => observer.unobserve(cachedRef);
  }, [ref]);

  useEffect(() => {
    const handleScroll = throttle(() => {
      let hasScrolled = false;
      if (window.scrollY > 1) {
        hasScrolled = true;
      }
      setScrolled(hasScrolled);
    }, 10);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        'sticky top-0 z-[1] transition-shadow delay-0 duration-200 ease-[ease]',
        stuck && scrolled && 'shadow-[0_8px_8px_rgba(0,0,0,0.24)]',
      )}
    />
  );
}
