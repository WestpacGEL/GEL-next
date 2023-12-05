'use client';

import throttle from 'lodash.throttle';
import { useEffect, useRef, useState } from 'react';

import { styles } from './sticky-header.styles';

export function StickyHeader({
  stickyPosition = 0,
  className,
  children,
  shadow = 'thick',
}: {
  children: React.ReactNode;
  className?: string;
  shadow?: 'thick' | 'thin';
  stickyPosition?: number;
}) {
  const ref = useRef(null);
  const [stuck, setStuck] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const cachedRef = ref.current;

    if (!cachedRef) return;

    const observer = new IntersectionObserver(([e]) => setStuck(e.intersectionRatio < 1), {
      rootMargin: `-${stickyPosition + 1}px 0px 0px 0px`,
      threshold: [1],
    });
    observer.observe(cachedRef);
    return () => observer.unobserve(cachedRef);
  }, [ref, stickyPosition]);

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
    <div ref={ref} className={styles({ shadow: stuck && scrolled ? shadow : 'none', className })}>
      {children}
    </div>
  );
}
