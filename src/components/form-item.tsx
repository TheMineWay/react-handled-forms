import { FormItemOptions } from "../types/components/form-item/form-item-options.interface";
import { FormValuesModel } from "../types/models/form-values-model.type";
import React from "react";

type Props<T extends FormValuesModel, K extends keyof T, P, V> = {
  children: JSX.Element | JSX.Element[];
} & FormItemOptions<T, K, P, V>;

export default function FormItem<
  T extends FormValuesModel,
  K extends keyof T,
  P = unknown,
  V = unknown
>({ children, label }: Props<T, K, P, V>) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
      }}
    >
      {label && (
        <div>
          <p>{label}</p>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
