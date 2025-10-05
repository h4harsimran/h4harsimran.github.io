// Form validation types and schemas

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (_value: string) => boolean;
  message: string;
}

export interface ValidationSchema {
  [key: string]: ValidationRule[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Contact form validation schema
export const contactFormSchema: ValidationSchema = {
  name: [
    {
      required: true,
      message: 'Name is required',
    },
    {
      minLength: 2,
      message: 'Name must be at least 2 characters long',
    },
    {
      maxLength: 50,
      message: 'Name must be less than 50 characters',
    },
  ],
  email: [
    {
      required: true,
      message: 'Email is required',
    },
    {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address',
    },
  ],
  subject: [
    {
      required: true,
      message: 'Subject is required',
    },
    {
      minLength: 5,
      message: 'Subject must be at least 5 characters long',
    },
    {
      maxLength: 100,
      message: 'Subject must be less than 100 characters',
    },
  ],
  message: [
    {
      required: true,
      message: 'Message is required',
    },
    {
      minLength: 10,
      message: 'Message must be at least 10 characters long',
    },
    {
      maxLength: 1000,
      message: 'Message must be less than 1000 characters',
    },
  ],
};

// Form field state interface
export interface FormFieldState {
  value: string;
  error?: string;
  touched: boolean;
  isValid: boolean;
}

export interface FormState {
  [key: string]: FormFieldState;
}

// Validation utility types
export type ValidatorFunction = (_value: string) => ValidationResult;
export type FieldValidator = (
  _value: string,
  _rules: ValidationRule[]
) => ValidationError | null;
