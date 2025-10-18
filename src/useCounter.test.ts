import { act, renderHook } from '@testing-library/react-hooks';
import { useCounter } from './useCounter';

test('should return the initial count', () => {
  const { result } = renderHook(() => useCounter());

  expect(result.current.count).toBe(0);
  expect(result.current.isMax).toBe(false);
  expect(result.current.isMin).toBe(false);
});

it('should initialize with given initialValue', () => {
  const { result } = renderHook(() => useCounter({ initialValue: 5 }));

  expect(result.current.count).toBe(5);
});

it('should respect min and max on initialization', () => {
  const { result: r1 } = renderHook(() => useCounter({ initialValue: 10, max: 5 }));
  expect(r1.current.count).toBe(5);

  const { result: r2 } = renderHook(() => useCounter({ initialValue: -10, min: 0 }));
  expect(r2.current.count).toBe(0);
});

it('should increment and respect max', () => {
  const { result } = renderHook(() => useCounter({ max: 2, step: 2 }));

  act(() => result.current.increment());
  expect(result.current.count).toBe(2);
  expect(result.current.isMax).toBe(true);

  act(() => result.current.increment());
  expect(result.current.count).toBe(2);
});

it('should decrement and respect min', () => {
  const { result } = renderHook(() => useCounter({ initialValue: 2, min: 0, step: 2 }));

  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
  expect(result.current.isMin).toBe(true);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

it('should call onChange when count changes', () => {
  const onChange = jest.fn();
  const { result } = renderHook(() => useCounter({ onChange }));

  act(() => result.current.increment());
  expect(onChange).toHaveBeenCalledWith(1);

  act(() => result.current.decrement());
  expect(onChange).toHaveBeenCalledWith(0);
});

it('should reset to initial value', () => {
  const { result } = renderHook(() => useCounter({ initialValue: 5 }));

  act(() => result.current.increment());
  expect(result.current.count).toBe(6);

  act(() => result.current.reset());
  expect(result.current.count).toBe(5);
});

it('should reset to specific value with resetTo', () => {
  const { result } = renderHook(() => useCounter({ min: 0, max: 10 }));

  act(() => result.current.resetTo(7));
  expect(result.current.count).toBe(7);

  act(() => result.current.resetTo(20));
  expect(result.current.count).toBe(10);

  act(() => result.current.resetTo(-5));
  expect(result.current.count).toBe(0);
});

it('should allow direct setCount to set any value', () => {
  const { result } = renderHook(() => useCounter({ min: 0, max: 5 }));

  act(() => result.current.setCount(3));
  expect(result.current.count).toBe(3);

  act(() => result.current.setCount(10));
  expect(result.current.count).toBe(10);

  act(() => result.current.setCount(-2));
  expect(result.current.count).toBe(-2);
});

it('should correctly update isMin and isMax flags', () => {
  const { result } = renderHook(() => useCounter({ min: 0, max: 2 }));

  expect(result.current.isMin).toBe(true);
  expect(result.current.isMax).toBe(false);

  act(() => result.current.increment());
  expect(result.current.isMin).toBe(false);
  expect(result.current.isMax).toBe(false);

  act(() => result.current.increment());
  expect(result.current.isMax).toBe(true);
});

it('should respect boundaries when using setCountBounded with a number', () => {
  const { result } = renderHook(() => useCounter({ min: 0, max: 10 }));

  act(() => result.current.setCountBounded(15));
  expect(result.current.count).toBe(10);

  act(() => result.current.setCountBounded(-5));
  expect(result.current.count).toBe(0);

  act(() => result.current.setCountBounded(5));
  expect(result.current.count).toBe(5);
});

it('should respect boundaries when using setCountBounded with an updater function', () => {
  const { result } = renderHook(() => useCounter({ initialValue: 5, min: 0, max: 10 }));

  act(() => result.current.setCountBounded((prev) => prev + 10));
  expect(result.current.count).toBe(10);

  act(() => result.current.setCountBounded((prev) => prev - 20));
  expect(result.current.count).toBe(0);

  act(() => result.current.setCountBounded((prev) => prev + 3));
  expect(result.current.count).toBe(3);
});

it('should trigger onChange when setCountBounded changes count', () => {
  const onChange = jest.fn();
  const { result } = renderHook(() => useCounter({ min: 0, max: 5, onChange }));

  act(() => result.current.setCountBounded(3));
  expect(onChange).toHaveBeenCalledWith(3);

  act(() => result.current.setCountBounded(7));
  expect(onChange).toHaveBeenCalledWith(5);

  act(() => result.current.setCountBounded(-2));
  expect(onChange).toHaveBeenCalledWith(0);
});
