import { FormValuesModel } from "../../models/form-values-model.type";

export interface FormItemOptions<
  T extends FormValuesModel,
  K extends keyof T,
  P,
  V
> {
  name: K;
  defaultValue?: V;
  componentProps?: P;
  label?: string;
}
