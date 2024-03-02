import { DEFAULT_LAYOUT_CONFIG } from "../constants/config/default-layout-config.constant";
import { useFormConfig } from "../providers";
import { FormLayoutConfig } from "../types";

export const useFormLayout = () => {
  const { options } = useFormConfig();

  const layout: FormLayoutConfig = {
    ...options?.layout,
    ...DEFAULT_LAYOUT_CONFIG,
  };

  return layout;
};
