import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FormItemOptions } from "../../types/components/form-item/form-item-options.interface";
import { FormValuesModel } from "../../types/models/form-values-model.type";
import FormItem from "../form-item";
import { useFormContext } from "../../providers/form.provider";
import React from "react";

export default function InputFormItem<
  T extends FormValuesModel,
  K extends keyof T = keyof T
>(
  props: FormItemOptions<
    T,
    K,
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    string
  >
) {
  const {
    form: { formState, setValue },
  } = useFormContext<T>();

  return (
    <FormItem<
      T,
      K,
      DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
      string
    >
      {...props}
    >
      <input
        name={props.name.toString()}
        value={(formState[props.name] as string) ?? ""}
        onChange={(e) => setValue(props.name, e.target.value as never)}
        {...props.componentProps}
      />
    </FormItem>
  );
}
