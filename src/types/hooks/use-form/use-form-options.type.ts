import { Schema } from "yup";
import { FormValuesModel } from "../../models/form-values-model.type";
import { FormOptions } from "../../providers/config/form-options.type";

type MethodResult = void | undefined | never | unknown | any | null;

export interface UseFormOptions<T extends FormValuesModel, E = any> {
  schema?: Schema<T>;
  onSubmit?: (values: T) => MethodResult | Promise<MethodResult>;
  onSubmitError?: (error: E) => MethodResult | Promise<MethodResult>;
  defaultValues?: Partial<T>;
  overrideGlobalOptions?: FormOptions;
}
