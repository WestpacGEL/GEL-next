'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Button } from '../../../index.js';
import { generateAriaDescription } from '../../filter.util.js';

import { styles } from './filter-buttons.styles.js';
import { type FilterButtonsProps } from './filter-buttons.types.js';

export function FilterButtons({
  filterButtons,
  onClick,
  selectedButton,
  resultsFound,
  tag: Tag = 'div',
  className,
  ...props
}: FilterButtonsProps) {
  const scrollContainerRef = useRef<any>();
  const [isScrollable, setIsScrollable] = useState({ left: false, right: true });

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const isLeftScrollable = container.scrollLeft >= 0;
      const isRightScrollable = container.scrollLeft < container.scrollWidth - container.clientWidth;
      setIsScrollable({ left: isLeftScrollable, right: isRightScrollable });
    }
  }, [scrollContainerRef]);

  const sideScroll = (element: HTMLDivElement, speed: number, distance: number, step: number) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };

  const handleScroll = async (direction: string) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 1;
      if (direction === 'left') {
        sideScroll(scrollContainerRef.current, 5, 200, -1);
      } else {
        sideScroll(scrollContainerRef.current, 5, 200, 1.5);
      }
      // TODO: update to dynamically check for scroll via useEffect
      const timer = setTimeout(() => {
        const isLeftScrollable = scrollContainerRef.current.scrollLeft > 0;
        const isRightScrollable =
          scrollContainerRef.current.scrollLeft <
          scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
        setIsScrollable({ left: isLeftScrollable, right: isRightScrollable });
      }, 800);
    }
  };

  return (
    <div style={{ position: 'relative' }}>

      {isScrollable.left && (
        <Button
          style={{ position: 'absolute', left: '0', }}
          onClick={() => handleScroll('left')}
          disabled={!isScrollable.left}>
          &lt;
        </Button>
      )}

      {isScrollable.right && (
        <Button
          style={{ position: 'absolute', right: '0', }}
          onClick={() => handleScroll('right')}
          disabled={!isScrollable.right}>
          &gt;
        </Button>
      )}

      <div className={styles({ className })} {...props} ref={scrollContainerRef} style={{ overflowX: 'auto' }}>

        {filterButtons.map(button => (
          <Button
            aria-pressed={button.id === selectedButton}
            aria-description={generateAriaDescription(button.id, selectedButton, filterButtons.length, resultsFound)}
            aria-label={button.text}
            look="hero"
            size="small"
            onClick={() => onClick(button.id)}
            key={button.id}
            soft={button.id !== selectedButton}
          >
            {button.text}
          </Button>
        ))}

      </div>

    </div>
  );
}
