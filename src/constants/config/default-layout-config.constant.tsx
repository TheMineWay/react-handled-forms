import { FormLayoutConfig } from "../../types";
import React from "react";

export const DEFAULT_LAYOUT_CONFIG: FormLayoutConfig = {
  FormItem: ({ children, label }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      {label && (
        <div>
          <label>{label}</label>
        </div>
      )}
      <div>{children}</div>
    </div>
  ),
  Form: ({ children }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      {children}
    </div>
  ),
};
