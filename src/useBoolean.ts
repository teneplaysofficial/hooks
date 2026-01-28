import { Dispatch, SetStateAction, useCallback, useState } from 'react';

/**
 * Return type of {@link useBoolean} hook.
 */
export interface BooleanReturn {
  /** The current boolean value. */
  value: boolean;
  /** Directly sets the boolean state. */
  setValue: Dispatch<SetStateAction<boolean>>;
  /** Toggles the current value between `true` and `false`. */
  toggle: () => void;
  /** Sets the value to `true`. */
  setTrue: () => void;
  /** Sets the value to `false`. */
  setFalse: () => void;
  /** Resets the value back to the initial `defaultValue`. */
  reset: () => void;
}

/**
 * A simple and optimized React hook for managing boolean state.
 *
 * @remarks
 * This hook uses React hooks internally:
 * - {@link https://react.dev/reference/react/useState | useState} — to store and manage the boolean state.
 * - {@link https://react.dev/reference/react/useCallback | useCallback} — to memoize helper methods.
 *
 * @returns An object containing the current value and helper methods.
 *
 * @example
 * ```tsx
 * const { value, toggle, setTrue, setFalse, reset } = useBoolean();
 *
 * return (
 *   <>
 *     <p>{value ? 'ON' : 'OFF'}</p>
 *     <button onClick={toggle}>Toggle</button>
 *     <button onClick={setTrue}>Set True</button>
 *     <button onClick={setFalse}>Set False</button>
 *     <button onClick={reset}>Reset</button>
 *   </>
 * );
 * ```
 *
 * @since 0.2.1
 */
export function useBoolean(
  /**
   * The initial boolean value.
   *
   * @default false
   */
  defaultValue: boolean = false,
): BooleanReturn {
  const [value, setValue] = useState(!!defaultValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  const reset = useCallback(() => {
    setValue(!!defaultValue);
  }, [defaultValue]);

  return {
    value,
    setValue,
    toggle,
    setTrue,
    setFalse,
    reset,
  };
}
