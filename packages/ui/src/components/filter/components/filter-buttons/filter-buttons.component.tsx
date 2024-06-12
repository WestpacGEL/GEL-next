'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '../../../icon/index.js';
import { Button } from '../../../index.js';
import { generateAriaDescription } from '../../filter.util.js';

import { styles } from './filter-buttons.styles.js';
import { type FilterButtonsProps } from './filter-buttons.types.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function FilterButtons(
  this: any,
  { filterButtons, onClick, selectedButton, resultsFound, tag: Tag = 'div', className, ...props }: FilterButtonsProps,
) {
  const scrollContainerRef = useRef<any>();
  const [isScrollable, setIsScrollable] = useState({ left: false, right: false });
  const [isHovered, setIsHovered] = useState(false);

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

  const handleHover = (hoverState: boolean | ((prevState: boolean) => boolean)) => {
    setIsHovered(hoverState);
  };

  const handleScrollButton = (direction: string) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      if (direction === 'left') {
        sideScroll(scrollContainerRef.current, 1, scrollAmount, -3);
      } else {
        sideScroll(scrollContainerRef.current, 1, scrollAmount, 3);
      }
    }
  };

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const isLeftScrollable = scrollContainerRef.current.scrollLeft >= 1;
      const isRightScrollable =
        scrollContainerRef.current.scrollLeft + 1 <
        scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      setIsScrollable({ left: isLeftScrollable, right: isRightScrollable });
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    container.addEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const isLeftScrollable = container.scrollLeft >= 1;
      const isRightScrollable = container.scrollLeft < container.scrollWidth - container.clientWidth;
      setIsScrollable({ left: isLeftScrollable, right: isRightScrollable });
    }
  }, []);

  return (
    <Tag style={{ position: 'relative', alignItems: 'top', justifyContent: 'top', display: 'flex' }}>
      {isScrollable.left && (
        <Button
          style={{
            position: 'absolute',
            left: '0',
            resize: 'none',
            height: '40px',
            minWidth: '30px',
            border: 'none',
            borderRadius: '0',
            transition: 'background-color 0.3s',
            background: 'linear-gradient(to left, transparent, white, white)',
            borderLeft: 'white',
          }}
          onClick={() => handleScrollButton('left')}
          disabled={!isScrollable.left}
        >
          <ArrowLeftIcon
            style={{
              color: '#2A2E42',
              float: 'left',
              position: 'absolute',
              left: '-5',
              transform: 'translateY(-50%)',
            }}
          />
        </Button>
      )}

      {isScrollable.right && (
        <Button
          style={{
            position: 'absolute',
            right: '0',
            resize: 'none',
            height: '40px',
            minWidth: '30px',
            border: 'none',
            borderRadius: '0',
            transition: 'background-color 0.3s',
            background: 'linear-gradient(to right, transparent, white, white)',
            borderLeft: 'white',
          }}
          onClick={() => handleScrollButton('right')}
          disabled={!isScrollable.right}
        >
          <ArrowRightIcon
            style={{
              color: '#2A2E42',
              float: 'right',
              position: 'absolute',
              right: '-5',
              transform: 'translateY(-50%)',
            }}
          />
        </Button>
      )}

      <div
        className={styles({ className })}
        {...props}
        ref={scrollContainerRef}
        style={{ overflowX: isHovered ? 'auto' : 'hidden', resize: 'none', scrollbarWidth: 'thin', padding: '5px' }}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        {filterButtons.map(button => (
          <Button
            aria-pressed={button.id === selectedButton}
            aria-description={generateAriaDescription(button.id, selectedButton, filterButtons.length, resultsFound)}
            aria-label={button.text}
            look="hero"
            size="small"
            onClick={() => onClick(button.id)}
            style={{ scrollbarGutter: 'stable' }}
            key={button.id}
            soft={button.id !== selectedButton}
          >
            {button.text}
          </Button>
        ))}
      </div>
    </Tag>
  );
}
