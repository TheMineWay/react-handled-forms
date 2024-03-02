import { DEFAULT_LAYOUT_CONFIG } from "../constants/config/default-layout-config.constant";
import { useFormConfig } from "../providers";
import { FormLayoutConfig } from "../types";

export const useFormLayout = () => {
  const { options } = useFormConfig();

  const layout: FormLayoutConfig = {
    ...DEFAULT_LAYOUT_CONFIG,
    ...options?.layout,
  };

  return layout;
};
