import { createContext, useContext } from "react";
import { FormValuesModel } from "../types/models/form-values-model.type";
import { IUseForm } from "../types/hooks/use-form/use-form.interface";
import React from "react";

const FormContext = createContext<FormContextType<FormValuesModel> | null>(
  null
);

type Props<T extends FormValuesModel> = {
  children: JSX.Element[] | JSX.Element;
  form: IUseForm<T>;
};

export default function FormProvider<T extends FormValuesModel>({
  children,
  form,
}: Props<T>) {
  return (
    <FormContext.Provider
      value={
        {
          form,
        } as unknown as FormContextType<FormValuesModel>
      }
    >
      {children}
    </FormContext.Provider>
  );
}

type FormContextType<T extends FormValuesModel> = {
  form: IUseForm<T>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFormContext = <T extends FormValuesModel>() => {
  const provider = useContext(FormContext);

  if (!provider) throw new Error();

  return provider as unknown as FormContextType<T>;
};
