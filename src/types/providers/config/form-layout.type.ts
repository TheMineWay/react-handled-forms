import React from "react";

export interface FormLayoutConfig {
  formItem: (options: { FormItem: React.FC; label?: string }) => JSX.Element;
  form: (options: { Content: React.FC }) => JSX.Element;
}
