import { useMemo } from 'react';
import { useFocusRing } from 'react-aria';

import { useBreakpoint } from '../../../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../../../utils/breakpoint.util.js';
import { styles as progressRopeStyles } from '../progress-rope-step/progress-rope-step.styles.js';
import {
  RopeStepProps,
  type UseRopeStepProps,
  type UseRopeStepReturn,
} from '../progress-rope-step/progress-rope-step.types.js';

function getRopeStepState({
  current,
  lastItemInRope,
  visited,
}: Pick<RopeStepProps, 'current' | 'lastItemInRope' | 'visited'>) {
  if (lastItemInRope && visited && current) {
    return 'last-current';
  }
  if (lastItemInRope && visited) {
    return 'last-visited';
  }
  if (current && visited) {
    return 'current-visited';
  }
  if (current) {
    return 'current';
  }
  if (visited) {
    return 'visited';
  }
  return 'non-visited';
}

export function useRopeStep({
  className,
  current,
  firstItem,
  furthest,
  lastItemInGroup,
  lastItemInRope,
  previousStepGroup,
  size = 'medium',
  variant,
  visited,
}: UseRopeStepProps): UseRopeStepReturn {
  const state = useMemo(
    () => getRopeStepState({ current, lastItemInRope, visited }),
    [current, lastItemInRope, visited],
  );
  const { isFocusVisible, focusProps } = useFocusRing();
  const breakpoint = useBreakpoint();

  const styles = progressRopeStyles({
    className,
    state,
    size: resolveResponsiveVariant(size, breakpoint),
    firstItem,
    lastItemInGroup,
    lastItemInRope: lastItemInRope && !previousStepGroup,
    lastItemInRopeGrouped: lastItemInRope && previousStepGroup,
    furthestVisited: !current && furthest,
    previousStepGroup: furthest && previousStepGroup,
    isFocusVisible,
    variant,
  });

  return { focusProps, state, styles };
}
