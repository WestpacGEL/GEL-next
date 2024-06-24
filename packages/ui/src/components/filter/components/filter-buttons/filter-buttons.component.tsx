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

  // WIP
  const [buttonWidths, setButtonWidths] = useState([]);
  const [currentButton, setCurrentButton] = useState(0);
  const scrollElementRef = useRef<any>();
  const buttonsPerScroll = 2;

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
      const container = scrollContainerRef.current;

      // scroll to button
      // if (direction === 'left' && filterButtons.length > currentButton + 1) {
      //   container.scrollTos();
      // }

      // let scrollAmount = scrollContainerRef.current.clientWidth;
      let scrollAmount = container.offsetWidth;
      if (direction === 'left') {
        sideScroll(container, 1, scrollAmount, -3);
      } else {
        sideScroll(container, 1, scrollAmount, 3);
      }
    }
  };

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      // Find the first button whose left side is aligned with the scroll container's left side
      const container = scrollContainerRef.current;
      for (let i = 0; i < filterButtons.length; i++) {
        const button = filterButtons[i];
        const buttonElement = container.querySelector(`button[data-button-id="${button.id}"]`);

        if (buttonElement) {
          const buttonRect = buttonElement.getBoundingClientRect();
          if (buttonRect.left >= container.getBoundingClientRect().left) {
            setCurrentButton(i);
            break;
          }
        }
      }

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

  // WIP
  // for handling button start
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // const buttonElements = container.children;
      // const widths = Array.from(buttonElements).map((button: { clientWidth: any }) => button.clientWidth);
      // setButtonWidths(widths);
    }
  }, []);

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
        style={{
          scrollbarWidth: 'thin',
        }}
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
            //WIP
            ref={scrollElementRef}
          >
            {button.text}
          </Button>
        ))}
      </div>
    </Tag>
  );
}
