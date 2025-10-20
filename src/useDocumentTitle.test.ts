import { renderHook } from '@testing-library/react-hooks';
import { useDocumentTitle } from './useDocumentTitle';

const originalTitle = document.title;

afterEach(() => {
  document.title = originalTitle;
});

it('sets the document title on mount', () => {
  renderHook(() => useDocumentTitle('My title'));
  expect(document.title).toBe('My title');
});

it('applies template if provided', () => {
  renderHook(() => useDocumentTitle('Dashboard', { template: '%s - MyApp' }));
  expect(document.title).toBe('Dashboard - MyApp');
});

describe('skipIfSame', () => {
  it('skips updating if title is the same and skipIfSame is true', () => {
    let title = 'MyApp';

    const setSpy = jest.fn((val: string) => {
      title = val;
    });

    Object.defineProperty(document, 'title', {
      configurable: true,
      get: () => title,
      set: setSpy,
    });

    renderHook(() => useDocumentTitle('MyApp'));
    expect(document.title).toBe('MyApp');
    expect(setSpy).not.toHaveBeenCalled();
  });

  it('updates even if same when skipIfSame is false', () => {
    let title = 'MyApp';

    const setSpy = jest.fn((val: string) => {
      title = val;
    });

    Object.defineProperty(document, 'title', {
      configurable: true,
      get: () => title,
      set: setSpy,
    });

    renderHook(() => useDocumentTitle('MyApp', { skipIfSame: false }));
    expect(document.title).toBe('MyApp');
    expect(setSpy).toHaveBeenCalled();
  });
});

describe('restoreOnUnmount ', () => {
  it('restores original title on unmount if restoreOnUnmount is true', () => {
    const { unmount } = renderHook(() => useDocumentTitle('App'));
    expect(document.title).toBe('App');
    unmount();
    expect(document.title).not.toBe('App');
    expect(document.title).toBe(originalTitle);
  });

  it('does not restore original title on unmount if restoreOnUnmount is false', () => {
    const { unmount } = renderHook(() =>
      useDocumentTitle('App', {
        restoreOnUnmount: false,
      }),
    );

    expect(document.title).toBe('App');
    unmount();
    expect(document.title).toBe('App');
    expect(document.title).not.toBe(originalTitle);
  });
});
