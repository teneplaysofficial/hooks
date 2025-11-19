# useDocumentTitle

A React hook for declaratively managing `document.title` with support for **templates**, **conditional updates**, and **automatic restore on unmount**.

## Overview

- Automatically sets the browser tab title when a component mounts.
- Can restore the original title when the component unmounts.
- Supports reusable title templates using `%s` placeholders.
- Prevents unnecessary DOM updates by optionally skipping identical titles.

### Signature

```ts
useDocumentTitle(
  title: string,
  options?: DocumentTitleOptions
);
```

### Options

| Option             | Type      | Default | Description                                                                          |
| ------------------ | --------- | ------- | ------------------------------------------------------------------------------------ |
| `restoreOnUnmount` | `boolean` | `true`  | Whether to restore the original title when the component unmounts.                   |
| `template`         | `string`  | —       | Template string using `%s` as placeholders for the title.                            |
| `skipIfSame`       | `boolean` | `true`  | Avoids updating if the formatted title is identical to the current `document.title`. |

## Examples

### Basic Usage

```tsx
import { useDocumentTitle } from '@tenedev/hooks';

export default function Home() {
  useDocumentTitle('Home');

  return <h1>Home</h1>;
}
```

### Using Title Templates

```tsx
useDocumentTitle('Dashboard', { template: '%s - MyApp' });
// Result: "Dashboard - MyApp"
```

```tsx
useDocumentTitle('Pricing', { template: '%s - %s - MyApp' });
// Result: "Pricing - Pricing - MyApp"
```

> All `%s` placeholders in the template are replaced.

### Restoring Original Title on Unmount

```tsx
function ModalPage() {
  useDocumentTitle('Editing Profile', { restoreOnUnmount: true });

  return <div>Editing...</div>;
}

// When unmounted → document.title restores to what it was before mounting this component
```

### Preventing Unnecessary Updates

```tsx
useDocumentTitle('Profile', { skipIfSame: true });
// No DOM writes if the formatted title matches the existing one
```

> Improves performance for components that re-render frequently.

### Disabling Restore Behavior

```tsx
useDocumentTitle('New Title', { restoreOnUnmount: false });
```

> The updated title persists even after unmount.

## Real-World Scenarios

### Page-Level Title in a Dashboard Layout

```tsx
function SettingsPage() {
  useDocumentTitle('Settings', { template: '%s · Control Panel' });

  return <Settings />;
}
```

### Dynamic Title Based on State

```tsx
function ChatRoom({ room }) {
  useDocumentTitle(`${room.unreadCount} unread`, {
    template: '%s — ChatApp',
  });

  return <Chat room={room} />;
}
```

### Loading States

```tsx
useDocumentTitle(loading ? 'Loading…' : 'Products');
```

## Summary

| Feature            | Purpose                                       |
| ------------------ | --------------------------------------------- |
| `template`         | Apply a consistent title pattern using `%s`.  |
| `restoreOnUnmount` | Restore previous title automatically.         |
| `skipIfSame`       | Avoid redundant DOM updates.                  |
| Auto-restore logic | Respects the latest `restoreOnUnmount` value. |
| Safe formatting    | Multiple `%s` replacements supported.         |
