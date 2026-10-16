'use client';

import React, { useEffect, useMemo, useReducer, useState } from 'react';

import { baseRopeStyles } from './base-rope.styles.js';
import { BaseRopeProps, OpenedGroupsAction, RopeStepItem, type RopeStepWithIndex } from './base-rope.types.js';

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

function openedGroupsReducer(state: number[], action: OpenedGroupsAction) {
  if (action.type === 'sync') {
    if (action.mode === 'single') {
      return action.groupIndex === null ? [] : [action.groupIndex];
    }

    return action.groupIndex === null || state.includes(action.groupIndex) ? state : [...state, action.groupIndex];
  }

  if (action.mode === 'single') {
    return state.includes(action.groupIndex) ? [] : [action.groupIndex];
  }

  return state.includes(action.groupIndex)
    ? state.filter(groupIndex => groupIndex !== action.groupIndex)
    : [...state, action.groupIndex];
}

/**
 * @private
 */
export function BaseRope<TStepItem extends RopeStepItem>({
  current = 0,
  data,
  groupToggleMode,
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

  const initiallyOpenedGroupStepIndex = verifyByCurrentIndexWhichGroupIsOpened<TStepItem>(current, mappedData || []);
  const [openedGroupStepIndexes, dispatchOpenedGroups] = useReducer(
    openedGroupsReducer,
    initiallyOpenedGroupStepIndex === null ? [] : [initiallyOpenedGroupStepIndex],
  );

  useEffect(() => {
    const newGroupStepIndex = verifyByCurrentIndexWhichGroupIsOpened(current, mappedData || []);
    dispatchOpenedGroups({ groupIndex: newGroupStepIndex, mode: groupToggleMode, type: 'sync' });
  }, [current, groupToggleMode, mappedData]);

  return (
    <ol className={baseRopeStyles({})}>
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
                  opened: openedGroupStepIndexes.includes(index),
                  toggle: () => dispatchOpenedGroups({ groupIndex: index, mode: groupToggleMode, type: 'toggle' }),
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
