export function makeUrl(path: string, params: Record<PropertyKey, unknown> = {}): string {
  let url = path.replace(/\/$/, "").replace(/\s/g, "-");

  if (params) {
    url += "?";
    Object.keys(params).forEach((key) => {
      url = `${url}${key}=${params[key]}&`;
    });
    url = url.slice(0, -1);
  }
  return `/${url.toLocaleLowerCase()}`;
}
