import { FormOptions } from "../../../types/providers/config/form-options.type";

export const processObjectReplacements = <T extends object>(
  object: T,
  options?: FormOptions
): T => {
  if (!options?.replaceEmtyStringsWith) return object;

  let obj = { ...object } as Record<string, unknown>;

  for (const [key, value] of Object.entries(obj)) {
    if (
      options.replaceEmtyStringsWith &&
      typeof value === "string" &&
      value.trim() === ""
    ) {
      obj[key] = options.replaceEmtyStringsWith.value;
      continue;
    }
  }

  return obj as T;
};
