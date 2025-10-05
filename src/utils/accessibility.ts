/**
 * Accessibility utility functions
 */

/**
 * Generate unique IDs for ARIA relationships
 */
export const generateId = (prefix: string = 'element'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Create ARIA label for interactive elements
 */
export const createAriaLabel = (
  baseLabel: string,
  context?: string,
  state?: string
): string => {
  let label = baseLabel;

  if (context) {
    label += `, ${context}`;
  }

  if (state) {
    label += `, ${state}`;
  }

  return label;
};

/**
 * Get appropriate ARIA role for interactive elements
 */
export const getInteractiveRole = (
  element: string,
  isClickable: boolean = false
): string => {
  const roleMap: Record<string, string> = {
    div: isClickable ? 'button' : 'region',
    span: isClickable ? 'button' : 'text',
    section: 'region',
    article: 'article',
    nav: 'navigation',
    header: 'banner',
    footer: 'contentinfo',
    main: 'main',
    aside: 'complementary',
  };

  return roleMap[element] || (isClickable ? 'button' : 'region');
};

/**
 * Create ARIA attributes object for components
 */
export interface AriaAttributes {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  'aria-atomic'?: boolean;
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean;
  'aria-selected'?: boolean;
  'aria-pressed'?: boolean;
  'aria-checked'?: boolean;
  'aria-disabled'?: boolean;
  role?: string;
  tabIndex?: number;
}

export const createAriaAttributes = (config: {
  label?: string;
  labelledBy?: string;
  describedBy?: string;
  expanded?: boolean;
  hidden?: boolean;
  live?: 'polite' | 'assertive' | 'off';
  atomic?: boolean;
  current?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean;
  selected?: boolean;
  pressed?: boolean;
  checked?: boolean;
  disabled?: boolean;
  role?: string;
  tabIndex?: number;
}): AriaAttributes => {
  const attributes: AriaAttributes = {};

  if (config.label) attributes['aria-label'] = config.label;
  if (config.labelledBy) attributes['aria-labelledby'] = config.labelledBy;
  if (config.describedBy) attributes['aria-describedby'] = config.describedBy;
  if (config.expanded !== undefined)
    attributes['aria-expanded'] = config.expanded;
  if (config.hidden !== undefined) attributes['aria-hidden'] = config.hidden;
  if (config.live) attributes['aria-live'] = config.live;
  if (config.atomic !== undefined) attributes['aria-atomic'] = config.atomic;
  if (config.current !== undefined) attributes['aria-current'] = config.current;
  if (config.selected !== undefined)
    attributes['aria-selected'] = config.selected;
  if (config.pressed !== undefined) attributes['aria-pressed'] = config.pressed;
  if (config.checked !== undefined) attributes['aria-checked'] = config.checked;
  if (config.disabled !== undefined)
    attributes['aria-disabled'] = config.disabled;
  if (config.role) attributes['role'] = config.role;
  if (config.tabIndex !== undefined) attributes['tabIndex'] = config.tabIndex;

  return attributes;
};

/**
 * Screen reader only CSS class utility
 */
export const srOnlyClass =
  'sr-only absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0';

/**
 * Focus visible utility for custom focus styles
 */
export const focusVisibleClass =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2';

/**
 * Skip link styles
 */
export const skipLinkClass = `
  absolute -top-10 left-4 z-50 px-4 py-2 bg-blue-600 text-white rounded-md
  transform -translate-y-full opacity-0 transition-all duration-200
  focus:top-4 focus:translate-y-0 focus:opacity-100
`;

/**
 * Validate color contrast ratio (simplified check)
 */
export const hasGoodContrast = (
  foreground: string,
  background: string
): boolean => {
  // This is a simplified check - in production, you'd want a more robust solution
  // For now, we'll assume our design system colors have good contrast
  const lightColors = ['white', '#ffffff', '#f8fafc', '#f1f5f9'];
  const darkColors = ['black', '#000000', '#1e293b', '#0f172a'];

  const isForegroundLight = lightColors.some(color =>
    foreground.toLowerCase().includes(color.toLowerCase())
  );
  const isBackgroundDark = darkColors.some(color =>
    background.toLowerCase().includes(color.toLowerCase())
  );

  const isForegroundDark = darkColors.some(color =>
    foreground.toLowerCase().includes(color.toLowerCase())
  );
  const isBackgroundLight = lightColors.some(color =>
    background.toLowerCase().includes(color.toLowerCase())
  );

  return (
    (isForegroundLight && isBackgroundDark) ||
    (isForegroundDark && isBackgroundLight)
  );
};

/**
 * Create semantic heading structure
 */
export const getSemanticHeadingLevel = (
  sectionIndex: number,
  subsectionIndex?: number
): 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' => {
  if (sectionIndex === 0) return 'h1'; // Hero section
  if (subsectionIndex === undefined) return 'h2'; // Main section headings
  if (subsectionIndex === 0) return 'h3'; // First subsection
  if (subsectionIndex === 1) return 'h4'; // Second subsection
  if (subsectionIndex === 2) return 'h5'; // Third subsection
  return 'h6'; // Deeper nesting
};

/**
 * Animation preferences for accessibility
 */
export const getAccessibleAnimationProps = (prefersReducedMotion: boolean) => ({
  initial: prefersReducedMotion ? {} : { opacity: 0, y: 20 },
  animate: prefersReducedMotion ? {} : { opacity: 1, y: 0 },
  transition: {
    duration: prefersReducedMotion ? 0.01 : 0.6,
    ease: prefersReducedMotion ? 'linear' : 'easeOut',
  },
});

/**
 * Keyboard event handlers
 */
export const handleKeyboardActivation = (
  event: React.KeyboardEvent | KeyboardEvent,
  callback: () => void,
  keys: string[] = ['Enter', ' ']
) => {
  if (keys.includes(event.key)) {
    event.preventDefault();
    callback();
  }
};

/**
 * Create landmark regions for screen readers
 */
export const createLandmarkProps = (
  landmark:
    | 'banner'
    | 'navigation'
    | 'main'
    | 'complementary'
    | 'contentinfo'
    | 'region',
  label?: string
) => ({
  role: landmark,
  ...(label && { 'aria-label': label }),
});
