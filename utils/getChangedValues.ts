import isEqual from "lodash/isEqual";
import isObject from "lodash/isObject";

export const getChangedValues = (values: any, initial: any): any => {
  if (!isObject(values) || !isObject(initial)) {
    return !isEqual(values, initial) ? values : undefined;
  }

  if (Array.isArray(values) && Array.isArray(initial)) {
    return !isEqual(values, initial) ? values : undefined;
  }

  const result: Record<string, any> = {};

  Object.keys(values).forEach((key) => {
    const diff = getChangedValues(
      values[key as keyof typeof values],
      initial?.[key as keyof typeof initial],
    );

    if (diff !== undefined) {
      result[key] = diff;
    }
  });

  return Object.keys(result).length > 0 ? result : undefined;
};
