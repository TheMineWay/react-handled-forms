import { ObjectSchema } from "yup";
import { FormValuesModel } from "../../models/form-values-model.type";

export interface UseFormOptions<T extends FormValuesModel> {
  objectSchema?: ObjectSchema<T>;
}
