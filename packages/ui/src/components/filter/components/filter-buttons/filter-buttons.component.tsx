'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '../../../icon/index.js';
import { Button } from '../../../index.js';

import { styles as filterButtonsStyles } from './filter-buttons.styles.js';
import { type FilterButtonsProps } from './filter-buttons.types.js';

export function FilterButtons({
  filterButtons,
  onClick,
  selectedButton,
  tag: Tag = 'div',
  className,
  ...props
}: FilterButtonsProps) {
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [isScrollable, setIsScrollable] = useState({ left: false, right: false });
  const scrollElementRefs = useRef<(HTMLButtonElement & HTMLAnchorElement & HTMLSpanElement & HTMLDivElement)[]>(
    new Array(filterButtons.length),
  );
  const [scrollTarget, setScrollTarget] = useState({ left: -1, right: -1 });

  const setScroll = (scrollBy: boolean, scroll: number, container: HTMLUListElement) => {
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

  const styles = filterButtonsStyles({});

  const handleScrollButton = (direction: string) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;

      let targetElement;
      let scrollX;
      let scrollBy = true;
      let buttonPaddingOffset = 20;
      if (direction === 'left') {
        if (scrollTarget.left === -1) {
          scrollX = -container.clientWidth;
        } else {
          scrollBy = false;
          targetElement = scrollElementRefs.current[scrollTarget.left];
          scrollX = targetElement.offsetLeft + targetElement.offsetWidth - container.offsetWidth + buttonPaddingOffset;
        }
      } else {
        if (scrollTarget.right === -1) {
          scrollX = container.clientWidth;
        } else {
          scrollBy = false;
          targetElement = scrollElementRefs.current[scrollTarget.right];
          scrollX = targetElement.offsetLeft - buttonPaddingOffset;
        }
      }
      setScroll(scrollBy, scrollX, container);
    }
  };

  /* eslint-disable sonarjs/cognitive-complexity */
  const handleScrollTarget = (container: HTMLUListElement) => {
    let targetRight = scrollTarget.right;
    let targetLeft = scrollTarget.left;
    const cLeft = container.scrollLeft;
    const cRight = cLeft + container.clientWidth;
    scrollElementRefs.current.forEach((element: HTMLButtonElement, index: number) => {
      const eLeft = element.offsetLeft;
      const eRight = eLeft + element.clientWidth;
      if (eLeft <= cLeft && eRight >= cLeft) {
        targetLeft = index;
      }
      if (eRight >= cRight && eLeft <= cRight) {
        targetRight = index;
      }
      if ((eRight >= cRight && eLeft <= cLeft) || targetRight === targetLeft + 1) {
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
      if (targetLeft === filterButtons.length - 1) {
        targetLeft -= 1;
      }
    });
    setScrollTarget({ left: targetLeft, right: targetRight });
  };

  const handleScrollable = (container: HTMLUListElement) => {
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
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('resize', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      handleScrollTarget(container);
      handleScrollable(container);
    }
  }, [handleScroll]);

  return (
    <Tag className={styles.container()}>
      <Button
        // iconColor="hero"
        // iconBefore={ArrowLeftIcon}
        style={{
          left: '0',
          background: 'linear-gradient(to left, transparent, white, white)',
          visibility: !isScrollable.left ? 'hidden' : 'visible',
        }}
        aria-hidden="true"
        className={styles.scrollButton()}
        onClick={() => handleScrollButton('left')}
        disabled={!isScrollable.left}
      >
        <ArrowLeftIcon className={styles.arrowIconLeft()} />
      </Button>

      <Button
        // iconColor="hero"
        // iconBefore={ArrowRightIcon}
        style={{
          right: '0',
          background: 'linear-gradient(to right, transparent, white, white)',
          visibility: !isScrollable.right ? 'hidden' : 'visible',
        }}
        aria-hidden="true"
        className={styles.scrollButton()}
        onClick={() => handleScrollButton('right')}
        disabled={!isScrollable.right}
      >
        <ArrowRightIcon className={styles.arrowIconRight()} />
      </Button>

      <ul
        className={styles.base({ className })}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          overflowX: 'scroll',
        }}
        {...props}
        ref={scrollContainerRef}
        role="list"
      >
        {filterButtons.map((button, index) => (
          <Button
            aria-pressed={button.id == selectedButton}
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
      </ul>
    </Tag>
  );
}
