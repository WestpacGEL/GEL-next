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
  const scrollElementRefs = useRef<any>(new Array(filterButtons.length));
  const [scrollTarget, setScrollTarget] = useState({ left: 0, right: 4 });

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

  // const handleScrollButton = (direction: string) => {
  //   if (scrollContainerRef.current) {
  //     const container = scrollContainerRef.current;
  //     const scrollAmount = container.offsetWidth;
  //     if (direction === 'left') {
  //       scrollElementRefs.current[scrollTarget.left].scrollIntoView({
  //         behavior: 'smooth',
  //         inline: 'end',
  //         block: 'nearest',
  //       });
  //     } else {
  //       scrollElementRefs.current[scrollTarget.right].scrollIntoView({
  //         behavior: 'smooth',
  //         inline: 'start',
  //         block: 'nearest',
  //       });
  //     }
  //   }
  // };

  const handleScrollButton = (direction: string) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.offsetWidth;

      let scrollTargetIndex;
      if (direction === 'left') {
        scrollTargetIndex = scrollTarget.left;
      } else {
        scrollTargetIndex = scrollTarget.right;
      }

      const targetElement = scrollElementRefs.current[scrollTargetIndex];
      const targetRect = targetElement.getBoundingClientRect();

      let scrollX;
      if (direction === 'left') {
        scrollX = container.scrollLeft + (targetRect.right - container.clientWidth - 30);
      } else {
        scrollX = container.scrollLeft + targetRect.left - 60;
      }

      container.scrollTo({
        left: scrollX,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const isLeftScrollable = container.scrollLeft >= 1;
      const isRightScrollable = container.scrollLeft < container.scrollWidth - container.clientWidth - 1;
      setIsScrollable({ left: isLeftScrollable, right: isRightScrollable });
    }
  }, [handleScrollButton]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    let targetRight = scrollTarget.right;
    let targetLeft = scrollTarget.left;
    const cLeft = container.scrollLeft;
    const cRight = cLeft + container.clientWidth;
    scrollElementRefs.current.forEach((element: any, index: number) => {
      const eLeft = element.offsetLeft;
      const eRight = eLeft + element.clientWidth;
      if (eLeft < cLeft && eRight > cLeft) {
        targetLeft = index;
      }
      if (eRight > cRight && eLeft < cRight) {
        targetRight = index;
      }
    });
    setScrollTarget({ left: targetLeft, right: targetRight });
  }, [handleScrollButton]);

  return (
    <Tag className={styles.slots.container}>
      <Button
        style={{
          left: '0',
          background: 'linear-gradient(to left, transparent, white, white)',
          visibility: !isScrollable.left ? 'hidden' : 'visible',
        }}
        className={styles.slots.scrollButton}
        onClick={() => handleScrollButton('left')}
        disabled={!isScrollable.left}
      >
        <ArrowLeftIcon className={styles.slots.arrowIconLeft} />
      </Button>

      <Button
        style={{
          right: '0',
          background: 'linear-gradient(to right, transparent, white, white)',
          visibility: !isScrollable.right ? 'hidden' : 'visible',
        }}
        className={styles.slots.scrollButton}
        onClick={() => handleScrollButton('right')}
        disabled={!isScrollable.right}
      >
        <ArrowRightIcon className={styles.slots.arrowIconRight} />
      </Button>

      <div
        className={styles.base}
        {...props}
        ref={scrollContainerRef}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        {filterButtons.map((button, index) => (
          <Button
            className={styles.slots.filterButton}
            aria-pressed={button.id === selectedButton}
            aria-description={generateAriaDescription(button.id, selectedButton, filterButtons.length, resultsFound)}
            aria-label={button.text}
            look="hero"
            size="small"
            onClick={() => onClick(button.id)}
            key={button.id}
            soft={button.id !== selectedButton}
            button-index={index}
            ref={element => (scrollElementRefs.current[index] = element)}
          >
            {button.text}
          </Button>
        ))}
      </div>
    </Tag>
  );
}
