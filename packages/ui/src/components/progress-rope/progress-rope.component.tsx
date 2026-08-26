'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { ProgressRopeGroupStep, ProgressRopeStep } from './components/index.js';
import { StatusRopeStep } from './components/progress-rope-step/progress-rope-step.component.js';
import { styles } from './progress-rope.styles.js';
import {
  BaseRopeProps,
  ProgressRopeStepItem,
  RopeStepItem,
  StatusRopeProps,
  StatusRopeStepItem,
  type ProgressRopeProps,
  type RopeStepWithIndex,
} from './progress-rope.types.js';

function verifyByCurrentIndexWhichGroupIsOpened<TStepItem extends RopeStepItem>(
  currentIndex: number,
  mappedData: RopeStepWithIndex<TStepItem>[],
) {
  return mappedData.reduce((acc: null | number, step, index) => {
    if (step.type === 'group' && step.steps.find(subStep => subStep.index === currentIndex)) {
      return index;
    }
    return acc;
  }, null);
}

function BaseRope<TStepItem extends RopeStepItem>({
  current = 0,
  data,
  headingTag = 'h3',
  renderGroup,
  renderStep,
  ...props
}: BaseRopeProps<TStepItem>) {
  const [furthestVisitedStep, setFurthestVisitedStep] = useState<number>(current);

  const mappedData = useMemo(() => {
    let autoIncrement = -1;
    return data?.reduce((acc: RopeStepWithIndex<TStepItem>[], current) => {
      if (current.type === 'group') {
        return [
          ...acc,
          {
            ...current,
            steps: current.steps.map(step => {
              autoIncrement++;
              return { ...step, index: autoIncrement };
            }),
          },
        ];
      }
      autoIncrement++;
      return [
        ...acc,
        {
          ...current,
          index: autoIncrement,
        },
      ];
    }, []);
  }, [data]);

  useEffect(() => {
    setFurthestVisitedStep(state => {
      return state > current ? state : current;
    });
  }, [current]);

  const [openedGroupStepIndex, setOpenedGroupStepIndex] = useState<number | null>(
    verifyByCurrentIndexWhichGroupIsOpened<TStepItem>(current, mappedData || []),
  );

  useEffect(() => {
    const newGroupStepIndex = verifyByCurrentIndexWhichGroupIsOpened(current, mappedData || []);
    setOpenedGroupStepIndex(newGroupStepIndex);
  }, [current, mappedData]);

  return (
    <ol className={styles({})}>
      {mappedData?.map((item, index) => {
        const firstItem = index === 0;
        const lastItem = index === mappedData.length - 1;

        return (
          <li key={index}>
            {item.type === 'group'
              ? renderGroup(item, {
                  current: item.steps.some(step => step.index === current),
                  visited: item.steps.some(step => furthestVisitedStep >= step.index),
                  furthestVisitedStep,
                  opened: openedGroupStepIndex === index,
                  toggle: () => setOpenedGroupStepIndex(state => (state === index ? null : index)),
                  firstItem,
                  lastItem,
                })
              : renderStep(item, {
                  current: current === item.index,
                  visited: furthestVisitedStep > item.index,
                  furthest: furthestVisitedStep === item.index,
                  furthestVisitedStep,
                  firstItem,
                  lastItem,
                  previousStepGroup: mappedData[index - 1]?.type === 'group',
                })}
          </li>
        );
      })}
    </ol>
  );
}

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
  const [furthestVisitedStep, setFurthestVisitedStep] = useState<number>(current);

  const mappedData = useMemo(() => {
    let autoIncrement = -1;
    return data?.reduce((acc: RopeStepWithIndex<ProgressRopeStepItem>[], current) => {
      if (current.type === 'group') {
        return [
          ...acc,
          {
            ...current,
            steps: current.steps.map(step => {
              autoIncrement++;
              return { ...step, index: autoIncrement };
            }),
          },
        ];
      }
      autoIncrement++;
      return [
        ...acc,
        {
          ...current,
          index: autoIncrement,
        },
      ];
    }, []);
  }, [data]);

  useEffect(() => {
    setFurthestVisitedStep(state => {
      return state > current ? state : current;
    });
  }, [current]);

  const [openedGroupStepIndex, setOpenedGroupStepIndex] = useState<number | null>(
    verifyByCurrentIndexWhichGroupIsOpened(current, mappedData || []),
  );

  useEffect(() => {
    const newGroupStepIndex = verifyByCurrentIndexWhichGroupIsOpened(current, mappedData || []);
    setOpenedGroupStepIndex(newGroupStepIndex);
  }, [current, mappedData]);

  return (
    <Tag className={className} role={role} aria-label={ariaLabel} {...props}>
      <ol className={styles({})}>
        {mappedData?.map((item, index) => {
          return (
            <li key={index}>
              {item.type === 'group' ? (
                <ProgressRopeGroupStep
                  firstItem={index === 0}
                  lastItem={index === mappedData.length - 1}
                  furthestVisitedStep={furthestVisitedStep}
                  currentKey={current}
                  steps={item.steps}
                  opened={openedGroupStepIndex === index}
                  onToggle={() => setOpenedGroupStepIndex(state => (state === index ? null : index))}
                  tag={headingTag}
                  variant="progress"
                  renderStep={(step, context) => (
                    <ProgressRopeStep
                      firstItem={context.firstItem}
                      lastItemInGroup={context.lastItem}
                      lastItemInRope={context.lastItemInRope}
                      size="small"
                      onClick={context.furthestVisitedStep >= step.index ? step.onClick : undefined}
                      current={context.current}
                      visited={context.visited}
                      furthest={context.furthest}
                      tabIndex={context.tabIndex}
                      text={step.text}
                    />
                  )}
                >
                  {item.text}
                </ProgressRopeGroupStep>
              ) : (
                <ProgressRopeStep
                  firstItem={index === 0}
                  onClick={furthestVisitedStep >= item.index ? item.onClick : undefined}
                  visited={furthestVisitedStep > item.index}
                  furthest={furthestVisitedStep === item.index}
                  current={current === item.index}
                  previousStepGroup={mappedData[index - 1]?.type === 'group'}
                  lastItemInRope={item === mappedData.slice(-1)[0]}
                  text={item.text}
                />
              )}
            </li>
          );
        })}
      </ol>
    </Tag>
  );
}

export function StatusRope({ className, current = 0, data, headingTag = 'h3', ...props }: StatusRopeProps) {
  return (
    <section className={className} aria-label="Form Status" {...props}>
      <BaseRope<StatusRopeStepItem>
        current={current}
        headingTag={headingTag}
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
                tabIndex={stepContext.tabIndex}
                text={step.text}
                subText={step.subText}
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
            subText={step.subText}
          />
        )}
      />
    </section>
  );
}
