import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useReducedMotion, useAnimationConfig } from '../useReducedMotion';

describe('useReducedMotion', () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;
  let mockMediaQuery: MediaQueryList;

  beforeEach(() => {
    mockMediaQuery = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    mockMatchMedia = vi.fn().mockReturnValue(mockMediaQuery);

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns false when user does not prefer reduced motion', () => {
    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);
    expect(mockMatchMedia).toHaveBeenCalledWith(
      '(prefers-reduced-motion: reduce)'
    );
  });

  it('returns true when user prefers reduced motion', () => {
    mockMediaQuery.matches = true;

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
  });

  it('updates when media query changes', () => {
    let changeHandler: (event: MediaQueryListEvent) => void;
    const mockMediaQuery = {
      matches: false,
      addEventListener: vi.fn((event, handler) => {
        if (event === 'change') {
          changeHandler = handler;
        }
      }),
      removeEventListener: vi.fn(),
    };
    mockMatchMedia.mockReturnValue(mockMediaQuery);

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);

    // Simulate media query change
    act(() => {
      changeHandler({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe(true);
  });

  it('cleans up event listener on unmount', () => {
    const mockMediaQuery = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    mockMatchMedia.mockReturnValue(mockMediaQuery);

    const { unmount } = renderHook(() => useReducedMotion());

    unmount();

    expect(mockMediaQuery.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );
  });

  it('handles SSR environment gracefully', () => {
    // Mock window as undefined
    const originalWindow = global.window;
    // @ts-expect-error - Intentionally deleting window for SSR test
    delete global.window;

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);

    // Restore window
    global.window = originalWindow;
  });
});

describe('useAnimationConfig', () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockMatchMedia = vi.fn();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns full animation config when reduced motion is disabled', () => {
    const mockMediaQuery = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    mockMatchMedia.mockReturnValue(mockMediaQuery);

    const { result } = renderHook(() => useAnimationConfig());

    expect(result.current).toEqual({
      prefersReducedMotion: false,
      duration: 0.6,
      ease: 'power2.out',
      enableComplexAnimations: true,
      stagger: 0.1,
    });
  });

  it('returns reduced animation config when reduced motion is enabled', () => {
    const mockMediaQuery = {
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    mockMatchMedia.mockReturnValue(mockMediaQuery);

    const { result } = renderHook(() => useAnimationConfig());

    expect(result.current).toEqual({
      prefersReducedMotion: true,
      duration: 0.1,
      ease: 'linear',
      enableComplexAnimations: false,
      stagger: 0.05,
    });
  });

  it('updates config when reduced motion preference changes', () => {
    let changeHandler: (event: MediaQueryListEvent) => void;
    const mockMediaQuery = {
      matches: false,
      addEventListener: vi.fn((event, handler) => {
        if (event === 'change') {
          changeHandler = handler;
        }
      }),
      removeEventListener: vi.fn(),
    };
    mockMatchMedia.mockReturnValue(mockMediaQuery);

    const { result } = renderHook(() => useAnimationConfig());

    expect(result.current.enableComplexAnimations).toBe(true);

    // Simulate preference change
    act(() => {
      changeHandler({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current.enableComplexAnimations).toBe(false);
    expect(result.current.duration).toBe(0.1);
    expect(result.current.ease).toBe('linear');
  });
});
