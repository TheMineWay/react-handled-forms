import { FormValuesModel } from "../../models/form-values-model.type";
import { FormSubmitOptions } from "./form-submit-options.type";

export interface IUseForm<T extends FormValuesModel> {
  formState: Partial<T>;
  setFormState: (formState: Partial<T>) => void;
  isLoading: boolean;

  validationErrors: Record<
    keyof T,
    { key: string; values?: Record<string, string | number> }[]
  > | null;

  setValue: <K extends keyof T>(name: K, value?: T[K]) => void;
  getValue: <K extends keyof T>(name: keyof T) => T[K];
  clear: () => void;
  reset: () => void;

  submit: (
    options?: FormSubmitOptions<T>
  ) => Promise<{ status: "success" | "failed" }>;
  validate: () => Promise<Record<
    keyof T,
    { key: string; values?: Record<string, string | number> }[]
  > | null>;
}
