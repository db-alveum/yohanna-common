import { ZodError, ZodIssue } from "zod";

export interface ValidationError {
  [key: string]: string | ValidationError;
}
// validation helpers

// Function to transform ZodError into ValidationError interface
export const zodErrorToValidationError = (error: ZodError): ValidationError => {
  const validationError: ValidationError = {};

  error.issues.forEach((issue: ZodIssue) => {
    const path = issue.path.join("."); // Join the path array to form a string key
    setNestedValue(validationError, path, issue.message);
  });

  return validationError;
};

// Helper function to set nested values in the ValidationError object
const setNestedValue = (obj: ValidationError, path: string, value: string) => {
  const keys = path.split(".");
  let current = obj;

  keys.forEach((key, index) => {
    if (!current[key]) {
      current[key] = index === keys.length - 1 ? value : {};
    }
    if (index < keys.length - 1) {
      current = current[key] as ValidationError;
    }
  });
};
