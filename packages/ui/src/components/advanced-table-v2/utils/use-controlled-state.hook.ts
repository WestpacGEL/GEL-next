import { useCallback, useState } from 'react';

/**
 * Minimal controlled/uncontrolled state hook (mirrors react-stately's
 * `useControlledState` API) so every state slice is written once.
 *
 * - When `value` is provided the state is **controlled**: the returned value
 *   always reflects `value`, and the setter only calls `onChange`.
 * - When `value` is `undefined` the state is **uncontrolled**: it is seeded from
 *   `defaultValue`, the setter updates internal state, and `onChange` still fires.
 */
export function useControlledState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (next: T) => void] {
  const [internalValue, setInternalValue] = useState<T>(value ?? defaultValue);
  const isControlled = value !== undefined;
  const resolvedValue = isControlled ? (value as T) : internalValue;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [resolvedValue, setValue];
}
