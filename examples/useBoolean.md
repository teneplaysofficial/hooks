# `useBoolean`

A simple and optimized React hook for managing boolean state with handy helpers like `toggle`, `setTrue`, `setFalse`, and `reset`.

## Overview

- The `useBoolean` hook simplifies managing boolean flags in React components.
- It returns the current value and several utility functions to modify or reset it.

### Signature

```ts
const { value, setValue, toggle, setTrue, setFalse, reset } = useBoolean(defaultValue?: boolean);
```

| Property   | Type                                | Description                                          |
| ---------- | ----------------------------------- | ---------------------------------------------------- |
| `value`    | `boolean`                           | The current boolean state.                           |
| `setValue` | `Dispatch<SetStateAction<boolean>>` | Directly updates the state (like `setState`).        |
| `toggle`   | `() => void`                        | Flips the current value between `true` and `false`.  |
| `setTrue`  | `() => void`                        | Sets the value to `true`.                            |
| `setFalse` | `() => void`                        | Sets the value to `false`.                           |
| `reset`    | `() => void`                        | Resets the value back to the initial `defaultValue`. |

## Examples

### Basic

```tsx
import { useBoolean } from '@tenedev/hooks';

export default function Toggle() {
  const { value, toggle } = useBoolean(false);

  return (
    <div>
      <p>Status: {value ? 'ON' : 'OFF'}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}
```

> Tip: `useBoolean()` defaults to `false` if no argument is provided.

### Setting True / False Explicitly

```tsx
import { useBoolean } from '@tenedev/hooks';

export default function BooleanSetter() {
  const { value, setTrue, setFalse } = useBoolean();

  return (
    <div>
      <p>Value: {value ? 'Enabled' : 'Disabled'}</p>
      <button onClick={setTrue}>Enable</button>
      <button onClick={setFalse}>Disable</button>
    </div>
  );
}
```

> This pattern is useful for toggling modal visibility, feature switches, etc.

### Reset to Default

```tsx
import { useBoolean } from '@tenedev/hooks';

export default function Reset() {
  const { value, toggle, reset } = useBoolean(true);

  return (
    <div>
      <p>Value: {value ? 'True' : 'False'}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

> The `reset()` method restores the state back to its initial default value (passed during initialization).

### Controlled Updates via `setValue`

You can also directly manipulate the boolean like React state.

```tsx
import { useBoolean } from '@tenedev/hooks';

export default function SetValue() {
  const { value, setValue } = useBoolean(false);

  return (
    <div>
      <p>Value: {String(value)}</p>
      <button onClick={() => setValue(true)}>Set True</button>
      <button onClick={() => setValue((prev) => !prev)}>Invert</button>
    </div>
  );
}
```

## Real-World Scenarios

### Modal Visibility

```tsx
function ModalExample() {
  const { value: isOpen, setTrue: open, setFalse: close } = useBoolean();

  return (
    <>
      <button onClick={open}>Open Modal</button>
      {isOpen && (
        <div className="modal">
          <p>Modal Content</p>
          <button onClick={close}>Close</button>
        </div>
      )}
    </>
  );
}
```

### Checkbox State

```tsx
function CheckboxExample() {
  const { value, toggle } = useBoolean();

  return (
    <label>
      <input type="checkbox" checked={value} onChange={toggle} />
      Accept Terms
    </label>
  );
}
```

### API Loading Flag

```tsx
function FetchButton() {
  const { value: loading, setTrue: start, setFalse: stop } = useBoolean();

  const fetchData = async () => {
    start();
    await new Promise((res) => setTimeout(res, 1000));
    stop();
  };

  return (
    <button disabled={loading} onClick={fetchData}>
      {loading ? 'Loading...' : 'Fetch Data'}
    </button>
  );
}
```

## Summary

| Method       | Purpose                |
| ------------ | ---------------------- |
| `toggle()`   | Flips `true/false`     |
| `setTrue()`  | Sets `true`            |
| `setFalse()` | Sets `false`           |
| `reset()`    | Restores default value |
| `setValue()` | Manual state setter    |

## Reference

See [`useBoolean.test.ts`](../src/useBoolean.test.ts) for comprehensive unit tests covering
