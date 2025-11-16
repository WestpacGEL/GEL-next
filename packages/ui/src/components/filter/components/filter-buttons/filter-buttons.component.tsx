'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { type ButtonRef } from '../../../button/button.types.js';
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
  const scrollElementRefs = useRef<ButtonRef[]>(new Array(filterButtons.length) as ButtonRef[]);
  const [scrollTarget, setScrollTarget] = useState({ left: -1, right: -1 });

  const styles = filterButtonsStyles();

  const setScroll = useCallback((scrollBy: boolean, scroll: number, container: HTMLUListElement) => {
    if (scrollBy) {
      container.scrollBy({
        left: scroll,
        behavior: 'smooth',
      });
      return;
    }
    container.scrollTo({
      left: scroll,
      behavior: 'smooth',
    });
  }, []);

  const handleScrollButton = useCallback(
    (direction: string) => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;

        let targetElement;
        let scrollX;
        let scrollBy = true;
        const buttonPaddingOffset = 26;
        if (direction === 'left') {
          if (scrollTarget.left === -1) {
            scrollX = -container.clientWidth;
          } else {
            scrollBy = false;
            targetElement = scrollElementRefs.current[scrollTarget.left];
            scrollX =
              targetElement.offsetLeft + targetElement.offsetWidth - container.offsetWidth + buttonPaddingOffset;
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scrollTarget],
  );

  const getTargetLeft = useCallback((element: HTMLButtonElement, cLeft: number, index: number, targetLeft: number) => {
    const eLeft = element.offsetLeft;
    const eRight = eLeft + element.clientWidth;

    if (eLeft <= cLeft && eRight >= cLeft) {
      targetLeft = index;
    }

    return targetLeft;
  }, []);

  const getTargetRight = useCallback(
    (element: HTMLButtonElement, cRight: number, index: number, targetRight: number) => {
      const eLeft = element.offsetLeft;
      const eRight = eLeft + element.clientWidth;

      if (eRight >= cRight && eLeft <= cRight) {
        targetRight = index;
      }

      return targetRight;
    },
    [],
  );

  const adjustTargets = useCallback(
    (element: HTMLButtonElement, cLeft: number, cRight: number, targetLeft: number, targetRight: number) => {
      const eLeft = element.offsetLeft;
      const eRight = eLeft + element.clientWidth;

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

      return { targetLeft, targetRight };
    },
    [filterButtons.length],
  );

  const handleScrollTarget = useCallback(
    (container: HTMLUListElement) => {
      let targetRight = scrollTarget.right;
      let targetLeft = scrollTarget.left;
      const cLeft = container.scrollLeft;
      const cRight = cLeft + container.clientWidth;

      scrollElementRefs.current.forEach((element: HTMLButtonElement, index: number) => {
        targetLeft = getTargetLeft(element, cLeft, index, targetLeft);
        targetRight = getTargetRight(element, cRight, index, targetRight);
        const targets = adjustTargets(element, cLeft, cRight, targetLeft, targetRight);
        targetLeft = targets.targetLeft;
        targetRight = targets.targetRight;
        if (targetLeft === filterButtons.length - 1) {
          targetLeft -= 1;
        }
      });

      if (targetLeft !== scrollTarget.left || targetRight !== scrollTarget.right) {
        setScrollTarget({ left: targetLeft, right: targetRight });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scrollTarget, getTargetLeft, getTargetRight, adjustTargets],
  );

  const handleScrollable = useCallback((container: HTMLUListElement) => {
    const isLeftScrollable = container.scrollLeft >= 1;
    const isRightScrollable = container.scrollLeft < container.scrollWidth - container.clientWidth - 1;
    setIsScrollable({ left: isLeftScrollable, right: isRightScrollable });
  }, []);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      handleScrollTarget(container);
      handleScrollable(container);
    }
  }, [handleScrollTarget, handleScrollable]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      handleScrollTarget(container);
      handleScrollable(container);

      container.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
    }

    return () => {
      container?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleScrollTarget, handleScrollable]);

  return (
    <Tag className={styles.base({ className })}>
      <Button
        className={styles.scrollButton({ position: 'left', hidden: !isScrollable.left })}
        onClick={() => handleScrollButton('left')}
        look="link"
        size="small"
        iconBefore={ArrowLeftIcon}
        iconColor="hero"
        iconSize="medium"
        aria-hidden="true"
      />
      <Button
        className={styles.scrollButton({ position: 'right', hidden: !isScrollable.right })}
        onClick={() => handleScrollButton('right')}
        look="link"
        size="small"
        iconBefore={ArrowRightIcon}
        iconColor="hero"
        iconSize="medium"
        aria-hidden="true"
      />
      <ul
        className={styles.buttonList({ className })}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        {...props}
        ref={scrollContainerRef}
        role="list"
      >
        {filterButtons.map((button, index) => (
          <Button
            aria-pressed={button.id === selectedButton}
            look="hero"
            size="small"
            onClick={() => onClick(button.id)}
            key={button.id}
            soft={button.id !== selectedButton}
            button-index={index}
            ref={(element: ButtonRef) => (scrollElementRefs.current[index] = element)}
          >
            {button.text}
          </Button>
        ))}
      </ul>
    </Tag>
  );
}
