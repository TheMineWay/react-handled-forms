import { createContext, useContext, useState } from "react";
import React from "react";
import { FormLayoutConfig } from "../types";
import { FormOptions } from "../types/providers/config/form-options.type";

export interface Options {
  layout?: Partial<FormLayoutConfig>;
  options?: FormOptions<object>;
}

type Props = {
  options?: Options;
  children?: JSX.Element | JSX.Element;
};

const FormConfigContext = createContext<{
  options?: Options;
  setOptions: (options?: Options) => void;
}>(null!);

export default function FormConfigProvider({
  children,
  options: propsOpts,
}: Props) {
  const [options, setOptions] = useState<Options | undefined>(propsOpts);

  return (
    <FormConfigContext.Provider value={{ options, setOptions }}>
      {children}
    </FormConfigContext.Provider>
  );
}

export const useFormConfig = () => {
  return useContext(FormConfigContext);
};
