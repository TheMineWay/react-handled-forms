import React from "react";

export interface FormLayoutConfig {
  FormItem: (options: {
    children: JSX.Element | JSX.Element[];
    label?: string;
  }) => JSX.Element;
  Form: (options: { children: JSX.Element | JSX.Element[] }) => JSX.Element;
}
