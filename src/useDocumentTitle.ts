import { useCallback, useEffect, useRef } from 'react';

/** Options to configure the behavior of {@link useDocumentTitle} */
export interface UseDocumentTitleOptions {
  /**
   * Whether to restore the original document title when the component unmounts
   *
   * @default true
   */
  restoreOnUnmount?: boolean;
  /**
   * Optional template for the title, Use `%s` as a placeholder for the title.
   *
   * Multiple occurrences of `%s` in the template will all be replaced by the `title`.
   *
   * @example
   * ```ts
   * template: '%s - MyApp'
   * ```
   *
   * @example
   * ```ts
   * template: '%s - %s - MyApp'
   * ```
   */
  template?: string;
  /**
   * If true, the hook will skip updating the title if the new title is identical to the current `document.title`.
   *
   * @default true
   */
  skipIfSame?: boolean;
}

/**
 * Updates the `document.title` for the current page.
 *
 * This hook automatically updates the document title when mounted, and optionally restores the original title when unmounted.
 *
 *
 * @remarks
 * This hook uses React hooks internally:
 * - {@link https://react.dev/reference/react/useCallback | useCallback} - to memoize formatting and setting functions.
 * - {@link https://react.dev/reference/react/useEffect | useEffect} - to perform the side-effects on mount/unmount.
 * - {@link https://react.dev/reference/react/useRef | useRef} - to store the original title.
 *
 *
 * @example
 * ```tsx
 * import { useDocumentTitle } from '@tenedev/hooks';
 *
 * export function Dashboard() {
 *  useDocumentTitle('Dashboard', { template: '%s - MyApp' });
 *
 *  return <h1>Dashboard</h1>;
 * };
 * ```
 *
 * @since 0.2.0
 */
export function useDocumentTitle(
  /** The new title to set */
  title: string,
  /** Optional configuration */
  { restoreOnUnmount = true, template, skipIfSame = true }: UseDocumentTitleOptions = {},
): void {
  const originalTitleRef = useRef(document.title || '');

  const formatTitle = useCallback(
    (t: string) => (template ? template.replace(/%s/g, t) : t),
    [template],
  );

  const setTitle = useCallback(
    (t: string) => {
      const formatted = formatTitle(t);

      if (skipIfSame && document.title == formatted) return;

      document.title = formatted;
    },
    [formatTitle, skipIfSame],
  );

  useEffect(() => {
    originalTitleRef.current = document.title;
  }, []);

  useEffect(() => {
    setTitle(title);

    return () => {
      if (restoreOnUnmount) {
        document.title = originalTitleRef.current;
      }
    };
  }, [restoreOnUnmount, setTitle, title]);
}
