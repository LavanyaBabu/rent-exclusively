import { isNotNullNorUndefined } from "./bool";

export function sanitize<T, K extends keyof T>(obj: T) {
  // trim all string values
  const keys: K[] = Object.keys(obj as Record<string, unknown>) as K[];
  keys.forEach((key: K) => {
    const value = obj[key];
    if (typeof value === "string") {
      obj[key] = value.trim() as unknown as T[K];
    }
  });
  return obj;
}

export function omit<T, K extends keyof T>(obj: T, ...keys: K[]) {
  let result = { ...obj };
  keys.forEach((key: K) => {
    if (typeof key === "string" && key.includes(".")) {
      const [first, ...parts] = key.split(".");

      if (
        parts.length > 0 &&
        isNotNullNorUndefined(result[first as K]) &&
        !Array.isArray(result[first as K]) &&
        typeof result[first as K] === "object"
      ) {
        result = {
          ...result,
          [first]: omit(result[first as K], ...(parts as any))
        };
      }
    } else {
      delete result[key];
    }
  });
  return result;
}

export function groupBy<T>(arrObjs: T[], key: string) {
  type Grouped = Record<string, T[]>;
  return arrObjs.reduce((grouped: Grouped, obj: T) => {
    const evaluatedKey: string = (obj as unknown as Record<string, string>)[key];
    if (isNotNullNorUndefined(evaluatedKey)) {
      return {
        ...grouped,
        [evaluatedKey]: (grouped[evaluatedKey] || []).concat(obj)
      };
    }
    return grouped;
  }, {} as Grouped);
}
