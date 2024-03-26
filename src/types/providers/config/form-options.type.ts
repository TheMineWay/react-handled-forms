import { ObjectSchema } from "yup";

export interface FormOptions {
  replaceEmtyStringsWith?: { value: unknown };
  transform?: (options: {
    values: Partial<object>;
    schema?: ObjectSchema<object>;
  }) => Partial<object>;
}
