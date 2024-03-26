import { ObjectSchema } from "yup";

export interface FormOptions<T extends object> {
  replaceEmtyStringsWith?: { value: unknown };
  transform?: (options: {
    values: Partial<T>;
    schema?: ObjectSchema<T>;
  }) => Partial<T>;
}
