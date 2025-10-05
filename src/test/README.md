# Testing Suite Documentation

This directory contains a comprehensive testing suite for the personal portfolio website, implementing unit tests, integration tests, accessibility tests, and performance tests as required by the project specifications.

## Test Structure

### Unit Tests

- **Location**: `src/components/**/__tests__/*.test.tsx`
- **Purpose**: Test individual components in isolation
- **Tools**: Vitest, React Testing Library, Jest-DOM
- **Coverage**: Components, hooks, utilities

### Integration Tests

- **Location**: `src/components/**/__tests__/*.integration.test.tsx`
- **Purpose**: Test component interactions and scroll animations
- **Tools**: Vitest, React Testing Library, GSAP mocks
- **Coverage**: Animation sequences, component integration

### Accessibility Tests

- **Location**: `src/test/accessibility.test.tsx`
- **Purpose**: Ensure WCAG compliance and screen reader compatibility
- **Tools**: Jest-Axe, React Testing Library
- **Coverage**: ARIA attributes, keyboard navigation, color contrast

### End-to-End Tests

- **Location**: `src/test/e2e/*.spec.ts`
- **Purpose**: Test complete user workflows
- **Tools**: Playwright, Axe-Core
- **Coverage**: Navigation, responsive design, cross-browser compatibility

### Performance Tests

- **Location**: `src/test/e2e/performance.spec.ts`
- **Purpose**: Validate Core Web Vitals and performance metrics
- **Tools**: Playwright, Lighthouse
- **Coverage**: Load times, animation performance, memory usage

## Running Tests

### Unit Tests

```bash
npm run test                    # Run all unit tests once
npm run test:watch             # Run tests in watch mode
npm run test:ui                # Run tests with UI
npm run test:coverage          # Run tests with coverage report
```

### End-to-End Tests

```bash
npm run test:e2e               # Run all e2e tests
npm run test:e2e:ui            # Run e2e tests with UI
npm run test:accessibility     # Run accessibility tests only
npm run test:performance       # Run performance tests only
```

### All Tests

```bash
npm run test:all               # Run both unit and e2e tests
```

## Test Configuration

### Vitest Configuration

- **File**: `vitest.config.ts`
- **Environment**: jsdom
- **Setup**: `src/test/setup.ts`
- **Coverage**: Text, JSON, HTML reports

### Playwright Configuration

- **File**: `playwright.config.ts`
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Base URL**: http://localhost:4173 (preview server)

## Mocking Strategy

### GSAP Animations

- Complete mock implementation in `src/test/setup.ts`
- Provides timeline, context, and animation methods
- Prevents animation-related test failures

### Browser APIs

- `matchMedia`: Mocked for responsive design tests
- `IntersectionObserver`: Mocked for scroll-triggered animations
- `ResizeObserver`: Mocked for responsive components

### External Libraries

- `CountUp.js`: Mocked for counter animations
- `react-intersection-observer`: Mocked for viewport detection

## Test Utilities

### Custom Render Function

- **Location**: `src/test/utils.tsx`
- **Purpose**: Provides consistent test environment with providers
- **Includes**: HelmetProvider for SEO components

### Mock Data

- **Location**: `src/test/utils.tsx`
- **Purpose**: Consistent test data across test files
- **Includes**: Personal data, experience data, skills data, metrics data

## Accessibility Testing

### Automated Testing

- Uses `jest-axe` for automated accessibility rule checking
- Tests WCAG 2.1 AA compliance
- Validates ARIA attributes and semantic HTML

### Manual Testing Scenarios

- Keyboard navigation through all interactive elements
- Screen reader compatibility with proper announcements
- Focus management and visual indicators
- Color contrast validation

## Performance Testing

### Lighthouse Audits

- Performance score: ≥85
- Accessibility score: ≥95
- Best practices score: ≥90
- SEO score: ≥90

### Core Web Vitals

- Largest Contentful Paint (LCP): <2.5s
- First Input Delay (FID): <100ms
- Cumulative Layout Shift (CLS): <0.1

### Animation Performance

- Memory usage monitoring during animations
- Frame rate consistency during scroll animations
- Reduced motion preference support

## Test Coverage Goals

### Component Coverage

- All major components have unit tests
- Critical user paths have integration tests
- Animation components have performance tests

### Accessibility Coverage

- All interactive elements tested for keyboard navigation
- All content tested for screen reader compatibility
- All color combinations tested for contrast

### Performance Coverage

- All sections tested for load performance
- All animations tested for smooth performance
- All responsive breakpoints tested

## Continuous Integration

### Pre-commit Hooks

- Lint and format code
- Run unit tests
- Check test coverage

### CI Pipeline

- Run full test suite on pull requests
- Generate coverage reports
- Run accessibility audits
- Validate performance benchmarks

## Troubleshooting

### Common Issues

1. **GSAP Animation Errors**
   - Ensure GSAP is properly mocked in test setup
   - Check that animation cleanup is handled

2. **Intersection Observer Errors**
   - Verify IntersectionObserver mock is configured
   - Check that useInView hook is mocked correctly

3. **matchMedia Errors**
   - Ensure matchMedia is mocked globally
   - Verify responsive design tests use proper viewport sizes

4. **Async Test Failures**
   - Use proper async/await patterns
   - Wait for animations and state updates
   - Use waitFor for dynamic content

### Debug Commands

```bash
npm run test:ui                # Visual test debugging
npm run test -- --reporter=verbose  # Detailed test output
npm run test:coverage          # Coverage analysis
```

## Best Practices

### Test Writing

- Write descriptive test names
- Test behavior, not implementation
- Use proper async patterns
- Mock external dependencies

### Accessibility Testing

- Test with keyboard only
- Test with screen readers
- Validate ARIA attributes
- Check color contrast

### Performance Testing

- Test on slow networks
- Test on low-end devices
- Monitor memory usage
- Validate Core Web Vitals

### Maintenance

- Update tests when components change
- Keep mocks up to date
- Review test coverage regularly
- Update accessibility standards as needed
