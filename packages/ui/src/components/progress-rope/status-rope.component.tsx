'use client';

import React from 'react';

import { BaseRope } from './components/base-rope/base-rope.component.js';
import { ProgressRopeGroupStep } from './components/index.js';
import { StatusRopeStep } from './components/status-rope-step/status-rope-step.component.js';
import { StatusRopeProps, StatusRopeStepItem } from './progress-rope.types.js';

export function StatusRope({ className, current = 0, data, headingTag = 'h3', ...props }: StatusRopeProps) {
  return (
    <section className={className} aria-label="Form Status" {...props}>
      <BaseRope<StatusRopeStepItem>
        current={current}
        data={data}
        renderGroup={(group, context) => (
          <ProgressRopeGroupStep
            firstItem={context.firstItem}
            lastItem={context.lastItem}
            currentKey={current}
            furthestVisitedStep={context.furthestVisitedStep}
            steps={group.steps}
            opened={context.opened}
            onToggle={context.toggle}
            tag={headingTag}
            variant="status"
            renderStep={(step, stepContext) => (
              <StatusRopeStep
                firstItem={stepContext.firstItem}
                lastItemInGroup={stepContext.lastItem}
                lastItemInRope={stepContext.lastItemInRope}
                size="small"
                current={stepContext.current}
                visited={stepContext.visited}
                furthest={stepContext.furthest}
                text={step.text}
                subText={step.description}
              />
            )}
          >
            {group.text}
          </ProgressRopeGroupStep>
        )}
        renderStep={(step, context) => (
          <StatusRopeStep
            firstItem={context.firstItem}
            lastItemInRope={context.lastItem}
            previousStepGroup={context.previousStepGroup}
            current={context.current}
            visited={context.visited}
            furthest={context.furthest}
            text={step.text}
            subText={step.description}
          />
        )}
      />
    </section>
  );
}
