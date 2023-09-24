import React, { useEffect, useMemo, useState } from 'react';

import { ProgressRopeGroupStep, ProgressRopeStep } from './components/index.js';
import { styles } from './progress-rope.styles.js';
import { type ProgressRopeProps, type ProgressRopeStepWithIndex } from './progress-rope.types.js';

const verifyByCurrentIndexWhichGroupIsOpened = (currentIndex: number, mappedData: ProgressRopeStepWithIndex[]) => {
  return mappedData.reduce((acc: null | number, step, index) => {
    if (step.type === 'group' && step.steps.find(subStep => subStep.index === currentIndex)) {
      return index;
    }
    return acc;
  }, null);
};

export function ProgressRope({
  'aria-label': ariaLabel = 'Form steps',
  role = 'navigation',
  className,
  tag: Tag = 'nav',
  current = 0,
  data,
  ...props
}: ProgressRopeProps) {
  const [furthestVisitedStep, setFurthestVisitedStep] = useState<number>(current);

  const mappedData = useMemo(() => {
    let autoIncrement = -1;
    return data?.reduce((acc: ProgressRopeStepWithIndex[], current) => {
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
    if (newGroupStepIndex !== openedGroupStepIndex) {
      setOpenedGroupStepIndex(newGroupStepIndex);
    }
  }, [current]);

  return (
    <Tag className={className} role={role} aria-label={ariaLabel} {...props}>
      <ul className={styles({})}>
        {mappedData?.map((item, index) => {
          return (
            <li key={index}>
              {item.type === 'group' ? (
                <ProgressRopeGroupStep
                  firstItem={index === 0}
                  furthestVisitedStep={furthestVisitedStep}
                  currentKey={current}
                  steps={item.steps}
                  opened={openedGroupStepIndex === index}
                  onToggle={() => setOpenedGroupStepIndex(state => (state === index ? null : index))}
                >
                  {item.text}
                </ProgressRopeGroupStep>
              ) : (
                <ProgressRopeStep
                  firstItem={index === 0}
                  type={item.type}
                  onClick={furthestVisitedStep >= item.index ? item.onClick : undefined}
                  visited={furthestVisitedStep >= item.index}
                  current={current === item.index}
                >
                  {item.text}
                </ProgressRopeStep>
              )}
            </li>
          );
        })}
      </ul>
    </Tag>
  );
}
