import { useEffect, useRef, useCallback } from 'react';

interface FocusManagementOptions {
  restoreFocus?: boolean;
  autoFocus?: boolean;
  focusDelay?: number;
}

/**
 * Hook for managing focus state and restoration
 */
export const useFocusManagement = (options: FocusManagementOptions = {}) => {
  const { restoreFocus = true, autoFocus = false, focusDelay = 0 } = options;

  const elementRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Store the previously focused element
  const storePreviousFocus = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
  }, []);

  // Restore focus to the previously focused element
  const restorePreviousFocus = useCallback(() => {
    if (restoreFocus && previousFocusRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        previousFocusRef.current?.focus();
      }, focusDelay);
    }
  }, [restoreFocus, focusDelay]);

  // Focus the current element
  const focusElement = useCallback(() => {
    if (elementRef.current) {
      setTimeout(() => {
        elementRef.current?.focus();
      }, focusDelay);
    }
  }, [focusDelay]);

  // Auto-focus on mount if enabled
  useEffect(() => {
    if (autoFocus) {
      storePreviousFocus();
      focusElement();
    }

    return () => {
      if (autoFocus) {
        restorePreviousFocus();
      }
    };
  }, [autoFocus, storePreviousFocus, focusElement, restorePreviousFocus]);

  return {
    elementRef,
    storePreviousFocus,
    restorePreviousFocus,
    focusElement,
  };
};

/**
 * Hook for managing focus within sections during navigation
 */
export const useSectionFocus = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const focusSection = useCallback((sectionId?: string) => {
    let targetElement: HTMLElement | null = null;

    if (sectionId) {
      targetElement = document.getElementById(sectionId);
    } else if (sectionRef.current) {
      targetElement = sectionRef.current;
    }

    if (targetElement) {
      // Make the section focusable temporarily if it's not already
      const originalTabIndex = targetElement.getAttribute('tabindex');
      if (!originalTabIndex) {
        targetElement.setAttribute('tabindex', '-1');
      }

      // Focus the section
      targetElement.focus();

      // Remove temporary tabindex after a short delay
      if (!originalTabIndex) {
        setTimeout(() => {
          targetElement?.removeAttribute('tabindex');
        }, 100);
      }

      // Announce to screen readers
      const announcement =
        targetElement.getAttribute('aria-label') ||
        targetElement.querySelector('h1, h2, h3, h4, h5, h6')?.textContent ||
        'Section';

      announceToScreenReader(`Navigated to ${announcement}`);
    }
  }, []);

  return {
    sectionRef,
    focusSection,
  };
};

/**
 * Utility function to announce messages to screen readers
 */
export const announceToScreenReader = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.setAttribute('class', 'sr-only');
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove the announcement after it's been read
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Hook for managing skip links
 */
export const useSkipLinks = () => {
  const skipToContent = useCallback(() => {
    const mainContent =
      document.querySelector('main') || document.querySelector('[role="main"]');
    if (mainContent) {
      (mainContent as HTMLElement).focus();
      announceToScreenReader('Skipped to main content');
    }
  }, []);

  const skipToNavigation = useCallback(() => {
    const navigation =
      document.querySelector('nav') ||
      document.querySelector('[role="navigation"]');
    if (navigation) {
      (navigation as HTMLElement).focus();
      announceToScreenReader('Skipped to navigation');
    }
  }, []);

  return {
    skipToContent,
    skipToNavigation,
  };
};
