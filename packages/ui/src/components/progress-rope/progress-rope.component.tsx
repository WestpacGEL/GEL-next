'use client';

import React from 'react';

import { BaseRope } from './components/base-rope/base-rope.component.js';
import { BaseRopeGroupStep, ProgressRopeStep } from './components/index.js';
import { ProgressRopeStepItem, type ProgressRopeProps } from './progress-rope.types.js';

export function ProgressRope({
  'aria-label': ariaLabel = 'In this form',
  role = 'navigation',
  className,
  tag: Tag = 'nav',
  current = 0,
  data,
  headingTag = 'h3',
  ...props
}: ProgressRopeProps) {
  return (
    <Tag className={className} role={role} aria-label={ariaLabel} {...props}>
      <BaseRope<ProgressRopeStepItem>
        current={current}
        data={data}
        groupToggleMode="single"
        renderGroup={(group, context) => (
          <BaseRopeGroupStep
            firstItem={context.firstItem}
            lastItem={context.lastItem}
            furthestVisitedStep={context.furthestVisitedStep}
            currentKey={current}
            steps={group.steps}
            opened={context.opened}
            onToggle={context.toggle}
            tag={headingTag}
            variant="progress"
            renderStep={(step, stepContext) => (
              <ProgressRopeStep
                firstItem={stepContext.firstItem}
                lastItemInGroup={stepContext.lastItem}
                lastItemInRope={stepContext.lastItemInRope}
                size="small"
                onClick={stepContext.furthestVisitedStep >= step.index ? step.onClick : undefined}
                current={stepContext.current}
                visited={stepContext.visited}
                furthest={stepContext.furthest}
                tabIndex={stepContext.tabIndex}
                text={step.text}
              />
            )}
          >
            {group.text}
          </BaseRopeGroupStep>
        )}
        renderStep={(step, context) => (
          <ProgressRopeStep
            firstItem={context.firstItem}
            onClick={context.furthestVisitedStep >= step.index ? step.onClick : undefined}
            visited={context.visited}
            furthest={context.furthest}
            current={context.current}
            previousStepGroup={context.previousStepGroup}
            lastItemInRope={context.lastItem}
            text={step.text}
          />
        )}
      />
    </Tag>
  );
}
