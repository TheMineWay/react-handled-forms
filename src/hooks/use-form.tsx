import { useState, useTransition } from "react";
import { IUseForm } from "../types/hooks/use-form/use-form.interface";
import { FormValuesModel } from "../types/models/form-values-model.type";
import { useLoading } from "./internal/use-loading";
import { FormSubmitOptions } from "../types/hooks/use-form/form-submit-options.type";
import { merge } from "lodash";
import { UseFormOptions } from "../types/hooks/use-form/use-form-options.type";
import { ObjectSchema, ValidationError } from "yup";

export function useForm<T extends FormValuesModel>(
  options?: UseFormOptions<T>
): IUseForm<T> {
  const [, startTransition] = useTransition();

  const { isLoading, startLoading, stopLoading } = useLoading();

  const [formState, setFormState] = useState<Partial<T>>(
    options?.defaultValues ?? {}
  );
  const [validationErrors, setValidationErrors] = useState<Record<
    keyof T,
    { key: string; values?: Record<string, string | number> }[]
  > | null>(null);

  const setValue = <K extends keyof T>(name: K, value?: T[K]) => {
    setFormState({ ...formState, [name]: value });
  };
  const getValue = <K extends keyof T>(name: keyof T) =>
    formState[name] as T[K];

  const clear = () => {
    startTransition(() => {
      setFormState({});
      setValidationErrors(null);
    });
  };

  const submit = async (submitOptions?: FormSubmitOptions<T>) => {
    startLoading();
    const values = merge(formState, submitOptions?.replace);
    try {
      // Validate schema
      if (options?.objectSchema && !submitOptions?.disableValidation) {
        const errors = await validateValues(values, options.objectSchema);

        if (errors) {
          // Validation errors occurred
          throw new Error("Validation exception");
        }
      } else setValidationErrors(null);
    } catch (e) {
      // Error
    } finally {
      if (options?.onSubmit) {
        try {
          await options.onSubmit(values as T);
        } catch (e) {
          // Error in the external function
          if (options.onSubmitError) await options.onSubmitError(e);
        }
      }
      stopLoading();
    }
  };

  const validateValues = async (
    values: Partial<T>,
    objectSchema: ObjectSchema<T>
  ) => {
    try {
      await objectSchema.validate(values, {
        strict: true,
        abortEarly: false,
      });
      setValidationErrors(null);
    } catch (validationError) {
      // Error during form submit
      const errors: Record<
        string,
        { key: string; values?: Record<string, string | number> }[]
      > = {};

      (validationError as ValidationError).inner.forEach((_error) => {
        const error = _error as unknown as Omit<ValidationError, "message"> & {
          message: { key: string; values?: Record<string, string | number> };
        };

        // Use the field name as the key
        const key = error.path;
        // Add the error message to the array of errors for that field
        if (key !== undefined) {
          if (errors[key]) {
            errors[key].push(error.message);
          } else {
            errors[key] = [error.message];
          }
        }
      });

      // Update errors state
      setValidationErrors(
        errors as Record<
          keyof T,
          { key: string; values?: Record<string, string | number> }[]
        >
      );

      // Return errors
      return errors as Record<
        keyof T,
        { key: string; values?: Record<string, string | number> }[]
      >;
    }
    return null;
  };

  const validate = async () => {
    if (!options?.objectSchema) return null;
    return await validateValues(formState, options.objectSchema);
  };

  return {
    formState,
    setFormState,
    isLoading,
    setValue,
    getValue,
    clear,
    submit,
    validate,
    validationErrors,
  };
}
