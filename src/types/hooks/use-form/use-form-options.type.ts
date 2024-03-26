import { ObjectSchema } from "yup";
import { FormValuesModel } from "../../models/form-values-model.type";
import { FormOptions } from "../../providers/config/form-options.type";

type MethodResult = void | undefined | never | unknown | any | null;

export interface UseFormOptions<T extends FormValuesModel, E = any> {
  objectSchema?: ObjectSchema<T>;
  onSubmit?: (values: T) => MethodResult | Promise<MethodResult>;
  onSubmitError?: (error: E) => MethodResult | Promise<MethodResult>;
  defaultValues?: Partial<T>;
  overrideGlobalOptions?: FormOptions<T>;
}
