# Animation Performance Optimizations

This document outlines the animation performance optimizations and reduced motion support implemented in the portfolio website.

## Features Implemented

### 1. Reduced Motion Support (`useReducedMotion` hook)

- Detects user's `prefers-reduced-motion` preference
- Automatically disables complex animations for users who prefer reduced motion
- Provides graceful fallbacks with minimal or no animation

### 2. Animation Configuration (`useAnimationConfig` hook)

- Provides centralized animation settings based on user preferences
- Adjusts duration, easing, and complexity based on reduced motion preference
- Enables/disables complex animations system-wide

### 3. GSAP Performance Optimizations (`useGSAPCleanup` hook)

- Automatic cleanup of GSAP animations on component unmount
- Prevents memory leaks and performance issues
- Registers animations for proper lifecycle management
- Performance monitoring capabilities

### 4. Safe Animation Helpers (`animationHelpers.ts`)

- `createSafeAnimation()`: Creates animations that respect reduced motion preferences
- `createSafeTimeline()`: Creates timelines with accessibility support
- `cleanupGSAPAnimations()`: Utility for cleaning up animations
- Error handling for animation failures

### 5. Error Boundaries (`AnimationErrorBoundary`)

- Wraps animation components to prevent crashes
- Provides fallback UI when animations fail
- Graceful degradation for animation errors

### 6. Motion Wrapper (`MotionWrapper`)

- Framer Motion wrapper that respects reduced motion preferences
- Automatic fallback to static content for reduced motion users
- Pre-configured accessible animation variants

### 7. CSS Optimizations

- `@media (prefers-reduced-motion: reduce)` support
- Hardware acceleration classes for better performance
- Will-change properties for optimized rendering
- Reduced motion fallback styles

## Usage Examples

### Using the Reduced Motion Hook

```typescript
const { prefersReducedMotion, enableComplexAnimations } = useAnimationConfig();

// Conditionally apply animations
if (enableComplexAnimations) {
  // Complex animation
} else {
  // Simple or no animation
}
```

### Using GSAP Cleanup

```typescript
const { registerAnimation, cleanup } = useGSAPCleanup('.my-animation');

useEffect(() => {
  const animation = gsap.to('.element', { x: 100 });
  registerAnimation(animation);

  return cleanup; // Automatic cleanup
}, []);
```

### Using Motion Wrapper

```typescript
<MotionWrapper
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  fallback={<div>Static content</div>}
>
  <AnimatedContent />
</MotionWrapper>
```

### Using Error Boundaries

```typescript
<AnimationErrorBoundary fallback={<StaticFallback />}>
  <ComplexAnimatedComponent />
</AnimationErrorBoundary>
```

## Performance Benefits

1. **Reduced CPU Usage**: Animations are disabled or simplified for users who prefer reduced motion
2. **Better Accessibility**: Respects user preferences and accessibility needs
3. **Memory Management**: Proper cleanup prevents memory leaks
4. **Error Resilience**: Graceful fallbacks prevent crashes
5. **Hardware Acceleration**: Optimized CSS for better rendering performance

## Browser Support

- Modern browsers with `prefers-reduced-motion` support
- Graceful degradation for older browsers
- Progressive enhancement approach

## Testing

To test reduced motion support:

1. Enable "Reduce motion" in your OS accessibility settings
2. Or use browser dev tools to simulate the preference
3. Verify that animations are simplified or disabled
4. Check that content remains accessible and functional
