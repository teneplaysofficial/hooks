# useCounter

A flexible and feature-rich React hook for managing numeric counter state with support for **min/max boundaries**, **step control**, **reset options**, and **change callbacks**.

## Overview

- `useCounter` simplifies handling numeric counters in React.
- It supports boundaries (`min`, `max`), step values, custom change handlers, and controlled or bounded updates.
- Provides helper flags (`isMin`, `isMax`) for UI constraints.

### Signature

```ts
const {
  count,
  setCount,
  increment,
  decrement,
  reset,
  resetTo,
  isMin,
  isMax,
  setCountBounded
} = useCounter(options?: Counter);
```

### Options

| Option         | Type          | Default | Description                          |
| -------------- | ------------- | ------- | ------------------------------------ |
| `initialValue` | `number`      | `0`     | Starting counter value.              |
| `min`          | `number`      | —       | Minimum allowed value.               |
| `max`          | `number`      | —       | Maximum allowed value.               |
| `step`         | `number`      | `1`     | Amount used for increment/decrement. |
| `onChange`     | `(n) => void` | —       | Called whenever the value updates.   |

### Returned API

| Property          | Type                               | Description                          |
| ----------------- | ---------------------------------- | ------------------------------------ |
| `count`           | `number`                           | Current counter value.               |
| `setCount`        | `Dispatch<SetStateAction<number>>` | Direct setter — **does NOT clamp**.  |
| `increment`       | `() => void`                       | Adds `step`, respects `max`.         |
| `decrement`       | `() => void`                       | Subtracts `step`, respects `min`.    |
| `reset`           | `() => void`                       | Resets to `initialValue` (clamped).  |
| `resetTo`         | `(value: number) => void`          | Resets to a specific clamped value.  |
| `isMin`           | `boolean`                          | `true` if at or below `min`.         |
| `isMax`           | `boolean`                          | `true` if at or above `max`.         |
| `setCountBounded` | `Dispatch<SetStateAction<number>>` | Safely updates value while clamping. |

## Examples

### Basic

```tsx
import { useCounter } from '@tenedev/hooks';

export default function CounterBasic() {
  const { count, increment, decrement } = useCounter({ initialValue: 5 });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

> Defaults: `initialValue = 0`, `step = 1`

### Using Min/Max Boundaries

```tsx
const counter = useCounter({ initialValue: 3, min: 0, max: 5 });

counter.increment(); // 4
counter.increment(); // 5
counter.increment(); // still 5 (max)
```

> Useful for pagination, quantity pickers, volume controls.

### Resetting

```tsx
export default function CounterReset() {
  const { count, increment, reset, resetTo } = useCounter({ initialValue: 10 });

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
      <button onClick={() => resetTo(3)}>Reset to 3</button>
    </>
  );
}
```

### Using `setCountBounded` for Safe Controlled Updates

```tsx
export default function BoundedSet() {
  const { count, setCountBounded } = useCounter({ min: 0, max: 100 });

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCountBounded((p) => p + 10)}>+10</button>
      <button onClick={() => setCountBounded(150)}>Set 150 (clamped to 100)</button>
    </>
  );
}
```

### Detecting Boundaries (`isMin`, `isMax`)

```tsx
export default function BoundaryUI() {
  const { count, increment, decrement, isMin, isMax } = useCounter({
    min: 0,
    max: 10,
  });

  return (
    <>
      <p>Count: {count}</p>
      <button disabled={isMin} onClick={decrement}>
        -
      </button>
      <button disabled={isMax} onClick={increment}>
        +
      </button>
    </>
  );
}
```

> Great for disabling UI controls when edges are reached.

### Listening to Value Changes

```tsx
useCounter({
  initialValue: 0,
  onChange(value) {
    console.log('New value:', value);
  },
});
```

> Ideal for syncing form state, analytics, or localStorage.

## Real-World Scenarios

### Quantity Selector (E-commerce)

```tsx
function QuantitySelector() {
  const { count, increment, decrement, isMax, isMin } = useCounter({
    initialValue: 1,
    min: 1,
    max: 5,
  });

  return (
    <div>
      <button disabled={isMin} onClick={decrement}>
        -
      </button>
      <span>{count}</span>
      <button disabled={isMax} onClick={increment}>
        +
      </button>
    </div>
  );
}
```

### Pagination

```tsx
const {
  count: page,
  increment,
  decrement,
  isMin,
  isMax,
} = useCounter({
  initialValue: 1,
  min: 1,
  max: totalPages,
});
```

### Timers / Counters / Form Controls

```tsx
const age = useCounter({ min: 0, max: 120 });
```

## Summary

| Method              | Purpose                           |
| ------------------- | --------------------------------- |
| `increment()`       | Increase by step (clamped)        |
| `decrement()`       | Decrease by step (clamped)        |
| `reset()`           | Reset to `initialValue` (clamped) |
| `resetTo(value)`    | Reset to a specific clamped value |
| `setCount()`        | Direct raw setter (no clamping)   |
| `setCountBounded()` | Safe setter (with clamping)       |
| `isMin` / `isMax`   | Boundary checks                   |
