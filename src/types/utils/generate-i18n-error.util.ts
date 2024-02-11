export const generateI18nError = (
  key: string,
  values?: Record<string, string | number>
) => {
  return { key, values };
};
