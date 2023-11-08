import { FormValuesModel } from "../../models/form-values-model.type";

export type FormSubmitOptions<T extends FormValuesModel> = {
  replace?: Partial<T>;
  disableValidation?: boolean;
};
