'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { styles } from '../../progress-rope.styles.js';
import { BaseRopeProps, RopeStepItem, type RopeStepWithIndex } from '../../progress-rope.types.js';

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

/**
 * @private
 */
export function BaseRope<TStepItem extends RopeStepItem>({
  current = 0,
  data,
  renderGroup,
  renderStep,
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
