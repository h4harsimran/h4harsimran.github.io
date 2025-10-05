import type {
  ValidationRule,
  ValidationError,
  ValidationResult,
  ValidationSchema,
  FieldValidator,
} from '../types/validation';

/**
 * Validates a single field against its validation rules
 */
export const validateField: FieldValidator = (
  value: string,
  rules: ValidationRule[]
): ValidationError | null => {
  for (const rule of rules) {
    // Required validation
    if (rule.required && (!value || value.trim() === '')) {
      return {
        field: 'field',
        message: rule.message,
      };
    }

    // Skip other validations if field is empty and not required
    if (!value || value.trim() === '') {
      continue;
    }

    // Min length validation
    if (rule.minLength && value.length < rule.minLength) {
      return {
        field: 'field',
        message: rule.message,
      };
    }

    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      return {
        field: 'field',
        message: rule.message,
      };
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return {
        field: 'field',
        message: rule.message,
      };
    }

    // Custom validation
    if (rule.custom && !rule.custom(value)) {
      return {
        field: 'field',
        message: rule.message,
      };
    }
  }

  return null;
};

/**
 * Validates an entire form against a validation schema
 */
export const validateForm = (
  formData: Record<string, string>,
  schema: ValidationSchema
): ValidationResult => {
  const errors: ValidationError[] = [];

  for (const [fieldName, rules] of Object.entries(schema)) {
    const value = formData[fieldName] || '';
    const error = validateField(value, rules);

    if (error) {
      errors.push({
        field: fieldName,
        message: error.message,
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validates a single form field
 */
export const validateSingleField = (
  fieldName: string,
  value: string,
  schema: ValidationSchema
): ValidationError | null => {
  const rules = schema[fieldName];
  if (!rules) return null;

  const error = validateField(value, rules);
  return error ? { field: fieldName, message: error.message } : null;
};

/**
 * Common validation patterns
 */
export const validationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+]?[1-9][\d]{0,15}$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  alphabetic: /^[a-zA-Z\s]+$/,
};

/**
 * Sanitizes input by removing potentially harmful characters
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

/**
 * Checks if a string is a valid email
 */
export const isValidEmail = (email: string): boolean => {
  return validationPatterns.email.test(email);
};

/**
 * Checks if a string is a valid URL
 */
export const isValidUrl = (url: string): boolean => {
  return validationPatterns.url.test(url);
};
