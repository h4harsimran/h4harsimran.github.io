import React, { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary specifically for animation components
 * Provides graceful fallbacks when animations fail
 */
export class AnimationErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // Log the error for debugging
    console.warn('Animation component error:', error, errorInfo);

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback - render children without animations
      return <div className="animation-fallback">{this.props.children}</div>;
    }

    return this.props.children;
  }
}

/**
 * Higher-order component to wrap components with animation error boundary
 */
export const withAnimationErrorBoundary = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode
) => {
  const WithAnimationErrorBoundary = (props: P) => (
    <AnimationErrorBoundary fallback={fallback}>
      <WrappedComponent {...props} />
    </AnimationErrorBoundary>
  );

  WithAnimationErrorBoundary.displayName = `withAnimationErrorBoundary(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return WithAnimationErrorBoundary;
};
