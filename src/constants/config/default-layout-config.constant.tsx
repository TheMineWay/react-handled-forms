import { FormLayoutConfig } from "../../types";
import React from "react";

export const DEFAULT_LAYOUT_CONFIG: FormLayoutConfig = {
  formItem: ({ FormItem, label }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      {label && (
        <div>
          <label>{label}</label>
        </div>
      )}
      <div>
        <FormItem />
      </div>
    </div>
  ),
  form: ({ Content }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      <Content />
    </div>
  ),
};
