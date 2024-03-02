import { createContext, useContext, useState } from "react";
import React from "react";
import { FormLayoutConfig } from "../types";

export interface Options {
  layout?: Partial<FormLayoutConfig>;
}

type Props = {
  options?: Options;
  children?: JSX.Element | JSX.Element;
};

const FormConfigContext = createContext<{
  options?: Options;
  setOptions: (options?: Options) => void;
}>(null!);

export default function FormConfigProvider({ children }: Props) {
  const [options, setOptions] = useState<Options>();

  return (
    <FormConfigContext.Provider value={{ options, setOptions }}>
      {children}
    </FormConfigContext.Provider>
  );
}

export const useFormConfig = () => {
  return useContext(FormConfigContext);
};
