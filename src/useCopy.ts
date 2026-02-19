import { useCallback, useState } from 'react';

/**
 * Return type for {@link useCopy}.
 */
export interface CopyReturn {
  /**
   * Indicates whether text has been successfully copied.
   */
  copied: boolean;

  /**
   * The last successfully copied text.
   */
  copiedText: string | null;

  /**
   * Copies the provided text to the user's clipboard.
   *
   * @returns A promise that resolves:
   * - `true` if the text was successfully copied.
   * - `false` if copying failed or text was empty.
   *
   * @example
   * ```ts
   * const success = await copy("Hello World");
   * ```
   */
  copy: (
    /**
     * The string to copy to the clipboard, must be non-empty for a successful copy operation.
     */
    text: string,
  ) => Promise<boolean>;
}

/**
 * React hook for copying text to the user's clipboard using the {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/clipboard | Clipboard API}.
 *
 * @remarks
 * - Returns `false` if text is empty.
 * - Returns `false` if Clipboard API is not supported.
 * - Returns `false` if copying fails.
 * - Sets `copied` to `true` and `copiedText` to the copied text on success.
 *
 * @returns An object containing:
 * - `copied` - Whether any text has been successfully copied
 * - `copiedText` - The last successfully copied text
 * - `copy` - Async function to copy provided text
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/clipboard | Clipboard API}
 *
 * @example
 * ```tsx
 * const { copied, copiedText, copy } = useCopy();
 *
 * <button onClick={() => copy("Hello World")}>
 *   {copied ? "Copied!" : "Copy"}
 * </button>
 * ```
 *
 * @since 0.3.0
 */
export function useCopy(): CopyReturn {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (!text) return false;

    try {
      if (!navigator.clipboard) throw new Error('Clipboard API not supported');

      await navigator.clipboard.writeText(text);

      setCopiedText(text);

      return true;
    } catch (err) {
      console.error('Failed to copy text: ', err);

      setCopiedText(null);

      return false;
    }
  }, []);

  return { copied: !!copiedText, copiedText, copy };
}
