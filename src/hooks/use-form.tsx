import { useState, useTransition } from "react";
import { IUseForm } from "../types/hooks/use-form/use-form.interface";
import { FormValuesModel } from "../types/models/form-values-model.type";
import { useLoading } from "./internal/use-loading";
import { FormSubmitOptions } from "../types/hooks/use-form/form-submit-options.type";
import { merge } from "lodash";
import { UseFormOptions } from "../types/hooks/use-form/use-form-options.type";
import { ObjectSchema, ValidationError } from "yup";
import { processObjectReplacements } from "../utils/internal/replacements/process-object-replacements.util";
import { useFormConfig } from "../providers/form-config.provider";

export function useForm<T extends FormValuesModel>(
  options?: UseFormOptions<T>
): IUseForm<T> {
  const { options: globalOptions } = useFormConfig();

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

  const reset = () => {
    startTransition(() => {
      setFormState(options?.defaultValues ?? {});
      setValidationErrors(null);
    });
  };

  const submit = async (
    submitOptions?: FormSubmitOptions<T>
  ): Promise<{ status: "success" | "failed" }> => {
    startLoading();
    let status: { status: "success" | "failed" } = { status: "failed" };
    let values = processObjectReplacements(
      merge(formState, submitOptions?.replace),
      options?.overrideGlobalOptions ?? globalOptions?.options
    );

    try {
      if (globalOptions?.options?.transform) {
        values = globalOptions.options.transform({
          values,
          schema: options?.objectSchema as unknown as ObjectSchema<object>,
        });
      }

      // Validate schema
      if (options?.objectSchema && !submitOptions?.disableValidation) {
        const errors = await validateValues(values, options.objectSchema);

        if (errors) {
          // Validation errors occurred
          throw new Error("Validation exception");
        }
      } else setValidationErrors(null);

      if (options?.onSubmit) {
        try {
          await options.onSubmit(values as T);
          status = { status: "success" };
        } catch (e) {
          status = { status: "failed" };
          // Error in the external function
          if (options.onSubmitError) await options.onSubmitError(e);
        }
      }
    } catch (e) {
      // Error
    } finally {
      stopLoading();
    }
    return status;
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
    reset,
    submit,
    validate,
    validationErrors,
  };
}
