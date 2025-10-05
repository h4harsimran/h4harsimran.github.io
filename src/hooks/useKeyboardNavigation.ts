import { useEffect, useCallback, useRef } from 'react';

interface KeyboardNavigationOptions {
  enableArrowKeys?: boolean;
  enableTabTrapping?: boolean;
  enableEscapeKey?: boolean;
  onEscape?: () => void;
  focusableSelectors?: string[];
}

/**
 * Hook for managing keyboard navigation within a component
 */
export const useKeyboardNavigation = (
  options: KeyboardNavigationOptions = {}
) => {
  const {
    enableArrowKeys = true,
    enableTabTrapping = false,
    enableEscapeKey = true,
    onEscape,
    focusableSelectors = [
      'button',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[role="button"]',
      '[role="link"]',
    ],
  } = options;

  const containerRef = useRef<HTMLElement>(null);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];

    const selector = focusableSelectors.join(', ');
    return Array.from(
      containerRef.current.querySelectorAll(selector)
    ) as HTMLElement[];
  }, [focusableSelectors]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const focusableElements = getFocusableElements();
      const currentIndex = focusableElements.indexOf(
        document.activeElement as HTMLElement
      );

      switch (event.key) {
        case 'Escape':
          if (enableEscapeKey && onEscape) {
            event.preventDefault();
            onEscape();
          }
          break;

        case 'ArrowDown':
        case 'ArrowRight':
          if (enableArrowKeys && focusableElements.length > 0) {
            event.preventDefault();
            const nextIndex = (currentIndex + 1) % focusableElements.length;
            focusableElements[nextIndex]?.focus();
          }
          break;

        case 'ArrowUp':
        case 'ArrowLeft':
          if (enableArrowKeys && focusableElements.length > 0) {
            event.preventDefault();
            const prevIndex =
              currentIndex <= 0
                ? focusableElements.length - 1
                : currentIndex - 1;
            focusableElements[prevIndex]?.focus();
          }
          break;

        case 'Tab':
          if (enableTabTrapping && focusableElements.length > 0) {
            if (event.shiftKey) {
              // Shift + Tab (backward)
              if (currentIndex <= 0) {
                event.preventDefault();
                focusableElements[focusableElements.length - 1]?.focus();
              }
            } else {
              // Tab (forward)
              if (currentIndex >= focusableElements.length - 1) {
                event.preventDefault();
                focusableElements[0]?.focus();
              }
            }
          }
          break;

        case 'Home':
          if (enableArrowKeys && focusableElements.length > 0) {
            event.preventDefault();
            focusableElements[0]?.focus();
          }
          break;

        case 'End':
          if (enableArrowKeys && focusableElements.length > 0) {
            event.preventDefault();
            focusableElements[focusableElements.length - 1]?.focus();
          }
          break;
      }
    },
    [
      enableArrowKeys,
      enableTabTrapping,
      enableEscapeKey,
      onEscape,
      getFocusableElements,
    ]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    containerRef,
    getFocusableElements,
  };
};

/**
 * Hook for managing focus within a modal or dialog
 */
export const useFocusTrap = (isActive: boolean = true) => {
  const { containerRef, getFocusableElements } = useKeyboardNavigation({
    enableTabTrapping: isActive,
    enableArrowKeys: false,
  });

  const focusFirstElement = useCallback(() => {
    if (!isActive) return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }, [isActive, getFocusableElements]);

  const focusLastElement = useCallback(() => {
    if (!isActive) return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus();
    }
  }, [isActive, getFocusableElements]);

  return {
    containerRef,
    focusFirstElement,
    focusLastElement,
    getFocusableElements,
  };
};
