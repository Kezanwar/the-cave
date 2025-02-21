import { errorHandler } from '@app/lib/axios';
import store from '@app/store';
import { useMemo, useState } from 'react';
import { ObjectSchema, ValidationError, AnyObject } from 'yup';

// Define the shape of the toast configuration
interface ToastConfig {
  title?: string;
  autoHide?: boolean;
}

// Define the shape of our validation hook's arguments
export interface UseValidationProps<T extends AnyObject> {
  schema: ObjectSchema<T>; // Yup object schema explicitly typed to the form
  showToast?: boolean; // Whether to show toast notifications for errors
  toastConfig?: ToastConfig; // Optional toast configuration
}

// Define the shape of the validation errors state
type ValidationErrors<T extends AnyObject> = {
  [K in keyof T]?: string;
} & { apiError: string };

/**
 * Creates a default state object based on the provided Yup schema.
 * This ensures all fields start with an empty string.
 */
function makeDefaultState<T extends AnyObject>(
  schema: ObjectSchema<T>
): ValidationErrors<T> {
  const state = { apiError: '' } as ValidationErrors<T>;
  Object.keys(schema.fields).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    state[key as keyof T] = '';
  });
  return state;
}

/**
 * A reusable validation hook using Yup.
 * Provides validation state, methods to validate and clear errors, and an API error field.
 */
const useValidation = <T extends AnyObject>({
  schema,
  showToast = false,
  toastConfig = {
    title: '',
    autoHide: false
  }
}: UseValidationProps<T>) => {
  // Create default error state based on schema
  const defaults = useMemo(() => makeDefaultState(schema), [schema]);

  // State to store validation errors
  const [errors, setErrors] = useState<ValidationErrors<T>>(defaults);

  /**
   * Validates the given form object against the schema.
   * If errors are found, they are stored in state.
   * @returns boolean - true if valid, false if errors are found
   */
  const validate = async (form: T): Promise<boolean> => {
    clear(); // Clear previous errors
    try {
      await schema.validate(form, { abortEarly: false });
      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrors((prev) => {
          const state = { ...prev };
          error.inner.forEach((e) => {
            if (e.path) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore

              state[e.path as keyof T] = state[e.path as keyof T]
                ? `${state[e.path]},\n${e.message}`
                : e.message;
            }
          });

          //   // Show toast notifications if enabled
          //   if (toastErrors) {
          //     const messages = Object.entries(state)
          //       .filter(([_, value]) => value !== '')
          //       .map(([field, message]) => `${field}: ${message}`);

          //     store.toast.enqueue({
          //       autoHide: toastConfig.autoHide,
          //       message: messages,
          //       title: toastConfig.title,
          //       type: 'error'
          //     });
          //   }
          return state;
        });
      }
      return false;
    }
  };

  /**
   * Clears errors for specific fields or all fields if no arguments are provided.
   */
  const clear = (...fields: (keyof T)[]) => {
    if (fields.length) {
      setErrors((prev) => {
        const state = { ...prev };
        fields.forEach((field) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          state[field as keyof T] = '';
        });
        return state;
      });
    } else {
      setErrors(defaults);
    }
  };

  /**
   * Sets a custom API error message.
   */
  const setApiError = (error: unknown) => {
    errorHandler(error, (obj) => {
      setErrors((prev) => ({ ...prev, apiError: obj.message }));
    });
  };

  /**
   * Clears the API error message.
   */
  const clearApiError = () => clear('apiError');

  return {
    validationErrors: errors,
    validate,
    clear,
    setApiError,
    clearApiError
  };
};

export default useValidation;
