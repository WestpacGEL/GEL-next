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
  const scrollElementRefs = useRef<any>(new Array(filterButtons.length));
  const [scrollTarget, setScrollTarget] = useState({ left: -1, right: -1 });

  const setScroll = (scrollBy: boolean, scroll: number, container: any) => {
    if (scrollBy) {
      container.scrollBy({
        left: scroll,
        behavior: 'smooth',
      });
    } else {
      container.scrollTo({
        left: scroll,
        behavior: 'smooth',
      });
    }
  };

  /* eslint-disable sonarjs/cognitive-complexity */
  const handleScrollButton = (direction: string) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;

      let targetElement;
      let scrollX;
      let scrollBy = true;
      if (direction === 'left') {
        if (scrollTarget.left == -1) {
          scrollX = -container.clientWidth;
        } else {
          scrollBy = false;
          targetElement = scrollElementRefs.current[scrollTarget.left];
          scrollX = targetElement.offsetLeft + targetElement.offsetWidth - container.offsetWidth + 20;
        }
      } else {
        if (scrollTarget.right == -1) {
          scrollX = container.clientWidth;
        } else {
          scrollBy = false;
          targetElement = scrollElementRefs.current[scrollTarget.right];
          scrollX = targetElement.offsetLeft - 20;
        }
      }
      setScroll(scrollBy, scrollX, container);
    }
  };

  /* eslint-disable sonarjs/cognitive-complexity */
  const handleScrollTarget = (container: any) => {
    let targetRight = scrollTarget.right;
    let targetLeft = scrollTarget.left;
    const cLeft = container.scrollLeft;
    const cRight = cLeft + container.clientWidth;
    scrollElementRefs.current.forEach((element: any, index: number) => {
      const eLeft = element.offsetLeft;
      const eRight = eLeft + element.clientWidth;
      if (eLeft <= cLeft && eRight >= cLeft) {
        targetLeft = index;
      }
      if (eRight >= cRight && eLeft <= cRight) {
        targetRight = index;
      }
      if ((eRight >= cRight && eLeft <= cLeft) || targetRight == targetLeft + 1) {
        if (targetRight >= filterButtons.length - 1) {
          targetRight = -1;
        } else {
          targetRight = targetRight + 1;
        }
        if (targetLeft <= 0) {
          targetLeft = -1;
        } else {
          targetLeft = targetLeft - 1;
        }
      }
      if (targetLeft == filterButtons.length - 1) {
        targetLeft -= 1;
      }
    });
    setScrollTarget({ left: targetLeft, right: targetRight });
  };

  const handleScrollable = (container: any) => {
    const isLeftScrollable = container.scrollLeft >= 1;
    const isRightScrollable = container.scrollLeft < container.scrollWidth - container.clientWidth - 1;
    setIsScrollable({ left: isLeftScrollable, right: isRightScrollable });
  };

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      handleScrollTarget(container);
      handleScrollable(container);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    handleScrollTarget(container);
    handleScrollable(container);
  }, [handleScroll]);

  return (
    <Tag className={styles.slots.container}>
      <Button
        style={{
          // left: '0',
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
          // right: '0',
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
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          overflowX: 'scroll',
          // WebkitOverflowScrolling: 'touch',
        }}
        {...props}
        ref={scrollContainerRef}
      >
        {filterButtons.map((button, index) => (
          <Button
            className={className}
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
