import { useFormLayout } from "../hooks";
import FormProvider from "../providers/form.provider";
import { IUseForm } from "../types/hooks/use-form/use-form.interface";
import { FormValuesModel } from "../types/models/form-values-model.type";
import React from "react";

type Props<T extends FormValuesModel> = {
  form: IUseForm<T>;
  children: JSX.Element[] | JSX.Element;
};

export default function Form<T extends FormValuesModel>({
  form,
  children,
}: Props<T>) {
  const { Form: FormLayout } = useFormLayout();
  return (
    <FormProvider<T> form={form}>
      <FormLayout>{children ?? <></>}</FormLayout>
    </FormProvider>
  );
}
