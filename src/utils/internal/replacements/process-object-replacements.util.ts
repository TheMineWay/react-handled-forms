import { AnyObject, ObjectSchema } from "yup";
import { FormOptions } from "../../../types/providers/config/form-options.type";

export const processObjectReplacements = <T extends object>(
  object: T,
  options?: FormOptions<T>,
  params?: { schema?: ObjectSchema<T, AnyObject, any, ""> }
): T => {
  let obj = { ...object } as Record<string, unknown>;

  if (options?.replaceEmtyStringsWith) {
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
  }

  if (options?.transform) {
    obj = options.transform({ values: obj as T, schema: params?.schema });
  }

  return obj as T;
};
