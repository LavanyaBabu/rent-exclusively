export function isNotNullNorUndefined<T>(value: T | undefined | null): value is Exclude<T, null> {
  return value !== undefined && value !== null;
}

export function isNullOrUndefined<T>(value: T | undefined | null): value is undefined | null {
  return value === undefined || value === null;
}

export function isEmpty<T>(value: T): boolean {
  if (isNullOrUndefined(value)) {
    return true;
  }

  if (Array.isArray(value) || typeof value === "string" || value instanceof String) {
    return value.length === 0;
  }

  if (typeof value === "number" || value instanceof Number) {
    return false;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  return Object.keys(value as Record<string, unknown>).length === 0; //todo: place a check to ensure that value is an object
}

export function isNotEmpty<T>(value: T): boolean {
  return !isEmpty(value);
}
