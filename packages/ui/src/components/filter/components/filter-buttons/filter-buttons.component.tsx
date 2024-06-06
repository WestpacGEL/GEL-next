'use client';

import React, { useEffect, useRef, useState } from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '../../../icon/index.js';
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
  const [isScrollable, setIsScrollable] = useState({ left: false, right: false });

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const isLeftScrollable = container.scrollLeft >= 1;
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
      const scrollAmount = scrollContainerRef.current.clientWidth;
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
      }, 850);
    }
  };

  return (
    <div style={{ position: 'relative', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
      {isScrollable.left && (
        <Button
          style={{
            position: 'absolute',
            left: '0',
            minHeight: '24',
            alignItems: 'center',
            height: '100%',
            background: 'linear-gradient(to left, transparent, white, white)',
            border: 'none',
            borderRadius: '0',
          }}
          onClick={() => handleScroll('left')}
          disabled={!isScrollable.left}
        >
          <ArrowLeftIcon style={{ color: '#2A2E42' }} />
        </Button>
      )}

      {isScrollable.right && (
        <Button
          style={{
            position: 'absolute',
            right: '0',
            minHeight: '24',
            alignItems: 'center',
            height: '100%',
            background: 'linear-gradient(to right, transparent, white, white)',
            border: 'none',
            borderRadius: '0',
          }}
          onClick={() => handleScroll('right')}
          disabled={!isScrollable.right}
        >
          <ArrowRightIcon style={{ color: '#2A2E42' }} />
        </Button>
      )}

      <div
        className={styles({ className })}
        {...props}
        ref={scrollContainerRef}
        style={{ overflowX: 'auto', padding: '100' }}
      >
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
