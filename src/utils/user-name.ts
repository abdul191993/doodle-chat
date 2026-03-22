export const normalizeUserName = (value: string) => value.trim();

export const hasUserName = (value: string) =>
  normalizeUserName(value).length > 0;