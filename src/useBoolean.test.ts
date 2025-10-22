import { act, renderHook } from '@testing-library/react-hooks';
import { useBoolean } from './useBoolean';

it('should initialize with default value', () => {
  const { result } = renderHook(() => useBoolean());

  expect(result.current.value).toBe(false);
});

it('should initialize with provided default value', () => {
  const { result } = renderHook(() => useBoolean(true));

  expect(result.current.value).toBe(true);
});

it('should toggle the value', () => {
  const { result } = renderHook(() => useBoolean());

  act(() => {
    result.current.toggle();
  });

  expect(result.current.value).toBe(true);

  act(() => {
    result.current.toggle();
  });
  expect(result.current.value).toBe(false);
});

it('should set value to true using setTrue', () => {
  const { result } = renderHook(() => useBoolean());

  expect(result.current.value).toBe(false);

  act(() => {
    result.current.setTrue();
  });

  expect(result.current.value).toBe(true);
});

it('should set value to false using setFalse', () => {
  const { result } = renderHook(() => useBoolean(true));

  expect(result.current.value).toBe(true);

  act(() => {
    result.current.setFalse();
  });

  expect(result.current.value).toBe(false);
});

it('should reset to initial default value', () => {
  const { result } = renderHook(() => useBoolean());

  act(() => {
    result.current.toggle();
  });

  expect(result.current.value).toBe(true);

  act(() => {
    result.current.reset();
  });

  expect(result.current.value).toBe(false);
});

it('should allow direct state updates with setValue', () => {
  const { result } = renderHook(() => useBoolean());

  act(() => {
    result.current.setValue(true);
  });

  expect(result.current.value).toBe(true);

  act(() => {
    result.current.setValue((prev) => !prev);
  });

  expect(result.current.value).toBe(false);
});
