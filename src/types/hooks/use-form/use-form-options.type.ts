import { ObjectSchema } from "yup";
import { FormValuesModel } from "../../models/form-values-model.type";

type MethodResult = void | undefined | never | unknown | any | null;

export interface UseFormOptions<T extends FormValuesModel> {
  objectSchema?: ObjectSchema<T>;
  onSubmit?: (values: T) => MethodResult | Promise<MethodResult>;
  onSubmitError?: <E = any>(error: E) => MethodResult | Promise<MethodResult>;
  defaultValues?: Partial<T>;
}
